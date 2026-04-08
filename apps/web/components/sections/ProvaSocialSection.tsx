'use client'

/**
 * PROVA SOCIAL — bloco original do snapshot 9e04e37 (intocado),
 * agora com array de 3 testemunhos + pagination dots estilo Apple.
 */

import { useEffect, useState } from 'react'
import { FadeInScroll } from '@/components/animations/FadeInScroll'
import { SplitTextReveal } from '@/components/animations/SplitTextReveal'

const TESTEMUNHOS = [
  {
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    nome: 'Lorem Ipsum',
    cargo: 'Dolor Sit · Amet Inc.',
  },
  {
    quote:
      'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam.',
    nome: 'Dolor Sit',
    cargo: 'Amet · Consectetur Co.',
  },
  {
    quote:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute.',
    nome: 'Amet Inc',
    cargo: 'Sit · Lorem Lab.',
  },
]

const AUTO_ROTATE_MS = 6000

export function ProvaSocialSection() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % TESTEMUNHOS.length)
    }, AUTO_ROTATE_MS)
    return () => clearInterval(interval)
  }, [])

  const t = TESTEMUNHOS[active]

  return (
    <section id="prova-social" className="px-6 py-32 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="mb-16 text-center">
          <FadeInScroll>
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[var(--color-accent)]">
              Lorem
            </p>
          </FadeInScroll>
          <SplitTextReveal
            as="h2"
            effect="blur"
            onScroll
            className="text-[clamp(1.75rem,3vw,2.75rem)] font-semibold leading-[1.05]"
          >
            Lorem ipsum dolor sit amet.
          </SplitTextReveal>
        </div>

        {/* Bloco original — intocado, só com conteúdo dinâmico */}
        <FadeInScroll>
          <blockquote
            key={active}
            className="mx-auto max-w-3xl animate-[fadeIn_0.5s_ease-out] rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white/[0.03] p-12 text-center"
          >
            <p className="mb-8 text-xl leading-snug text-[var(--color-fg)] md:text-2xl">
              "{t.quote}"
            </p>
            <footer className="flex items-center justify-center gap-4">
              <div className="h-12 w-12 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)]" />
              <div className="text-left">
                <p className="font-medium text-[var(--color-fg)]">{t.nome}</p>
                <p className="text-sm text-[var(--color-fg-subtle)]">{t.cargo}</p>
              </div>
            </footer>
          </blockquote>
        </FadeInScroll>

        {/* Pagination dots — estilo Apple */}
        <div className="mt-8 flex items-center justify-center gap-3">
          {TESTEMUNHOS.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Ver testemunho ${i + 1}`}
              aria-current={i === active}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active
                  ? 'w-8 bg-[var(--color-accent)]'
                  : 'w-2 bg-white/25 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
