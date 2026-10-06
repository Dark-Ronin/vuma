// Imagem provisória (SVG) para cada produto. Para usar fotos reais, basta
// substituir os valores de `images` em data/products.js por URLs.
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const CAPTIONS = [null, 'Vista lateral', 'Na embalagem']

export function placeholder(label, icon, hue, variant = 0) {
  const text = esc(CAPTIONS[variant] || (label.length > 30 ? label.slice(0, 29) + '…' : label))
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'>` +
    `<rect width='600' height='600' fill='hsl(${hue} 28% 95%)'/>` +
    `<circle cx='${270 + variant * 30}' cy='285' r='${195 - variant * 18}' fill='hsl(${hue} 32% 87%)'/>` +
    `<text x='${270 + variant * 30}' y='350' font-size='${210 - variant * 24}' text-anchor='middle'>${icon}</text>` +
    `<text x='300' y='555' font-size='26' font-family='sans-serif' font-weight='600' text-anchor='middle' fill='hsl(${hue} 22% 32%)'>${text}</text>` +
    `</svg>`
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg)
}
