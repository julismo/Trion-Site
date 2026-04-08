'use client'

/**
 * CASOS — réplica EXACTA da animação `.projetos` do grupowebhub.com.br
 *
 * Estrutura DOM (espelha webhub):
 *   section.projetos (flex col, align-center, gap 3.6rem)
 *     div.titulo (h2 com SplitText blur reveal)
 *     a (wrapper, full width, height 691px)
 *       div.projeto (width 60%→100%, radius 86→0, overflow hidden)
 *         img (full width, saturate 0→100%, object-cover)
 *
 * Animação por card (3 tweens scrub-tied):
 *   1. width 60% → 100%      (range ~800px scroll)
 *   2. borderRadius 86 → 0   (sync com width)
 *   3. img saturate 0 → 100% (start ~270px atrasado, range ~520px)
 *
 * Cada card sequencial — terminam antes do próximo começar.
 */

import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap-init'
import { SplitTextReveal } from '@/components/animations/SplitTextReveal'

interface Caso {
  tag: string
  titulo: string
  desc: string
  metric: string
  metricLabel: string
  /** Gradiente CSS para o "img" placeholder (não temos imagens reais ainda) */
  gradient: string
}

const CASOS: Caso[] = [
  {
    tag: 'Lorem',
    titulo: 'Lorem ipsum dolor sit amet',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor.',
    metric: '00%',
    metricLabel: 'lorem ipsum',
    gradient: 'linear-gradient(135deg, #ff6b2c 0%, #ffb86b 50%, #ff3d00 100%)',
  },
  {
    tag: 'Lorem',
    titulo: 'Lorem ipsum dolor sit amet',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor.',
    metric: '0×',
    metricLabel: 'lorem ipsum',
    gradient: 'linear-gradient(135deg, #1e88e5 0%, #00d4ff 50%, #0d47a1 100%)',
  },
  {
    tag: 'Lorem',
    titulo: 'Lorem ipsum dolor sit amet',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor.',
    metric: '+0%',
    metricLabel: 'lorem ipsum',
    gradient: 'linear-gradient(135deg, #8e24aa 0%, #e91e63 50%, #4a148c 100%)',
  },
]

export function CasosSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!sectionRef.current) return
      // Reduced motion: deixar tudo no estado final
      if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const cards = sectionRef.current.querySelectorAll<HTMLDivElement>('.projeto')
        cards.forEach((c) => {
          c.style.width = '100%'
          c.style.borderRadius = '0px'
          const img = c.querySelector<HTMLDivElement>('.projeto-img')
          if (img) img.style.filter = 'saturate(100%)'
        })
        return
      }

      const cards = sectionRef.current.querySelectorAll<HTMLDivElement>('.projeto')

      cards.forEach((card) => {
        const img = card.querySelector<HTMLDivElement>('.projeto-img')

        // Estado inicial mais dramático: 50% width + 110px radius (era 60%/86px)
        gsap.set(card, { width: '50%', borderRadius: 110 })
        if (img) gsap.set(img, { filter: 'saturate(0)' })

        // Tween 1+2: width + borderRadius — scrub tied, range maior por card
        gsap.to(card, {
          width: '100%',
          borderRadius: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            end: 'top 10%',
            scrub: 1.5,
            invalidateOnRefresh: true,
          },
        })

        // Tween 3: img saturate (start atrasado, range mais curto)
        if (img) {
          gsap.to(img, {
            filter: 'saturate(100%)',
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top 60%',
              end: 'top 20%',
              scrub: 1.5,
              invalidateOnRefresh: true,
            },
          })
        }
      })

      return () => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger && sectionRef.current?.contains(st.trigger as Node)) st.kill()
        })
      }
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      id="casos"
      className="projetos flex flex-col items-center gap-[6rem] py-32"
    >
      {/* Título — flex col centered, igual ao webhub */}
      <div className="titulo flex w-full max-w-[600px] flex-col items-center px-6 text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[var(--color-accent)]">
          Lorem
        </p>
        <SplitTextReveal
          as="h2"
          effect="blur"
          onScroll
          className="text-[clamp(2rem,3.75vw,3.5rem)] font-semibold leading-[1.1] text-white/90"
        >
          Lorem ipsum dolor sit amet.
        </SplitTextReveal>
        <p className="mt-4 max-w-[480px] text-base text-white/60">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt.
        </p>
      </div>

      {/* Cards — cada um wrapped num <a> full width */}
      {CASOS.map((c, i) => (
        <a
          key={i}
          href="#"
          className="flex w-full items-center justify-center px-2"
          aria-label={`Ver caso: ${c.titulo}`}
        >
          <div
            className="projeto relative flex h-[675px] items-center justify-center overflow-hidden"
            style={{ width: '50%', borderRadius: '110px' }}
          >
            {/* "img" — placeholder gradient. Quando tivermos imagens reais, trocar por <Image> */}
            <div
              className="projeto-img absolute inset-0 h-full w-screen"
              style={{
                background: c.gradient,
                filter: 'saturate(0)',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            />

            {/* Conteúdo overlay (centered, sobre o gradient) */}
            <div className="relative z-10 flex w-full max-w-[1100px] flex-col items-start gap-4 px-12 lg:px-20">
              <span className="inline-block rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-white/80 backdrop-blur-sm">
                {c.tag}
              </span>
              <h3 className="max-w-[640px] text-[clamp(1.5rem,2.5vw,2.5rem)] font-semibold leading-[1.15] text-white">
                {c.titulo}
              </h3>
              <p className="max-w-[520px] text-base text-white/75">{c.desc}</p>
              <div className="mt-2 flex items-baseline gap-3">
                <span className="text-[clamp(2rem,3.5vw,3.25rem)] font-semibold text-[var(--color-accent)]">
                  {c.metric}
                </span>
                <span className="text-sm uppercase tracking-wider text-white/55">
                  {c.metricLabel}
                </span>
              </div>
            </div>
          </div>
        </a>
      ))}
    </section>
  )
}
