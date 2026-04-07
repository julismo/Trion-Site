'use client'

/**
 * FadeInScroll — wrapper reusável para fade-in subtil ao scroll.
 * Aplicar a 90% das secções para ter base contida (regra do plano).
 *
 * Usa ScrollTrigger via GSAP. Cleanup automático via useGSAP.
 */

import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap-init'
import { cn } from '@/lib/utils'

interface FadeInScrollProps {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
}

export function FadeInScroll({
  children,
  className,
  delay = 0,
  y = 32,
}: FadeInScrollProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.from(ref.current, {
        opacity: 0,
        y,
        duration: 0.9,
        ease: 'power3.out',
        delay,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })
    },
    { scope: ref }
  )

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  )
}
