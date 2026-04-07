// Validation screenshot — usa ?validate=1 (bypassa ScrollSmoother),
// scrolla programaticamente para disparar todos os ScrollTriggers,
// volta ao topo, captura full-page.
import { chromium } from 'playwright'

async function shoot(width, height, file) {
  const browser = await chromium.launch()
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 })
  const page = await ctx.newPage()
  await page.goto('http://localhost:3000/?validate=1', { waitUntil: 'networkidle' })
  // aguardar loader fade-out
  await page.waitForTimeout(1500)
  const dbg = await page.evaluate(() => ({
    bodyH: document.body.scrollHeight,
    docH: document.documentElement.scrollHeight,
    wrapper: getComputedStyle(document.getElementById('smooth-wrapper')).position,
  }))
  console.log('  debug:', dbg)

  // Scroll lento até ao fim (dispara todos os FadeInScroll)
  await page.evaluate(async () => {
    const total = document.body.scrollHeight
    const step = window.innerHeight * 0.5
    for (let y = 0; y < total + window.innerHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise(r => setTimeout(r, 80))
    }
    await new Promise(r => setTimeout(r, 400))
  })

  // Não voltar ao topo: trigger 'reverse' apaga elementos. Em vez disso,
  // matar todos os ScrollTriggers ANTES de voltar — assim opacities ficam.
  await page.evaluate(async () => {
    // @ts-ignore
    const m = await import('/_next/static/chunks/' + 'gsap.js').catch(() => null)
    // fallback: usar window se exposto
  }).catch(() => {})

  // Em vez disso: força opacity 1 SÓ (sem mexer em transform)
  await page.addStyleTag({
    content: `*, *::before, *::after { opacity: 1 !important; }`,
  })
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(400)

  await page.screenshot({ path: file, fullPage: true })
  await browser.close()
  console.log('saved:', file)
}

await shoot(1440, 900, '_validation/v2-desktop.png')
await shoot(375, 812, '_validation/v2-mobile.png')
