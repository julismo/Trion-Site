// Captura strips por scroll position (6 viewports) para conseguir inspeccionar
// cada secção visualmente no Read tool.
import { chromium } from 'playwright'

const STRIPS = [
  { y: 0,    name: '01-hero' },
  { y: 950,  name: '02-paraquem' },
  { y: 1700, name: '03-solucoes-top' },
  { y: 2700, name: '04-solucoes-bot' },
  { y: 3750, name: '05-metodologia' },
  { y: 4700, name: '06-metricas' },
  { y: 5600, name: '07-prova-social' },
  { y: 6500, name: '08-casos' },
  { y: 7400, name: '09-diferencial' },
  { y: 8300, name: '10-seguranca' },
  { y: 9270, name: '11-cta' },
  { y: 10000, name: '12-footer' },
]

async function run() {
  const browser = await chromium.launch()
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })
  const page = await ctx.newPage()
  await page.goto('http://localhost:3000/?validate=1', { waitUntil: 'networkidle' })
  await page.waitForTimeout(1500)

  // dispara todos os scrolltriggers
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60))
    }
  })
  await page.addStyleTag({ content: '*, *::before, *::after { opacity: 1 !important; }' })

  for (const { y, name } of STRIPS) {
    await page.evaluate((y) => window.scrollTo(0, y), y)
    await page.waitForTimeout(200)
    await page.screenshot({ path: `_validation/strip-${name}.png`, fullPage: false })
    console.log('saved:', name)
  }
  await browser.close()
}
run()
