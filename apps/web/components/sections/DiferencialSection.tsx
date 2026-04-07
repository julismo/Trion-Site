'use client'

/**
 * DIFERENCIAL — porque Trion vs concorrência.
 * Layout 2 colunas: lista de pontos à esquerda, bloco visual à direita.
 */

import { Check } from 'lucide-react'
import { FadeInScroll } from '@/components/animations/FadeInScroll'

const PONTOS = [
  'Lorem ipsum dolor sit amet consectetur adipiscing elit.',
  'Lorem ipsum dolor sit amet consectetur.',
  'Lorem ipsum dolor sit amet consectetur.',
  'Lorem ipsum dolor sit amet consectetur.',
]

export function DiferencialSection() {
  return (
    <section className="px-6 py-32 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <FadeInScroll>
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[var(--color-accent)]">
              Diferencial
            </p>
            <h2 className="mb-8 text-[clamp(1.75rem,3vw,2.75rem)] font-semibold leading-[1.05]">
              Lorem ipsum dolor sit amet consectetur adipiscing elit
            </h2>
            <ul className="space-y-4">
              {PONTOS.map((p, i) => (
                <li key={i} className="flex items-start gap-3 text-[var(--color-fg-muted)]">
                  <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-[var(--color-bg)]">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </FadeInScroll>

          <FadeInScroll delay={0.2}>
            <div className="relative aspect-square rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white/[0.03]">
              <div className="absolute inset-0 flex items-center justify-center text-sm text-[var(--color-fg-subtle)]">
                
              </div>
            </div>
          </FadeInScroll>
        </div>
      </div>
    </section>
  )
}
