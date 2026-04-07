'use client'

/**
 * PinnedSection — wrapper para signature #3 (Métricas com pin).
 * O conteúdo "agarra" no centro do viewport enquanto o utilizador faz scroll
 * num percentual da altura do ecrã, e só depois liberta.
 */

import { useEffect, useRef, useState } from 'react'
import { ScrollTrigger, useGSAP } from '@/lib/gsap-init'
import { cn } from '@/lib/utils'

interface PinnedSectionProps {
  children: React.ReactNode
  className?: string
  /** Quantos viewports a secção fica presa (default 1 = 100vh de scroll) */
  duration?: number
}

export function PinnedSection({
  children,
  className,
  duration = 1,
}: PinnedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [validate, setValidate] = useState(false)

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has('validate')) setValidate(true)
  }, [])

  useGSAP(
    () => {
      if (validate) return // bypass para Playwright screenshots
      const trigger = ScrollTrigger.create({
        trigger: ref.current,
        start: 'top top',
        end: `+=${duration * 100}%`,
        pin: true,
        pinSpacing: true,
      })
      // useGSAP auto-tracka tweens GSAP, mas ScrollTrigger.create
      // não é auto-cleaned — precisamos matar manualmente.
      return () => trigger.kill()
    },
    { scope: ref, dependencies: [validate] }
  )

  return (
    <section ref={ref} className={cn('relative', className)}>
      {children}
    </section>
  )
}
