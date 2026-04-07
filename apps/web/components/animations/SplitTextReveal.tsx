'use client'

/**
 * SplitTextReveal — signature #2 do plano: headline letra-a-letra.
 *
 * GOTCHA crítico (plano mestre): SEMPRE chamar split.revert() no cleanup.
 * Sem isto, navegação client-side deixa o texto partido para sempre.
 */

import { useRef } from 'react'
import { gsap, SplitText, useGSAP } from '@/lib/gsap-init'
import { cn } from '@/lib/utils'

interface SplitTextRevealProps {
  children: React.ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'p'
  className?: string
  type?: 'chars' | 'words' | 'lines'
  stagger?: number
  delay?: number
  /**
   * Animation effect:
   * - 'slide' (default): per-element y:40 power4.out, 0.8s — premium signature
   * - 'blur': per-char filter blur(20px) + random stagger — grupowebhub style
   */
  effect?: 'slide' | 'blur'
}

export function SplitTextReveal({
  children,
  as: Tag = 'h1',
  className,
  type = 'chars',
  stagger = 0.025,
  delay = 0.2,
  effect = 'slide',
}: SplitTextRevealProps) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!ref.current) return
      // Respect prefers-reduced-motion — sem split, sem animation
      if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      // Blur effect: usa "lines, words, chars" igual ao grupowebhub
      // — words ficam inline-block, chars dentro nunca quebram a meio.
      const split =
        effect === 'blur'
          ? SplitText.create(ref.current, { type: 'lines, words, chars' })
          : SplitText.create(ref.current, { type })
      const targets =
        effect === 'blur'
          ? split.chars
          : type === 'chars'
            ? split.chars
            : type === 'words'
              ? split.words
              : split.lines

      if (effect === 'blur') {
        // grupowebhub.com.br exact pattern: filter blur 20px + random stagger
        gsap.from(targets, {
          filter: 'blur(20px)',
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: {
            each: 0.02,
            from: 'random',
          },
          delay,
        })
      } else {
        // Default slide effect
        gsap.from(targets, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: 'power4.out',
          stagger,
          delay,
        })
      }

      return () => {
        split.revert() // CRÍTICO — restaurar markup original
      }
    },
    { scope: ref, dependencies: [effect] }
  )

  return (
    <Tag ref={ref as never} className={cn(className)}>
      {children}
    </Tag>
  )
}
