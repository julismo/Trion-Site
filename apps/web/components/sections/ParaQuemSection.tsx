'use client'

/**
 * PARA QUEM — 4 personas em grid.
 * Stagger entry via FadeInScroll com delays incrementais.
 */

import { Cog, MonitorCog, Lightbulb, TrendingUp } from 'lucide-react'
import { FadeInScroll } from '@/components/animations/FadeInScroll'

const PERSONAS = [
  { icon: Cog, role: 'COO', label: 'Lorem ipsum dolor sit' },
  { icon: MonitorCog, role: 'CIO', label: 'Lorem ipsum dolor sit' },
  { icon: Lightbulb, role: 'Inovação', label: 'Lorem ipsum dolor sit' },
  { icon: TrendingUp, role: 'CEO', label: 'Lorem ipsum dolor sit' },
]

export function ParaQuemSection() {
  return (
    <section id="para-quem" className="px-6 py-32 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <FadeInScroll>
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[var(--color-accent)]">
            Para Quem
          </p>
          <h2 className="mb-4 max-w-3xl text-[clamp(1.75rem,3vw,2.75rem)] font-semibold leading-[1.05]">
            Lorem ipsum dolor sit amet consectetur adipiscing elit
          </h2>
          <p className="mb-16 max-w-xl text-lg text-[var(--color-fg-muted)]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
          </p>
        </FadeInScroll>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PERSONAS.map((p, i) => {
            const Icon = p.icon
            return (
              <FadeInScroll key={p.role} delay={i * 0.1}>
                <article className="group h-full rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white/[0.03] p-8 transition-all duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:border-[var(--color-accent)] hover:bg-white/[0.05] hover:shadow-[var(--shadow-card)]">
                  <Icon
                    size={32}
                    className="mb-6 text-[var(--color-accent)] transition-transform duration-300 group-hover:scale-110"
                  />
                  <p className="mb-2 text-xs font-medium uppercase tracking-widest text-[var(--color-fg-subtle)]">
                    {p.role}
                  </p>
                  <h3 className="mb-3 text-xl font-semibold text-[var(--color-fg)]">
                    {p.label}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--color-fg-muted)]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm text-[var(--color-fg-muted)] transition-colors group-hover:text-[var(--color-accent)]">
                    Ver mais →
                  </span>
                </article>
              </FadeInScroll>
            )
          })}
        </div>
      </div>
    </section>
  )
}
