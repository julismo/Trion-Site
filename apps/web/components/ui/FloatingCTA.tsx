'use client'

/**
 * FloatingCTA — botão "Agendar" persistente bottom-right.
 * Aparece após scrollar past hero (>600px) com fade+slide-up.
 * Hidden em mobile (<sm) — em mobile há nav próprio.
 */

import { useEffect, useState } from 'react'
import { Calendar, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function FloatingCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href="#cta"
      aria-label="Agendar diagnóstico"
      className={cn(
        'fixed bottom-6 right-6 z-40 hidden items-center gap-3 rounded-full bg-[var(--color-accent)] py-3 pl-5 pr-2 text-sm font-medium text-[var(--color-bg)] shadow-[0_8px_32px_rgba(255,107,44,0.35)] transition-all duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:bg-[var(--color-accent-hover)] sm:inline-flex',
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-12 opacity-0',
      )}
    >
      <Calendar size={16} />
      <span>Agendar Diagnóstico</span>
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-bg)] text-[var(--color-accent)]">
        <ArrowRight size={14} />
      </span>
    </a>
  )
}
