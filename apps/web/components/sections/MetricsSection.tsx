'use client'

/**
 * MÉTRICAS ⭐ signature #3 — pin + counter.
 * A secção agarra no centro do viewport enquanto os números contam de 0 → valor.
 */

import { PinnedSection } from '@/components/animations/PinnedSection'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'

const METRICS = [
  { value: 0, suffix: '%', label: 'Lorem ipsum dolor' },
  { value: 0, suffix: '×', label: 'Lorem ipsum amet' },
  { value: 0, suffix: '%', label: 'Lorem ipsum sit' },
  { value: 0, suffix: '+', label: 'Lorem ipsum' },
]

export function MetricsSection() {
  return (
    <PinnedSection className="flex min-h-screen items-center px-6 py-32 lg:px-12">
      <div className="mx-auto w-full max-w-[1400px]">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[var(--color-accent)]">
          Lorem
        </p>
        <h2 className="mb-20 max-w-3xl text-[clamp(1.75rem,3vw,2.75rem)] font-semibold leading-[1.05]">
          Lorem ipsum dolor sit amet consectetur adipiscing
        </h2>

        <div className="grid grid-cols-2 gap-y-16 lg:grid-cols-4 lg:gap-x-8">
          {METRICS.map((m) => (
            <div key={m.label} className="border-l border-[var(--color-border-strong)] pl-6">
              <div className="mb-3 text-[clamp(2.5rem,4.5vw,4rem)] font-semibold leading-none text-[var(--color-fg)]">
                <AnimatedCounter to={m.value} suffix={m.suffix} />
              </div>
              <p className="text-sm text-[var(--color-fg-muted)]">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </PinnedSection>
  )
}
