// Reference scrape — extracts patterns from premium sites via Playwright.
// Skill: ~/.claude/skills/reference-scraping/SKILL.md
// Output: _validation/references/<site>/{patterns.json, hero.png, hero-hovered.png}
import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'

const SITES = [
  { name: 'linear',    url: 'https://linear.app' },
  { name: 'stripe',    url: 'https://stripe.com' },
  { name: 'vercel',    url: 'https://vercel.com' },
  { name: 'anthropic', url: 'https://www.anthropic.com' },
  { name: 'attio',     url: 'https://attio.com' },
  { name: 'resend',    url: 'https://resend.com' },
  { name: 'framer',    url: 'https://framer.com' },
  { name: 'raycast',   url: 'https://raycast.com' },
  { name: 'spline',    url: 'https://spline.design' },
  { name: 'lovable',   url: 'https://lovable.dev' },
]
const OUT = '_validation/references'
const LIB_HINTS = ['gsap', 'lenis', 'motion', 'three', 'ogl', 'framer-motion', 'react-spring', 'splinetool']

async function scrape(site) {
  const dir = path.join(OUT, site.name)
  fs.mkdirSync(dir, { recursive: true })
  const browser = await chromium.launch()
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  })
  const page = await ctx.newPage()
  const libs = new Set()
  page.on('response', (res) => {
    const u = res.url()
    LIB_HINTS.forEach(h => { if (u.includes(h)) libs.add(h) })
  })

  try {
    await page.goto(site.url, { waitUntil: 'domcontentloaded', timeout: 30000 })
    await page.waitForTimeout(3500)
    await page.screenshot({ path: path.join(dir, 'hero.png'), fullPage: false })

    const patterns = await page.evaluate(() => {
      const root = getComputedStyle(document.documentElement)
      const cssVars = {}
      for (let i = 0; i < root.length; i++) {
        const k = root[i]
        if (k.startsWith('--')) cssVars[k] = root.getPropertyValue(k).trim()
      }
      const interactive = Array.from(
        document.querySelectorAll('button, a, [role="button"]')
      ).slice(0, 50)
      const transitions = interactive.map(el => {
        const cs = getComputedStyle(el)
        return {
          tag: el.tagName.toLowerCase(),
          text: (el.innerText || '').slice(0, 40).replace(/\s+/g, ' ').trim(),
          transition: cs.transition,
          transitionDuration: cs.transitionDuration,
          transitionTimingFunction: cs.transitionTimingFunction,
          borderRadius: cs.borderRadius,
          fontWeight: cs.fontWeight,
        }
      }).filter(t => t.transition && t.transition !== 'all 0s ease 0s')

      const animations = (document.getAnimations?.() || []).slice(0, 20).map(a => {
        let timing = {}
        try { timing = a.effect?.getTiming?.() || {} } catch (e) {}
        return {
          type: a.constructor.name,
          playState: a.playState,
          duration: timing.duration,
          easing: timing.easing,
          target: a.effect?.target?.tagName?.toLowerCase() || null,
        }
      })

      const fonts = Array.from(document.fonts).slice(0, 10).map(f => ({
        family: f.family, weight: f.weight, style: f.style, status: f.status,
      }))
      const body = getComputedStyle(document.body)
      return {
        url: location.href,
        title: document.title,
        bodyBg: body.backgroundColor,
        bodyColor: body.color,
        bodyFont: body.fontFamily,
        cssVars,
        transitions,
        animations,
        fonts,
      }
    })
    patterns.libs = Array.from(libs)

    // Try to find primary CTA and hover it
    const selectors = [
      'a[href*="signup"]', 'a[href*="start"]', 'a[href*="get-started"]',
      'button:has-text("Start")', 'button:has-text("Get")', 'a:has-text("Get started")',
      'a:has-text("Try")', 'a:has-text("Sign up")', 'main button',
    ]
    let ctaHandle = null
    for (const sel of selectors) {
      ctaHandle = await page.$(sel).catch(() => null)
      if (ctaHandle) break
    }
    if (ctaHandle) {
      try {
        await ctaHandle.hover({ timeout: 2000 })
        await page.waitForTimeout(400)
        await page.screenshot({ path: path.join(dir, 'hero-hovered.png'), fullPage: false })
        const ctaStyle = await ctaHandle.evaluate(el => {
          const cs = getComputedStyle(el)
          return {
            text: (el.innerText || '').slice(0, 40),
            background: cs.backgroundColor,
            color: cs.color,
            transition: cs.transition,
            transform: cs.transform,
            borderRadius: cs.borderRadius,
            fontWeight: cs.fontWeight,
            fontSize: cs.fontSize,
            padding: cs.padding,
            boxShadow: cs.boxShadow,
          }
        })
        patterns.primaryCTA = ctaStyle
      } catch (e) { patterns.ctaError = String(e).slice(0, 200) }
    } else {
      patterns.ctaError = 'no CTA selector matched'
    }

    fs.writeFileSync(path.join(dir, 'patterns.json'), JSON.stringify(patterns, null, 2))
    console.log(`✓ ${site.name} (${patterns.transitions.length} transitions, ${patterns.libs.length} libs)`)
  } catch (e) {
    console.log(`✗ ${site.name}: ${e.message.slice(0, 100)}`)
    fs.writeFileSync(path.join(dir, 'error.txt'), String(e))
  } finally {
    await browser.close()
  }
}

for (const site of SITES) {
  await scrape(site)
}
console.log('done — check _validation/references/')
