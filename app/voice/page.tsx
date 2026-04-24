'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

type Status = 'idle' | 'connecting' | 'active' | 'error'
type Message = { id: string; role: 'user' | 'assistant'; text: string; interrupted?: boolean }

function audioToBase64(int16: Int16Array): string {
  const bytes = new Uint8Array(int16.buffer, int16.byteOffset, int16.byteLength)
  const CHUNK = 0x2000
  const parts: string[] = []
  for (let i = 0; i < bytes.length; i += CHUNK) {
    parts.push(String.fromCharCode.apply(null, Array.from(bytes.subarray(i, i + CHUNK))))
  }
  return btoa(parts.join(''))
}

function playPcmChunk(
  base64: string,
  audioCtx: AudioContext,
  nextPlayTimeRef: React.MutableRefObject<number>,
  queuedRef: React.MutableRefObject<AudioBufferSourceNode[]>
) {
  const raw = atob(base64)
  const bytes = new Uint8Array(raw.length)
  for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i)
  const int16 = new Int16Array(bytes.buffer)
  const float32 = new Float32Array(int16.length)
  for (let i = 0; i < int16.length; i++) float32[i] = int16[i] / 32768

  const buf = audioCtx.createBuffer(1, float32.length, 24000)
  buf.getChannelData(0).set(float32)
  const src = audioCtx.createBufferSource()
  src.buffer = buf
  src.connect(audioCtx.destination)

  const now = audioCtx.currentTime
  const startAt = Math.max(now, nextPlayTimeRef.current)
  src.start(startAt)
  nextPlayTimeRef.current = startAt + buf.duration
  queuedRef.current.push(src)
  src.onended = () => {
    const idx = queuedRef.current.indexOf(src)
    if (idx !== -1) queuedRef.current.splice(idx, 1)
  }
}

