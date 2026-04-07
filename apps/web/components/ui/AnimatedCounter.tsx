'use client'

/**
 * AnimatedCounter — número que conta de 0 → target quando entra no viewport.
 * Usado pela MetricsSection (signature #3 com pin).
 */

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap-init'

interface AnimatedCounterProps {
  to: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
}

export function AnimatedCounter({
  to,
  duration = 2,
  suffix = '',
  prefix = '',
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const obj = { value: 0 }
      gsap.to(obj, {
        value: to,
        duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        onUpdate: () => {
          if (ref.current) ref.current.textContent = `${prefix}${Math.round(obj.value)}${suffix}`
        },
      })
    },
    { scope: ref }
  )

  return <span ref={ref} className={className}>{prefix}0{suffix}</span>
}
