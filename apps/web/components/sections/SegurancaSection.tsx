'use client'

/**
 * SEGURANÇA — badges GDPR / SSL / processo seguro.
 * Curto, tranquiliza decisores B2B.
 */

import { ShieldCheck, Lock, FileCheck } from 'lucide-react'
import { FadeInScroll } from '@/components/animations/FadeInScroll'

const BADGES = [
  { icon: ShieldCheck, title: 'GDPR' },
  { icon: Lock, title: 'SSL & TLS' },
  { icon: FileCheck, title: 'NDA Padrão' },
]

export function SegurancaSection() {
  return (
    <section className="px-6 py-24 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <FadeInScroll>
          <div className="grid grid-cols-1 gap-6 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-white/[0.02] p-10 md:grid-cols-3">
            {BADGES.map((b) => {
              const Icon = b.icon
              return (
                <div key={b.title} className="flex items-center gap-4">
                  <Icon size={28} className="text-[var(--color-accent)]" />
                  <div>
                    <p className="font-semibold text-[var(--color-fg)]">{b.title}</p>
                    <p className="text-xs text-[var(--color-fg-subtle)]">Lorem ipsum dolor sit amet</p>
                  </div>
                </div>
              )
            })}
          </div>
        </FadeInScroll>
      </div>
    </section>
  )
}
