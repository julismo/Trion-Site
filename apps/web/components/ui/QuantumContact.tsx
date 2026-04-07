'use client'

/**
 * QuantumContact — FAB minimalista 48×48 estilo Inova.
 * Círculo preto com triângulo quântico branco a girar.
 * Tudo preto e branco, monocromático.
 *
 * - 48×48 (Inova é 40×40, +8 para cabermos o triângulo confortável)
 * - bg preto + border branca subtil (white/15)
 * - Triângulo SVG branco — outer rotation 12s, inner counter-rotation 8s
 * - aria-label + title para tooltip nativo no hover
 * - Aparece SÓ após scroll > 2400 (depois das cortinas + reveal de letras)
 * - Hidden mobile (<sm)
 */

import { useEffect, useRef, useState } from 'react'
import { gsap, useGSAP } from '@/lib/gsap-init'
import { cn } from '@/lib/utils'

export function QuantumContact() {
  const ref = useRef<HTMLAnchorElement>(null)
  const triangleRef = useRef<SVGSVGElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Aparece SÓ após o efeito de transição (cortinas + letras) terminar.
    // Hero 880 + pin 2000 = ~2400px de scroll para o reveal estar completo.
    const onScroll = () => setVisible(window.scrollY > 2400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useGSAP(
    () => {
      if (!triangleRef.current) return
      if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const outer = triangleRef.current.querySelector('.q-outer')
      const inner = triangleRef.current.querySelector('.q-inner')
      if (outer)
        gsap.to(outer, {
          rotation: 360,
          duration: 12,
          repeat: -1,
          ease: 'none',
          transformOrigin: 'center center',
        })
      if (inner)
        gsap.to(inner, {
          rotation: -360,
          duration: 8,
          repeat: -1,
          ease: 'none',
          transformOrigin: 'center center',
        })
    },
    { scope: ref },
  )

  return (
    <a
      ref={ref}
      href="#cta"
      aria-label="Entrar em contato"
      title="Entrar em contato"
      className={cn(
        'fixed bottom-6 right-6 z-40 hidden h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/90 shadow-[0_4px_16px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all duration-500 ease-[var(--ease-out-soft)] hover:scale-110 hover:border-white/30 hover:bg-black sm:flex',
        visible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-12 opacity-0',
      )}
    >
      <svg
        ref={triangleRef}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="shrink-0"
      >
        {/* Outer rotating triangle + dashed ring */}
        <g className="q-outer">
          <circle
            cx="12"
            cy="12"
            r="10.5"
            fill="none"
            stroke="white"
            strokeOpacity="0.25"
            strokeWidth="0.6"
            strokeDasharray="1.5 3"
          />
          <path
            d="M12 4 L19.5 17 L4.5 17 Z"
            fill="none"
            stroke="white"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </g>
        {/* Inner counter-rotating triangle */}
        <g className="q-inner">
          <path
            d="M12 9 L16 16 L8 16 Z"
            fill="white"
            fillOpacity="0.15"
            stroke="white"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </a>
  )
}
