'use client'

/**
 * AccessibilityFAB — botão circular bottom-left (estilo Inova).
 * Abre AccessibilityPanel (drawer slide-in left) ao clicar.
 *
 * - 36×36 círculo branco com PersonStanding icon
 * - Aparece SÓ após scroll > 2400 (depois do HeroTransition terminar)
 * - Hidden mobile <sm
 */

import { useEffect, useState } from 'react'
import { PersonStanding } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AccessibilityPanel } from './AccessibilityPanel'

export function AccessibilityFAB() {
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 2400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <button
        type="button"
        aria-label="Opções de acessibilidade"
        onClick={() => setOpen(true)}
        className={cn(
          'fixed bottom-6 left-6 z-40 hidden h-9 w-9 items-center justify-center rounded-full bg-white text-black shadow-[0_4px_16px_rgba(0,0,0,0.3)] transition-all duration-500 ease-[var(--ease-out-soft)] hover:scale-110 hover:shadow-[0_6px_20px_rgba(255,255,255,0.2)] sm:flex',
          visible
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-12 opacity-0',
        )}
      >
        <PersonStanding size={18} strokeWidth={2.2} />
      </button>

      <AccessibilityPanel open={open} onClose={() => setOpen(false)} />
    </>
  )
}
