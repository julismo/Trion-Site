'use client'

/**
 * SOLUÇÕES — 3 soluções alternadas (texto/visual ↔ visual/texto).
 * Layout assimétrico (regra Gu).
 */

import { Bot, Workflow, Code2 } from 'lucide-react'
import { FadeInScroll } from '@/components/animations/FadeInScroll'

const SOLUCOES = [
  { num: '01', icon: Bot, badge: 'Agentes IA', title: 'Lorem ipsum dolor sit amet', tags: ['LLM', 'RAG', 'Tool use'] },
  { num: '02', icon: Workflow, badge: 'Automações', title: 'Lorem ipsum dolor sit amet', tags: ['n8n', 'Webhooks', 'Cron'] },
  { num: '03', icon: Code2, badge: 'Software', title: 'Lorem ipsum dolor sit amet', tags: ['Next.js', 'API', 'Dashboard'] },
]

export function SolucoesSection() {
  return (
    <section id="solucoes" className="px-6 py-32 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <FadeInScroll>
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[var(--color-accent)]">
            Soluções
          </p>
          <h2 className="mb-20 max-w-3xl text-[clamp(1.75rem,3vw,2.75rem)] font-semibold leading-[1.05]">
            Lorem ipsum dolor sit amet consectetur adipiscing elit
          </h2>
        </FadeInScroll>

        <div className="space-y-24">
          {SOLUCOES.map((sol, i) => {
            const Icon = sol.icon
            const reversed = i % 2 === 1
            return (
              <FadeInScroll key={sol.num}>
                <div
                  className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16 ${
                    reversed ? 'lg:[&>*:first-child]:order-2' : ''
                  }`}
                >
                  {/* Texto */}
                  <div className="lg:col-span-6">
                    <span className="mb-4 block font-mono text-sm text-[var(--color-fg-subtle)]">
                      {sol.num}
                    </span>
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] px-3 py-1 text-xs">
                      <Icon size={14} className="text-[var(--color-accent)]" />
                      {sol.badge}
                    </div>
                    <h3 className="mb-4 text-2xl font-semibold leading-tight text-[var(--color-fg)] md:text-3xl">
                      {sol.title}
                    </h3>
                    <p className="mb-6 text-[var(--color-fg-muted)]">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.
                    </p>
                    <div className="mb-6 flex flex-wrap gap-2">
                      {sol.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-[var(--color-border)] bg-white/[0.03] px-3 py-1 text-xs text-[var(--color-fg-muted)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-[var(--color-fg)]">
                      ✓ Lorem ipsum dolor sit amet, consectetur
                    </p>
                  </div>

                  {/* Visual */}
                  <div className="lg:col-span-6">
                    <div className="relative aspect-[4/3] rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white/[0.03]">
                      <div className="absolute left-4 top-4 flex gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
                        <span className="h-2 w-2 rounded-full bg-[var(--color-fg-subtle)]" />
                        <span className="h-2 w-2 rounded-full bg-[var(--color-fg-subtle)]" />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center text-sm text-[var(--color-fg-subtle)]">
                        [VISUAL MOCK {sol.num}]
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInScroll>
            )
          })}
        </div>
      </div>
    </section>
  )
}
