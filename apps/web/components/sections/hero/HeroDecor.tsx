'use client'

/**
 * HeroDecor — 3 blobs absolutos com parallax via ScrollTrigger.
 * Decoração ambiente que dá vida ao hero quando o user faz scroll.
 *
 * - blur-3xl para efeito halo
 * - prefers-reduced-motion: blobs estáticos (sem parallax)
 * - hidden em mobile (<lg) — só lg+
 */

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap-init'

export function HeroDecor() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // Respect prefers-reduced-motion
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      if (!ref.current) return

      const blobs = ref.current.querySelectorAll<HTMLElement>('.hero-decor-blob')
      blobs.forEach((blob, i) => {
        const speed = 30 + i * 25 // 30, 55, 80
        gsap.to(blob, {
          yPercent: -speed,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        })
      })
    },
    { scope: ref },
  )

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[1] hidden overflow-hidden lg:block"
    >
      {/* Blob 1 — top-left, accent orange */}
      <div
        className="hero-decor-blob absolute -left-20 top-10 h-[420px] w-[420px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--color-accent-glow), transparent 70%)' }}
      />
      {/* Blob 2 — center-right, accent orange mais subtil */}
      <div
        className="hero-decor-blob absolute right-[-100px] top-1/3 h-[520px] w-[520px] rounded-full blur-3xl opacity-70"
        style={{ background: 'radial-gradient(circle, var(--color-accent-glow), transparent 65%)' }}
      />
      {/* Blob 3 — bottom-center, dark cool fade */}
      <div
        className="hero-decor-blob absolute -bottom-40 left-1/4 h-[460px] w-[460px] rounded-full blur-3xl opacity-50"
        style={{
          background: 'radial-gradient(circle, oklch(0.4 0.05 280 / 0.4), transparent 70%)',
        }}
      />
    </div>
  )
}
