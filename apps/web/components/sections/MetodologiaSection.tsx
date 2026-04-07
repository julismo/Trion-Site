'use client'

/**
 * METODOLOGIA — timeline vertical com linha que cresce ao scroll.
 * Usa scrub: true para ligar o crescimento à posição do scroll (skill scroll-experience).
 */

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap-init'
import { FadeInScroll } from '@/components/animations/FadeInScroll'

const STEPS = [
  { num: '01', title: 'Diagnóstico', meta: '30 min · sem compromisso' },
  { num: '02', title: 'Mapeamento', meta: '1 semana · alinhamento' },
  { num: '03', title: 'Build', meta: '2-6 semanas · sprints' },
  { num: '04', title: 'Operação', meta: 'mensal · evolução contínua' },
]

export function MetodologiaSection() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.fromTo(
        '.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 70%',
            end: 'bottom 70%',
            scrub: true,
          },
        }
      )
    },
    { scope: ref }
  )

  return (
    <section id="metodologia" className="px-6 py-32 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <FadeInScroll>
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[var(--color-accent)]">
            Como Trabalhamos
          </p>
          <h2 className="mb-20 max-w-3xl text-[clamp(1.75rem,3vw,2.75rem)] font-semibold leading-[1.05]">
            Lorem ipsum dolor sit amet consectetur adipiscing elit
          </h2>
        </FadeInScroll>

        <div ref={ref} className="relative ml-4 max-w-3xl">
          {/* Linha base */}
          <div className="absolute left-0 top-0 h-full w-px bg-[var(--color-border)]" />
          {/* Linha animada */}
          <div className="timeline-line absolute left-0 top-0 h-full w-px origin-top bg-[var(--color-accent)]" />

          <div className="space-y-16 pl-12">
            {STEPS.map((s) => (
              <div key={s.num} className="relative">
                <div className="absolute -left-[3.25rem] top-1 h-3 w-3 rounded-full bg-[var(--color-accent)] ring-4 ring-[var(--color-bg)]" />
                <p className="mb-1 font-mono text-sm text-[var(--color-fg-subtle)]">{s.num}</p>
                <h3 className="mb-2 text-xl font-semibold text-[var(--color-fg)]">{s.title}</h3>
                <p className="mb-1 text-[var(--color-fg-muted)]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.
                </p>
                <p className="text-sm text-[var(--color-fg-subtle)]">{s.meta}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
