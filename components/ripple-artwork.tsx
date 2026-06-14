'use client'

/*
 * RippleArtwork — a painting you can touch.
 *
 * A real-time water-ripple simulation (WebGL) runs over the artwork: wherever
 * you press, drag, or move the cursor, ripples spread out and refract the
 * paint like a disturbed reflection. A second canvas layer scatters leaves
 * that fall from each touch. If WebGL/float textures aren't available it
 * gracefully falls back to the still image with the falling-leaf layer.
 *
 * Self-contained; no external libraries.
 */

import { useEffect, useRef, useState } from 'react'

type Props = {
  imageSrc: string
  title: string
  caption?: string
}

const VERT = `
attribute vec2 a;
varying vec2 uv;
void main(){ uv = a*0.5+0.5; gl_Position = vec4(a,0.0,1.0); }
`

// ripple propagation: R = current height, G = previous height
const SIM_FS = `
precision highp float;
varying vec2 uv;
uniform sampler2D sim;
uniform vec2 px;
void main(){
  float l = texture2D(sim, uv - vec2(px.x,0.0)).r;
  float r = texture2D(sim, uv + vec2(px.x,0.0)).r;
  float u = texture2D(sim, uv - vec2(0.0,px.y)).r;
  float d = texture2D(sim, uv + vec2(0.0,px.y)).r;
  float prev = texture2D(sim, uv).g;
  float cur  = texture2D(sim, uv).r;
  float nh = (l + r + u + d) * 0.5 - prev;
  nh *= 0.974;
  gl_FragColor = vec4(nh, cur, 0.0, 1.0);
}
`

// additive blob injected at a touch point
const INJECT_FS = `
precision highp float;
varying vec2 uv;
uniform vec2 center;
uniform float radius;
uniform float strength;
void main(){
  float d = distance(uv, center);
  float v = smoothstep(radius, 0.0, d) * strength;
  gl_FragColor = vec4(v, 0.0, 0.0, 1.0);
}
`

// final render: displace the image by the height gradient + add specular sheen
const RENDER_FS = `
precision highp float;
varying vec2 uv;
uniform sampler2D sim;
uniform sampler2D img;
uniform vec2 px;
void main(){
  float l = texture2D(sim, uv - vec2(px.x,0.0)).r;
  float r = texture2D(sim, uv + vec2(px.x,0.0)).r;
  float u = texture2D(sim, uv - vec2(0.0,px.y)).r;
  float d = texture2D(sim, uv + vec2(0.0,px.y)).r;
  vec2 grad = vec2(r - l, d - u);
  vec2 disp = grad * 0.32;
  vec3 col = texture2D(img, vec2(uv.x, 1.0-uv.y) + disp).rgb;
  float spec = clamp((r - l + d - u) * 3.0, -0.25, 0.4);
  col += spec * vec3(1.0, 0.96, 0.85);
  gl_FragColor = vec4(col, 1.0);
}
`

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || 'shader')
  return s
}
function program(gl: WebGLRenderingContext, fs: string) {
  const p = gl.createProgram()!
  gl.attachShader(p, compile(gl, gl.VERTEX_SHADER, VERT))
  gl.attachShader(p, compile(gl, gl.FRAGMENT_SHADER, fs))
  gl.bindAttribLocation(p, 0, 'a')
  gl.linkProgram(p)
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p) || 'link')
  return p
}

