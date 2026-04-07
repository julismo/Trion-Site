import { chromium } from 'playwright'

async function run() {
  const browser = await chromium.launch()
  const ctx = await browser.newContext({ viewport: { width: 375, height: 812 }, deviceScaleFactor: 1 })
  const page = await ctx.newPage()
  await page.goto('http://localhost:3000/?validate=1', { waitUntil: 'networkidle' })
  await page.waitForTimeout(1500)
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60))
    }
  })
  await page.addStyleTag({ content: '*, *::before, *::after { opacity: 1 !important; }' })

  const total = await page.evaluate(() => document.body.scrollHeight)
  const positions = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9].map(p => Math.round(total * p))
  for (let i = 0; i < positions.length; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), positions[i])
    await page.waitForTimeout(200)
    await page.screenshot({ path: `_validation/mobile-${String(i+1).padStart(2,'0')}.png`, fullPage: false })
    console.log('saved mobile', i+1, 'y=', positions[i])
  }
  await browser.close()
}
run()
