// Generates PWA app icons from an inline SVG monogram.
// Run: node scripts/generate-icons.mjs  (requires: npm i --no-save sharp)
import sharp from 'sharp'
import { mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public', 'icons')
mkdirSync(outDir, { recursive: true })

// pad: extra safe-zone padding for maskable icons (content must survive a circle crop)
function monogramSvg(pad = 0) {
  const scale = 1 - pad * 2
  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#34302a"/>
      <stop offset="100%" stop-color="#1A1A1A"/>
    </linearGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#E8D5A3"/>
      <stop offset="55%" stop-color="#C9A959"/>
      <stop offset="100%" stop-color="#A8883A"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" fill="url(#bg)"/>
  <g transform="translate(256 256) scale(${scale}) translate(-256 -256)">
    <!-- thin gold ring -->
    <circle cx="256" cy="256" r="196" fill="none" stroke="url(#gold)" stroke-width="6"/>
    <!-- serif A monogram, drawn as paths so no font is required -->
    <g fill="url(#gold)">
      <!-- left stroke (thin) -->
      <polygon points="244,140 262,140 190,372 168,372"/>
      <!-- right stroke (thick) -->
      <polygon points="250,140 282,140 354,372 318,372"/>
      <!-- crossbar -->
      <polygon points="219,288 305,288 312,310 212,310"/>
      <!-- serif feet -->
      <rect x="156" y="364" width="58" height="9"/>
      <rect x="300" y="364" width="72" height="9"/>
      <!-- apex serif -->
      <rect x="238" y="136" width="48" height="8"/>
    </g>
    <!-- brush-stroke accent under the A -->
    <path d="M150 404 Q256 384 362 404 Q256 396 150 404 Z" fill="#8B9A7D" opacity="0.9"/>
  </g>
</svg>`
}

const standard = Buffer.from(monogramSvg(0))
const maskable = Buffer.from(monogramSvg(0.12))

const jobs = [
  { src: standard, size: 192, name: 'icon-192.png' },
  { src: standard, size: 512, name: 'icon-512.png' },
  { src: standard, size: 180, name: 'apple-touch-icon.png' },
  { src: maskable, size: 192, name: 'icon-maskable-192.png' },
  { src: maskable, size: 512, name: 'icon-maskable-512.png' },
]

for (const { src, size, name } of jobs) {
  await sharp(src).resize(size, size).png().toFile(join(outDir, name))
  console.log('wrote', name)
}
