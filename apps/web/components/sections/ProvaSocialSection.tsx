'use client'

/**
 * PROVA SOCIAL — ticker de logos + 1 testemunho.
 * Logos finais virão de svgl.app na Fase 2.
 */

import { FadeInScroll } from '@/components/animations/FadeInScroll'

const LOGO_PLACEHOLDERS = [
  'n8n', 'Claude', 'OpenAI', 'Notion', 'Linear',
  'Slack', 'Python', 'TypeScript', 'Vercel',
]

export function ProvaSocialSection() {
  return (
    <section className="px-6 py-32 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <FadeInScroll>
          <p className="mb-12 text-center text-sm font-medium uppercase tracking-widest text-[var(--color-fg-subtle)]">
            Stack & Parceiros
          </p>
        </FadeInScroll>

        {/* Ticker logos */}
        <div className="mb-24 overflow-hidden">
          <div className="flex animate-[marquee_40s_linear_infinite] gap-16 whitespace-nowrap">
            {[...LOGO_PLACEHOLDERS, ...LOGO_PLACEHOLDERS].map((l, i) => (
              <div
                key={i}
                className="flex h-12 items-center rounded-lg border border-[var(--color-border)] bg-white/[0.03] px-6 text-base font-medium text-[var(--color-fg-muted)]"
              >
                {l}
              </div>
            ))}
          </div>
        </div>

        {/* Testemunho */}
        <FadeInScroll>
          <blockquote className="mx-auto max-w-3xl rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white/[0.03] p-12 text-center">
            <p className="mb-8 text-xl leading-snug text-[var(--color-fg)] md:text-2xl">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            </p>
            <footer className="flex items-center justify-center gap-4">
              <div className="h-12 w-12 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)]" />
              <div className="text-left">
                <p className="font-medium text-[var(--color-fg)]">Lorem Ipsum</p>
                <p className="text-sm text-[var(--color-fg-subtle)]">Dolor Sit · Amet Inc.</p>
              </div>
            </footer>
          </blockquote>
        </FadeInScroll>
      </div>
    </section>
  )
}