export default function VoicePage() {
  const [status, setStatus] = useState<Status>('idle')
  const [messages, setMessages] = useState<Message[]>([])
  const [textInput, setTextInput] = useState('')
  const [error, setError] = useState('')

  const wsRef = useRef<WebSocket | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const nextPlayTimeRef = useRef(0)
  const queuedRef = useRef<AudioBufferSourceNode[]>([])
  const micBufferRef = useRef<Int16Array[]>([])
  const sessionReadyRef = useRef(false)
  const currentResponseIdRef = useRef<string | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const tokenExpiresRef = useRef(0)
  const transcriptRef = useRef<HTMLDivElement>(null)

  const interruptPlayback = useCallback(() => {
    for (const src of queuedRef.current) { try { src.stop() } catch {} }
    queuedRef.current = []
    nextPlayTimeRef.current = 0
  }, [])

  const addMessage = useCallback((id: string, role: 'user' | 'assistant', text: string) => {
    setMessages(prev => {
      const existing = prev.findIndex(m => m.id === id)
      if (existing !== -1) {
        const updated = [...prev]
        updated[existing] = { ...updated[existing], text: updated[existing].text + text }
        return updated
      }
      return [...prev, { id, role, text }]
    })
  }, [])

  const markInterrupted = useCallback((id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, interrupted: true } : m))
  }, [])

  const mintToken = useCallback(async () => {
    const resp = await fetch('/api/xai-token', { method: 'POST' })
    if (!resp.ok) throw new Error('Failed to get voice token')
    const { token, expires_at } = await resp.json()
    tokenExpiresRef.current = expires_at
    return token as string
  }, [])

  // Ref so the refresh timer can always call the latest connectWS without a circular dep
  const connectWSRef = useRef<((audioCtx: AudioContext) => Promise<void>) | null>(null)

  const connectWS = useCallback(async (audioCtx: AudioContext) => {
    sessionReadyRef.current = false
    const token = await mintToken()
    const ws = new WebSocket(
      'wss://api.x.ai/v1/realtime?model=grok-voice-think-fast-1.0',
      [`xai-client-secret.${token}`]
    )
    wsRef.current = ws

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: 'session.update',
        session: {
          voice: 'Eve',
          instructions: 'You are LemkyBot, a sharp AI coding assistant for APRIL. Be concise, direct, and technically precise. No filler words.',
          turn_detection: { type: 'server_vad' },
          input_audio_transcription: { model: 'grok-2-audio' },
          audio: {
            input: { format: { type: 'audio/pcm', rate: 24000 } },
            output: { format: { type: 'audio/pcm', rate: 24000 } },
          },
        },
      }))
    }

    ws.onmessage = ({ data }) => {
      const event = JSON.parse(data)

      if (event.type === 'session.updated' && !sessionReadyRef.current) {
        sessionReadyRef.current = true
        setStatus('active')
        for (const chunk of micBufferRef.current) {
          ws.send(JSON.stringify({ type: 'input_audio_buffer.append', audio: audioToBase64(chunk) }))
        }
        micBufferRef.current = []
      }

      if (event.type === 'input_audio_buffer.speech_started') {
        interruptPlayback()
        ws.send(JSON.stringify({ type: 'response.cancel' }))
        if (currentResponseIdRef.current) markInterrupted(currentResponseIdRef.current)
        currentResponseIdRef.current = null
      }

      if (event.type === 'response.created') {
        currentResponseIdRef.current = event.response.id
      }

      if (event.type === 'response.output_audio.delta') {
        playPcmChunk(event.delta, audioCtx, nextPlayTimeRef, queuedRef)
      }

      if (event.type === 'response.output_audio_transcript.delta' && currentResponseIdRef.current) {
        addMessage(currentResponseIdRef.current, 'assistant', event.delta)
      }

      if (event.type === 'conversation.item.input_audio_transcription.completed') {
        addMessage(`user-${Date.now()}`, 'user', event.transcript)
      }

      if (event.type === 'response.done') {
        currentResponseIdRef.current = null
      }

      if (event.type === 'error') {
        setError(event.message || 'Voice error')
        setStatus('error')
      }
    }

    ws.onerror = () => { setError('Connection error'); setStatus('error') }
    ws.onclose = () => { setStatus(s => s !== 'idle' ? 'idle' : s) }

    // Reconnect with a fresh token before the 5-minute expiry
    setTimeout(async () => {
      if (wsRef.current !== ws) return // already disconnected or reconnected
      try {
        ws.close()
        await connectWSRef.current?.(audioCtx)
      } catch {}
    }, 290_000)
  }, [mintToken, interruptPlayback, addMessage, markInterrupted])

  // Keep ref in sync with latest callback
  connectWSRef.current = connectWS

  const connect = useCallback(async () => {
    setStatus('connecting')
    setError('')

    try {
      const audioCtx = new AudioContext({ sampleRate: 24000 })
      if (audioCtx.state === 'suspended') await audioCtx.resume()
      audioCtxRef.current = audioCtx

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true, sampleRate: 24000 },
      })
      streamRef.current = stream

      await audioCtx.audioWorklet.addModule('/pcm-processor-worklet.js')
      const source = audioCtx.createMediaStreamSource(stream)
      const worklet = new AudioWorkletNode(audioCtx, 'pcm-processor')
      source.connect(worklet)

      worklet.port.onmessage = (e) => {
        const chunk = e.data as Int16Array
        if (sessionReadyRef.current && wsRef.current?.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify({ type: 'input_audio_buffer.append', audio: audioToBase64(chunk) }))
        } else if (micBufferRef.current.length < 240000) {
          micBufferRef.current.push(chunk)
        }
      }

      await connectWS(audioCtx)

    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Connection failed'
      if (msg.includes('NotAllowedError') || msg.includes('Permission')) {
        setError('Microphone access denied — check browser permissions')
      } else if (msg.includes('NotFoundError')) {
        setError('No microphone found')
      } else {
        setError(msg)
      }
      setStatus('error')
    }
  }, [connectWS])

  const disconnect = useCallback(() => {
    wsRef.current?.close()
    wsRef.current = null
    streamRef.current?.getTracks().forEach(t => t.stop())
    streamRef.current = null
    audioCtxRef.current?.close()
    audioCtxRef.current = null
    sessionReadyRef.current = false
    micBufferRef.current = []
    nextPlayTimeRef.current = 0
    queuedRef.current = []
    setStatus('idle')
  }, [])

  const sendText = useCallback(() => {
    if (!textInput.trim() || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return
    const id = `user-text-${Date.now()}`
    addMessage(id, 'user', textInput.trim())
    wsRef.current.send(JSON.stringify({
      type: 'conversation.item.create',
      item: { type: 'message', role: 'user', content: [{ type: 'input_text', text: textInput.trim() }] },
    }))
    wsRef.current.send(JSON.stringify({ type: 'response.create' }))
    setTextInput('')
  }, [textInput, addMessage])

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight
    }
  }, [messages])

  const statusColor = { idle: '#888', connecting: '#f59e0b', active: '#22c55e', error: '#ef4444' }[status]
  const isActive = status === 'active'

  return (
    <div style={{ height: '100dvh', display: 'flex', flexDirection: 'column', background: '#09090b', color: '#fafafa', fontFamily: 'var(--font-body, sans-serif)' }}>
      {/* Header */}
      <div style={{ padding: '12px 20px', borderBottom: '1px solid #27272a', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 20 }}>💻</span>
          <span style={{ fontWeight: 600, fontSize: 16 }}>LemkyBot Voice</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, color: statusColor, background: '#18181b', borderRadius: 999, padding: '2px 10px', border: `1px solid ${statusColor}33` }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: statusColor, display: 'inline-block' }} />
            {status}
          </span>
        </div>
        {isActive && (
          <button onClick={disconnect} style={{ background: '#27272a', border: 'none', color: '#fafafa', borderRadius: 8, padding: '6px 14px', cursor: 'pointer', fontSize: 13 }}>
            Disconnect
          </button>
        )}
      </div>

      {/* Transcript */}
      <div ref={transcriptRef} style={{ flex: 1, overflowY: 'auto', padding: '20px', maxWidth: 720, width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
        {messages.length === 0 && (
          <div style={{ color: '#52525b', textAlign: 'center', marginTop: 60, fontSize: 14 }}>
            {status === 'idle' ? 'Tap the mic to start talking to LemkyBot' : 'Listening...'}
          </div>
        )}
        {messages.map(m => (
          <div key={m.id} style={{ display: 'flex', gap: 10, marginBottom: 16, opacity: m.interrupted ? 0.4 : 1 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: m.role === 'assistant' ? '#3f3f46' : '#1d4ed8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0 }}>
              {m.role === 'assistant' ? '💻' : 'A'}
            </div>
            <div style={{ color: m.role === 'assistant' ? '#d4d4d8' : '#fafafa', lineHeight: 1.6, fontSize: 14, paddingTop: 4 }}>
              {m.text}
              {m.interrupted && <span style={{ color: '#52525b', fontSize: 12, marginLeft: 6 }}>✂ cut off</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid #27272a', padding: '12px 20px' }}>
        {error && <div style={{ color: '#ef4444', fontSize: 13, marginBottom: 10, textAlign: 'center' }}>{error} — tap mic to retry</div>}
        <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', gap: 8, alignItems: 'center' }}>
          {isActive && (
            <>
              <input
                value={textInput}
                onChange={e => setTextInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendText()}
                placeholder="Or type here..."
                style={{ flex: 1, background: '#18181b', border: '1px solid #27272a', borderRadius: 8, padding: '8px 14px', color: '#fafafa', fontSize: 14, outline: 'none' }}
              />
              <button onClick={sendText} disabled={!textInput.trim()} style={{ background: '#27272a', border: 'none', color: '#fafafa', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontSize: 13 }}>
                Send
              </button>
            </>
          )}
          <button
            onClick={isActive ? disconnect : connect}
            style={{
              width: 48, height: 48, borderRadius: '50%', border: 'none', cursor: 'pointer', fontSize: 20,
              background: status === 'error' ? '#7f1d1d' : isActive ? '#dc2626' : '#1d4ed8',
              boxShadow: isActive ? '0 0 0 4px #dc262633' : 'none',
              transition: 'all 0.2s',
            }}
          >
            {isActive ? '⏹' : '🎙️'}
          </button>
        </div>
      </div>
    </div>
  )
}
