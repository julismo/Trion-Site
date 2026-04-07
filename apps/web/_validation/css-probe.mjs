import { chromium } from 'playwright'
const b = await chromium.launch()
const p = await b.newPage()
const sheets = []
p.on('response', async r => { if (r.url().includes('.css')) sheets.push(r.url()) })
await p.goto('http://localhost:3000', { waitUntil: 'networkidle' })
for (const url of sheets) {
  const res = await p.request.get(url)
  const text = await res.text()
  const h1Rules = text.match(/h1[,\s][^{]*\{[^}]{0,250}\}/g) || []
  console.log('url:', url)
  console.log('h1 rules:', h1Rules.length)
  h1Rules.forEach((r,i) => console.log(' ', i, r.replace(/\s+/g,' ').slice(0,220)))
  console.log('has @layer base:', text.includes('@layer base'))
  console.log('has mb-6:', /\.mb-6\s*\{/.test(text))
}
await b.close()