export function RippleArtwork({ imageSrc, title, caption }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const glRef = useRef<HTMLCanvasElement>(null)
  const leafRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [webglOk, setWebglOk] = useState(true)
  const pending = useRef<Array<{ x: number; y: number; s: number }>>([])

  // ---- Leaves (2D) — spawn + fall from touch points ----
  useEffect(() => {
    const canvas = leafRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const ctx = canvas.getContext('2d')!
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let W = 0, H = 0
    const resize = () => {
      const r = wrap.getBoundingClientRect()
      W = r.width; H = r.height
      canvas.width = W * dpr; canvas.height = H * dpr
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize); ro.observe(wrap)

    type Leaf = { x: number; y: number; vx: number; vy: number; a: number; va: number; s: number; life: number; hue: number }
    const leaves: Leaf[] = []
    const spawn = (x: number, y: number, n: number) => {
      for (let i = 0; i < n; i++) {
        leaves.push({
          x, y,
          vx: (((i * 53) % 100) / 100 - 0.5) * 1.2,
          vy: -0.4 - ((i * 31) % 100) / 200,
          a: ((i * 47) % 628) / 100,
          va: (((i * 17) % 100) / 100 - 0.5) * 0.12,
          s: 5 + ((i * 13) % 7),
          life: 1,
          hue: 38 + ((i * 29) % 40),
        })
      }
    }
    ;(canvas as unknown as { __spawn?: typeof spawn }).__spawn = spawn

    let raf = 0
    const tick = () => {
      ctx.clearRect(0, 0, W, H)
      for (let i = leaves.length - 1; i >= 0; i--) {
        const lf = leaves[i]
        lf.vy += 0.018 // gravity
        lf.vx += Math.sin(lf.a) * 0.006 // sway
        lf.x += lf.vx; lf.y += lf.vy; lf.a += lf.va
        lf.life -= 0.006
        if (lf.life <= 0 || lf.y > H + 30) { leaves.splice(i, 1); continue }
        ctx.save()
        ctx.translate(lf.x, lf.y); ctx.rotate(lf.a)
        ctx.globalAlpha = Math.max(0, Math.min(1, lf.life)) * 0.9
        ctx.fillStyle = `hsl(${lf.hue}, 70%, 55%)`
        ctx.beginPath()
        ctx.ellipse(0, 0, lf.s, lf.s * 0.42, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.strokeStyle = `hsla(${lf.hue},60%,30%,.6)`; ctx.lineWidth = 0.6
        ctx.beginPath(); ctx.moveTo(-lf.s, 0); ctx.lineTo(lf.s, 0); ctx.stroke()
        ctx.restore()
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [])

  // ---- WebGL ripple sim ----
  useEffect(() => {
    const canvas = glRef.current
    const wrap = wrapRef.current
    const image = imgRef.current
    if (!canvas || !wrap || !image) return

    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null
    if (!gl) { setWebglOk(false); return }
    const ext = gl.getExtension('OES_texture_float')
    if (!ext) { setWebglOk(false); return }

    let progSim: WebGLProgram, progInject: WebGLProgram, progRender: WebGLProgram
    try {
      progSim = program(gl, SIM_FS)
      progInject = program(gl, INJECT_FS)
      progRender = program(gl, RENDER_FS)
    } catch { setWebglOk(false); return }

    const SIM = 320
    const quad = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, quad)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)

    const makeTex = (data: Float32Array | null) => {
      const t = gl.createTexture()!
      gl.bindTexture(gl.TEXTURE_2D, t)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, SIM, SIM, 0, gl.RGBA, gl.FLOAT, data)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      return t
    }
    let texA = makeTex(new Float32Array(SIM * SIM * 4))
    let texB = makeTex(new Float32Array(SIM * SIM * 4))
    const fbo = gl.createFramebuffer()

    const imgTex = gl.createTexture()!
    gl.bindTexture(gl.TEXTURE_2D, imgTex)
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

    const resize = () => {
      const r = wrap.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = r.width * dpr; canvas.height = r.height * dpr
      canvas.style.width = r.width + 'px'; canvas.style.height = r.height + 'px'
    }
    resize()
    const ro = new ResizeObserver(resize); ro.observe(wrap)

    const drawQuad = () => {
      gl.bindBuffer(gl.ARRAY_BUFFER, quad)
      gl.enableVertexAttribArray(0)
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    let raf = 0
    const loop = () => {
      // 1) propagate A -> B
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texB, 0)
      gl.viewport(0, 0, SIM, SIM)
      gl.useProgram(progSim)
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, texA)
      gl.uniform1i(gl.getUniformLocation(progSim, 'sim'), 0)
      gl.uniform2f(gl.getUniformLocation(progSim, 'px'), 1 / SIM, 1 / SIM)
      gl.disable(gl.BLEND)
      drawQuad()
      let tmp = texA; texA = texB; texB = tmp

      // 2) inject pending touches into texA (additive)
      if (pending.current.length) {
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texA, 0)
        gl.viewport(0, 0, SIM, SIM)
        gl.useProgram(progInject)
        gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE)
        for (const p of pending.current) {
          gl.uniform2f(gl.getUniformLocation(progInject, 'center'), p.x, 1 - p.y)
          gl.uniform1f(gl.getUniformLocation(progInject, 'radius'), 0.05)
          gl.uniform1f(gl.getUniformLocation(progInject, 'strength'), p.s)
          drawQuad()
        }
        gl.disable(gl.BLEND)
        pending.current.length = 0
      }

      // 3) render to screen
      gl.bindFramebuffer(gl.FRAMEBUFFER, null)
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.useProgram(progRender)
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, texA)
      gl.uniform1i(gl.getUniformLocation(progRender, 'sim'), 0)
      gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, imgTex)
      gl.uniform1i(gl.getUniformLocation(progRender, 'img'), 1)
      gl.uniform2f(gl.getUniformLocation(progRender, 'px'), 1 / SIM, 1 / SIM)
      drawQuad()

      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [])

  // ---- pointer → ripples + leaves ----
  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    let last = 0
    const at = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect()
      return { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height, r }
    }
    const onDown = (e: PointerEvent) => {
      const p = at(e)
      pending.current.push({ x: p.x, y: p.y, s: 0.55 })
      const spawn = (leafRef.current as unknown as { __spawn?: (x: number, y: number, n: number) => void })?.__spawn
      spawn?.((e.clientX - p.r.left), (e.clientY - p.r.top), 7)
    }
    const onMove = (e: PointerEvent) => {
      const now = e.timeStamp
      if (now - last < 28) return
      last = now
      const p = at(e)
      if (p.x < 0 || p.x > 1 || p.y < 0 || p.y > 1) return
      pending.current.push({ x: p.x, y: p.y, s: 0.32 })
      const spawn = (leafRef.current as unknown as { __spawn?: (x: number, y: number, n: number) => void })?.__spawn
      if (Math.sin(now) > 0.6) spawn?.((e.clientX - p.r.left), (e.clientY - p.r.top), 1)
    }
    wrap.addEventListener('pointerdown', onDown)
    wrap.addEventListener('pointermove', onMove)
    return () => {
      wrap.removeEventListener('pointerdown', onDown)
      wrap.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <div className="flex flex-col items-center">
      <div
        ref={wrapRef}
        className="relative touch-none cursor-pointer select-none rounded-sm"
        style={{
          width: 'min(92vw, 560px)', aspectRatio: '1 / 1',
          padding: '16px',
          background: 'linear-gradient(135deg,#3a2c12,#caa85f 18%,#f4e3b0 30%,#a8843a 52%,#6b4f1e 70%,#e8d5a3 88%,#2c2008)',
          boxShadow: '0 40px 80px -30px rgba(0,0,0,.7)',
        }}
      >
        <div className="relative w-full h-full overflow-hidden bg-black">
          {/* hidden source image for the texture / fallback */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img ref={imgRef} src={imageSrc} alt={title} crossOrigin="anonymous"
            className={webglOk ? 'hidden' : 'block w-full h-full object-cover'} />
          <canvas ref={glRef} className={`absolute inset-0 w-full h-full ${webglOk ? '' : 'hidden'}`} />
          <canvas ref={leafRef} className="pointer-events-none absolute inset-0" />
          <div className="pointer-events-none absolute top-3 left-3 rounded-full bg-black/45 backdrop-blur-sm px-3 py-1 text-[11px] tracking-widest uppercase text-amber-100">
            ✦ Touch the canvas
          </div>
        </div>
      </div>
      <div className="mt-7 text-center max-w-md">
        <h3 className="text-2xl text-amber-50" style={{ fontFamily: 'var(--font-display), Georgia, serif', fontWeight: 600 }}>{title}</h3>
        {caption && <p className="mt-2 text-sm text-neutral-400 leading-relaxed">{caption}</p>}
        <p className="mt-3 text-xs text-amber-500/80">Drag across the painting — the surface ripples, and leaves fall where you touch.</p>
      </div>
    </div>
  )
}
