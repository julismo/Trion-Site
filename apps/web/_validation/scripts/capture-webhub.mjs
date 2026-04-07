// _validation/scripts/capture-webhub.mjs
// Captura forense da hero do grupowebhub.com.br para extracção de tokens.
// Usage: node _validation/scripts/capture-webhub.mjs
import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'

const URL = 'https://grupowebhub.com.br/home/'
const OUT_DIR = path.resolve('_validation/webhub')
fs.mkdirSync(OUT_DIR, { recursive: true })
fs.mkdirSync(path.join(OUT_DIR, 'screenshots'), { recursive: true })

const VIEWPORTS = [
  { w: 1920, h: 1080, n: '1920' },
  { w: 1440, h: 900, n: '1440' },
  { w: 390, h: 844, n: '390' },
]

const browser = await chromium.launch()

// 1. Computed styles + DOM dump (no first viewport)
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const p = await ctx.newPage()
  await p.goto(URL, { waitUntil: 'networkidle' })
  await p.waitForTimeout(3000)

  // Hero HTML structure
  const heroHTML = await p
    .locator('section.hero, .hero')
    .first()
    .innerHTML()
    .catch(() => '')
  fs.writeFileSync(path.join(OUT_DIR, 'hero.html'), heroHTML)

  // Computed styles deep dive
  const data = await p.$$eval('section.hero *, .hero *', (els) =>
    els.slice(0, 250).map((el) => {
      const cs = getComputedStyle(el)
      const r = el.getBoundingClientRect()
      return {
        tag: el.tagName,
        cls: el.className?.toString().slice(0, 100) || '',
        text: el.textContent?.slice(0, 80).trim() || '',
        box: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
        color: cs.color,
        bg: cs.backgroundImage !== 'none' ? cs.backgroundImage.slice(0, 200) : cs.backgroundColor,
        font: `${cs.fontFamily} | ${cs.fontWeight} | ${cs.fontSize}/${cs.lineHeight}`,
        ls: cs.letterSpacing,
        textAlign: cs.textAlign,
        pad: cs.padding,
        mar: cs.margin,
        gap: cs.gap,
        transform: cs.transform.slice(0, 80),
        transition: cs.transition.slice(0, 100),
        filter: cs.filter,
      }
    }),
  )
  fs.writeFileSync(path.join(OUT_DIR, 'webhub.computed.json'), JSON.stringify(data, null, 2))

  // Animation libs detection
  const libs = await p.evaluate(() => ({
    gsap: !!window.gsap,
    ScrollTrigger: !!(window.gsap?.ScrollTrigger || window.ScrollTrigger),
    SplitText: !!(window.gsap?.SplitText || window.SplitText),
    ScrollSmoother: !!(window.gsap?.ScrollSmoother || window.ScrollSmoother),
    lenis: !!window.Lenis,
    aos: !!window.AOS,
    swiper: !!window.Swiper,
    lottie: !!window.lottie,
    three: !!window.THREE,
    framer: !!window.framerMotion,
  }))
  fs.writeFileSync(path.join(OUT_DIR, 'libs.json'), JSON.stringify(libs, null, 2))

  // Document head — fonts, meta, scripts
  const head = await p.evaluate(() => ({
    title: document.title,
    fonts: [...document.fonts].map((f) => ({ family: f.family, weight: f.weight, status: f.status })),
    stylesheets: [...document.styleSheets].map((s) => s.href).filter(Boolean),
    scripts: [...document.scripts].map((s) => s.src).filter(Boolean),
  }))
  fs.writeFileSync(path.join(OUT_DIR, 'head.json'), JSON.stringify(head, null, 2))

  await ctx.close()
}

// 2. Screenshots por viewport
for (const v of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: { width: v.w, height: v.h } })
  const p = await ctx.newPage()
  await p.goto(URL, { waitUntil: 'networkidle' })
  await p.waitForTimeout(3000)
  await p.screenshot({ path: path.join(OUT_DIR, 'screenshots', `hero-${v.n}-load.png`) })
  for (let i = 1; i <= 5; i++) {
    await p.evaluate((y) => window.scrollBy(0, y), 200)
    await p.waitForTimeout(400)
    await p.screenshot({ path: path.join(OUT_DIR, 'screenshots', `hero-${v.n}-scroll-${i}.png`) })
  }
  await ctx.close()
}

await browser.close()
console.log('✓ Captured grupowebhub hero into', OUT_DIR)
