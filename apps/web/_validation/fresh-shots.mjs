// Fresh page load por screenshot — testa exactamente como user real vê.
// Sem ?validate, sem bypasses. Cada screenshot = nova página = estado limpo.
// ScrollSmoother activo, pin activo. Scrollamos via ScrollSmoother API.
import { chromium } from 'playwright'

const SHOTS = [
  { y: 0,    name: '01-hero',         label: 'Hero — SplitText words + 2 CTAs + visual mock' },
  { y: 950,  name: '02-paraquem',     label: 'Para Quem — 4 personas grid' },
  { y: 1700, name: '03-solucoes',     label: 'Soluções — item 1 (Agentes IA, text left)' },
  { y: 2700, name: '04-solucoes-2',   label: 'Soluções — item 2 (Automações, reverse)' },
  { y: 3700, name: '05-metodologia',  label: 'Metodologia — timeline 4 passos' },
  { y: 4700, name: '06-metricas',     label: 'Métricas — counters + pin signature' },
  { y: 6500, name: '07-casos',        label: 'Casos — 3 cards' },
  { y: 7400, name: '08-diferencial',  label: 'Diferencial' },
  { y: 8200, name: '09-prova-social', label: 'Prova Social — testimonial + marquee logos' },
  { y: 8900, name: '10-seguranca',    label: 'Segurança — 3 badges GDPR/SSL/NDA' },
  { y: 9270, name: '11-cta',          label: 'CTA final' },
  { y: 9900, name: '12-footer',       label: 'Footer — Trion. gigante + marquee' },
]

async function shoot(width, label) {
  const browser = await chromium.launch()
  const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1 })
  for (const { y, name } of SHOTS) {
    const page = await ctx.newPage()
    await page.goto(`http://localhost:3000/?_=${Date.now()}_${name}`, { waitUntil: 'networkidle' })
    // aguardar loader fade-out (1.05s) + ScrollSmoother init
    await page.waitForTimeout(2000)
    if (y > 0) {
      // ScrollSmoother intercepta window.scrollTo. Usar ScrollSmoother API
      // se disponível, senão dispatch wheel events.
      await page.evaluate(async (targetY) => {
        // Tentar via ScrollSmoother (se exposto)
        // GSAP não expõe globalmente — fallback para dispatchEvent + scrollTo
        // Como hack: scrolla em pequenos passos esperando o smoother seguir
        const steps = 30
        for (let i = 0; i <= steps; i++) {
          const cur = (targetY * i) / steps
          window.scrollTo(0, cur)
          await new Promise(r => setTimeout(r, 30))
        }
        // Aguardar ScrollSmoother estabilizar (smooth: 1.5s)
        await new Promise(r => setTimeout(r, 1800))
      }, y)
    }
    await page.screenshot({ path: `_validation/fresh-${label}-${name}.png`, fullPage: false })
    console.log(`saved fresh-${label}-${name}.png`)
    await page.close()
  }
  await browser.close()
}

await shoot(1440, 'desktop')
