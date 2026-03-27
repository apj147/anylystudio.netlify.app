export default function netlifyImageLoader({ src, width, quality }) {
  const params = new URLSearchParams({
    url: src.startsWith('http') ? src : `https://anylystudio.com${src}`,
    w: width,
    q: quality || 75,
  })
  return `/.netlify/images?${params}`
}
