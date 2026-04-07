'use client'

/**
 * CTA FINAL — bloco grande, 1 acção, alinhado à esquerda (regra Gu).
 */

import { FadeInScroll } from '@/components/animations/FadeInScroll'
import { GradientButton } from '@/components/ui/GradientButton'

export function CtaSection() {
  return (
    <section id="cta" className="px-6 py-32 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <FadeInScroll>
          <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border-strong)] bg-gradient-to-br from-[var(--color-bg-elevated)] to-[var(--color-bg)] p-12 md:p-20">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[var(--color-accent)]">
              Próximo Passo
            </p>
            <h2 className="mb-6 max-w-3xl text-[clamp(1.875rem,3.5vw,3rem)] font-semibold leading-[1.05]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod
            </h2>
            <p className="mb-10 max-w-xl text-lg text-[var(--color-fg-muted)]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
            </p>
            <GradientButton variant="primary" size="lg">
              Agendar Diagnóstico
            </GradientButton>
          </div>
        </FadeInScroll>
      </div>
    </section>
  )
}
