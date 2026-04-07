'use client'

/**
 * HeroPartnersMarquee — marquee infinito SEAMLESS via GSAP.
 *
 * Bug anterior (CSS @keyframes -50%): pausa visível ao final de cada iteração
 * porque o reset de transform não é GPU-perfeito + sub-pixel rounding.
 *
 * Fix: GSAP `gsap.to({ xPercent: -50, repeat: -1, ease: 'none' })` —
 * GSAP usa modifiers internos para wrap contínuo, ZERO pausas.
 *
 * Logos com COR ORIGINAL (sem filter brightness/invert).
 * 25 logos × 2 (duplicado para seamless wrap).
 */

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap-init'

/**
 * 46 logos curados — STACK COMPLETO TRION (IA + dev/code + infra).
 * Removidos APENAS: Discord, Shopify (não fazem sentido para agência IA B2B).
 * Mantidos: todas as ferramentas de código/dev/infra que a Trion usa.
 *
 * Flag `mono: true` → SVG é preto/cinza escuro. Hover NÃO reverte
 * para cor original (ficaria invisível no fundo escuro), apenas
 * passa de opacidade 60% → 100%.
 */
const PARTNERS: Array<{ name: string; file: string; mono?: boolean }> = [
  // ── LLMs / Foundation models (10) ──
  { name: 'Anthropic',    file: 'anthropic.svg', mono: true }, // #191919
  { name: 'Claude',       file: 'claude.svg' },                 // #D97757
  { name: 'OpenAI',       file: 'openai.svg', mono: true },    // sem fill (default black)
  { name: 'Gemini',       file: 'gemini.svg' },                 // multi
  { name: 'Mistral AI',   file: 'mistral-ai.svg' },             // orange grad
  { name: 'Meta',         file: 'meta.svg' },                   // #0081FB
  { name: 'DeepSeek',     file: 'deepseek.svg' },               // #4D6BFE
  { name: 'Cohere',       file: 'cohere.svg' },                 // multi
  { name: 'Perplexity',   file: 'perplexity.svg' },             // #1FB8CD
  { name: 'Groq',         file: 'groq.svg' },                   // #F54F35

  // ── AI Tools / Hubs / Modelos (3) ──
  { name: 'Hugging Face', file: 'hugging-face.svg' },           // multi
  { name: 'Stability AI', file: 'stability-ai.svg' },           // #E80000
  { name: 'Runway',       file: 'runway.svg', mono: true },    // mixed black/white

  // ── Automação / Agentes (3) ──
  { name: 'n8n',          file: 'n8n.svg' },                    // #EA4B71
  { name: 'Zapier',       file: 'zapier.svg' },                 // #FF4F00
  { name: 'Make',         file: 'make.svg' },                   // #6D00CC

  // ── Backend Languages / Runtime (4) ──
  { name: 'Python',       file: 'python.svg' },                 // #3776AB
  { name: 'Node.js',      file: 'nodedotjs.svg' },              // #5FA04E
  { name: 'Bun',          file: 'bun.svg' },
  { name: 'FastAPI',      file: 'fastapi.svg' },                // #009688

  // ── Frontend Frameworks (5) ──
  { name: 'Next.js',      file: 'nextdotjs.svg', mono: true }, // #000000
  { name: 'React',        file: 'react.svg' },                  // #61DAFB
  { name: 'TypeScript',   file: 'typescript.svg' },             // #3178C6
  { name: 'Tailwind',     file: 'tailwindcss.svg' },            // #06B6D4
  { name: 'Astro',        file: 'astro.svg' },

  // ── Database / RAG (5) ──
  { name: 'PostgreSQL',   file: 'postgresql.svg' },             // #4169E1 (pgvector)
  { name: 'Supabase',     file: 'supabase.svg' },               // #3FCF8E (pgvector)
  { name: 'MongoDB',      file: 'mongodb.svg' },
  { name: 'Redis',        file: 'redis.svg' },
  { name: 'Prisma',       file: 'prisma.svg', mono: true },    // #2D3748

  // ── Cloud / Deploy (6) ──
  { name: 'Vercel',       file: 'vercel.svg', mono: true },    // #000000 (Vercel AI SDK)
  { name: 'Cloudflare',   file: 'cloudflare.svg' },             // #F38020 (Workers AI)
  { name: 'Google Cloud', file: 'googlecloud.svg' },            // (Vertex AI)
  { name: 'Railway',      file: 'railway.svg' },
  { name: 'Netlify',      file: 'netlify.svg' },
  { name: 'Kubernetes',   file: 'kubernetes.svg' },             // (ML deploy)

  // ── DevOps / Tools (3) ──
  { name: 'Docker',       file: 'docker.svg' },                 // #2496ED
  { name: 'GitHub',       file: 'github.svg', mono: true },    // #181717
  { name: 'Postman',      file: 'postman.svg' },

  // ── Workspace / SaaS (4) ──
  { name: 'Notion',       file: 'notion.svg', mono: true },    // #000000
  { name: 'Linear',       file: 'linear.svg' },                 // #5E6AD2
  { name: 'Figma',        file: 'figma.svg' },                  // multi
  { name: 'Stripe',       file: 'stripe.svg' },                 // #635BFF

  // ── CRM / Analytics (3) ──
  { name: 'HubSpot',      file: 'hubspot.svg' },                // #FF7A59
  { name: 'Mixpanel',     file: 'mixpanel.svg' },
  { name: 'PostHog',      file: 'posthog.svg' },
]

export function HeroPartnersMarquee() {
  const trackRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!trackRef.current) return
      // Respect prefers-reduced-motion — sem animação
      if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      // Loop infinito SEAMLESS — xPercent -50 com GSAP repeat -1 ease none.
      // GSAP wrap interno garante zero pausa entre iterações.
      // duration escala com o nº de logos (~2.4s por item) — agora 46 logos
      // = 46 × 2.4 = 110s para manter a velocidade percebida igual.
      gsap.to(trackRef.current, {
        xPercent: -50,
        duration: 110,
        ease: 'none',
        repeat: -1,
      })
    },
    { scope: trackRef },
  )

  return (
    <div className="relative w-full overflow-hidden">
      {/* Mask edges fade — esmaece nas bordas */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            'linear-gradient(90deg, var(--color-bg) 0%, transparent 8%, transparent 92%, var(--color-bg) 100%)',
        }}
      />
      {/* Track — duplicado 2x. xPercent -50 = exactamente 1 set seamless. */}
      <div ref={trackRef} className="flex w-max items-center gap-14 py-3">
        {[...PARTNERS, ...PARTNERS].map((p, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={`${p.name}-${i}`}
            src={`/logos/partners/${p.file}`}
            alt={p.name}
            className={
              p.mono
                ? // Logos pretos/cinzas escuros: ficam SEMPRE brancos.
                  // Hover só muda opacidade — invert-0 deixá-los-ia invisíveis.
                  'h-9 w-auto opacity-60 brightness-0 invert transition-all duration-300 hover:opacity-100'
                : // Logos coloridos: hover revela a cor original do brand.
                  'h-9 w-auto opacity-65 brightness-0 invert transition-all duration-300 hover:brightness-100 hover:opacity-100 hover:invert-0'
            }
          />
        ))}
      </div>
    </div>
  )
}
