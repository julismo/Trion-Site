'use client'

/**
 * CASOS — 3 cards de caso de estudo, reveal sequencial.
 */

import { FadeInScroll } from '@/components/animations/FadeInScroll'
import { ArrowUpRight } from 'lucide-react'

const CASOS = [
  { tag: 'E-Commerce', metric: '−63%', metricLabel: 'tempo de ticket' },
  { tag: 'Saúde', metric: '4×', metricLabel: 'capacidade processada' },
  { tag: 'Educação', metric: '+38%', metricLabel: 'conversão de leads' },
]

export function CasosSection() {
  return (
    <section id="casos" className="px-6 py-32 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <FadeInScroll>
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[var(--color-accent)]">
            Casos
          </p>
          <h2 className="mb-20 max-w-3xl text-[clamp(1.75rem,3vw,2.75rem)] font-semibold leading-[1.05]">
            Lorem ipsum dolor sit amet consectetur adipiscing elit
          </h2>
        </FadeInScroll>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {CASOS.map((c, i) => (
            <FadeInScroll key={c.tag} delay={i * 0.12}>
              <article className="group relative h-full overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white/[0.03] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-card)]">
                <div className="mb-8 aspect-video rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)]" />
                <span className="mb-3 inline-block rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-fg-subtle)]">
                  {c.tag}
                </span>
                <h3 className="mb-4 text-xl font-semibold text-[var(--color-fg)]">
                  Lorem ipsum dolor sit amet
                </h3>
                <p className="mb-6 text-sm text-[var(--color-fg-muted)]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor.
                </p>
                <div className="flex items-end justify-between border-t border-[var(--color-border)] pt-6">
                  <div>
                    <p className="text-3xl font-semibold text-[var(--color-accent)]">{c.metric}</p>
                    <p className="text-xs text-[var(--color-fg-subtle)]">{c.metricLabel}</p>
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="text-[var(--color-fg-muted)] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--color-accent)]"
                  />
                </div>
              </article>
            </FadeInScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
