'use client'

/**
 * Loader v5 — Opção C: Triângulo cinematic expand → split revela página.
 *
 * Timeline:
 *   0.0s — Triângulo pequeno (stroke-draw 1.2s + rotation 360 contínuo)
 *   1.4s — Counter 0→100% (1.6s, sobreposto)
 *   2.0s — Triângulo para de rodar, escala para cobrir viewport inteiro (clip-path expand)
 *   2.6s — Curtain split top/bottom revela página
 *   3.2s — Overlay fade-out + done
 *
 * Scroll fixes (mantidos de v4):
 *   - history.scrollRestoration = 'manual'
 *   - window.scrollTo(0, 0) on mount
 *   - body.overflow = 'hidden' dentro do GSAP (não useEffect)
 *   - ScrollTrigger.refresh() no onComplete
 */

import { useEffect, useRef, useState } from 'react'
import { gsap, useGSAP, SplitText, ScrollTrigger } from '@/lib/gsap-init'

export function Loader() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const triangleWrapRef = useRef<HTMLDivElement>(null)
  const triangleSvgRef = useRef<SVGSVGElement>(null)
  const triangleStrokeRef = useRef<SVGPathElement>(null)
  const curtainTopRef = useRef<HTMLDivElement>(null)
  const curtainBottomRef = useRef<HTMLDivElement>(null)
  const [shouldRender, setShouldRender] = useState<boolean | null>(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      document.documentElement.classList.add('loaded')
      setShouldRender(false)
    } else {
      setShouldRender(true)
    }
  }, [])

  useGSAP(
    () => {
      if (shouldRender !== true) return
      if (!overlayRef.current || !triangleWrapRef.current || !triangleSvgRef.current) return

      document.body.style.overflow = 'hidden'

      // Estado inicial: triângulo pequeno no centro, counter escondido
      gsap.set(triangleWrapRef.current, { scale: 1 })
      gsap.set([counterRef.current, '.loader-counter-label'], { opacity: 0, y: 8 })

      // Stroke draw setup — perímetro triângulo 80px
      const strokeLength = 80
      if (triangleStrokeRef.current) {
        gsap.set(triangleStrokeRef.current, {
          strokeDasharray: strokeLength,
          strokeDashoffset: strokeLength,
        })
      }

      // Rotação contínua do triângulo (para separada do tl para não bloquear onComplete)
      const rotationTween = gsap.to(triangleSvgRef.current, {
        rotation: 360,
        duration: 2.0,
        ease: 'none',
        transformOrigin: 'center center',
        repeat: -1,
      })

      // Safety net: se o timeline falhar por qualquer razão, força unlock após 5s
      const safetyTimer = setTimeout(() => {
        document.body.style.overflow = ''
        document.documentElement.classList.add('loaded')
        setDone(true)
      }, 5000)

      const tl = gsap.timeline({
        delay: 0.3,
        onComplete: () => {
          clearTimeout(safetyTimer)
          document.body.style.overflow = ''
          window.scrollTo(0, 0)
          ScrollTrigger.refresh()
          setDone(true)
        },
      })

      // html.loaded EARLY (durante expand) para hero começar a revelar
      tl.call(() => {
        document.documentElement.classList.add('loaded')
      }, [], 1.8)

      // 1. Stroke-draw do triângulo
      if (triangleStrokeRef.current) {
        tl.to(
          triangleStrokeRef.current,
          { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut' },
          0,
        )
      }

      // 2. Counter + label fade-in
      tl.to(
        [counterRef.current, '.loader-counter-label'],
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', stagger: 0.06 },
        0.4,
      )

      // 3. Counter 0→100
      const counterObj = { value: 0 }
      tl.to(
        counterObj,
        {
          value: 100,
          duration: 1.6,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = String(Math.round(counterObj.value))
            }
          },
        },
        0.4,
      )

      // 4. Counter + label fade-out
      tl.to(
        [counterRef.current, '.loader-counter-label'],
        { opacity: 0, y: -6, duration: 0.3, ease: 'power2.in' },
        1.7,
      )

      // 5. Triângulo para de rodar (snap para posição vertical)
      tl.call(() => {
        rotationTween.kill()
        // Snap suave para 0° (ponta para cima)
        gsap.to(triangleSvgRef.current, {
          rotation: Math.round(gsap.getProperty(triangleSvgRef.current, 'rotation') as number / 360) * 360,
          duration: 0.3,
          ease: 'power2.out',
          transformOrigin: 'center center',
        })
      }, [], 2.0)

      // 6. Triângulo EXPANDE para cobrir o viewport inteiro
      // Scale enorme + fill branco/accent cobre tudo
      tl.to(
        triangleWrapRef.current,
        {
          scale: 80,
          duration: 0.7,
          ease: 'power3.in',
          transformOrigin: 'center center',
        },
        2.1,
      )

      // 7. Curtain split — top sobe, bottom desce — revela página por baixo
      tl.to(
        curtainTopRef.current,
        { y: '-100%', duration: 0.9, ease: 'power3.inOut' },
        2.5,
      )
      tl.to(
        curtainBottomRef.current,
        { y: '100%', duration: 0.9, ease: 'power3.inOut' },
        2.5,
      )

      // 8. Fade-out final do overlay
      tl.to(
        overlayRef.current,
        { opacity: 0, duration: 0.3, ease: 'power2.out' },
        3.2,
      )
      tl.set(overlayRef.current, { display: 'none' }, 3.5)

      return () => {
        clearTimeout(safetyTimer)
        document.body.style.overflow = ''
        rotationTween.kill()
        tl.kill()
      }
    },
    { scope: overlayRef, dependencies: [shouldRender] },
  )

  if (shouldRender === null || shouldRender === false || done) return null

  return (
    <div
      ref={overlayRef}
      role="status"
      aria-label="A carregar Trion Scale"
      className="fixed inset-0 z-[100] overflow-hidden bg-[var(--color-bg)]"
    >
      {/* Cortinas de split (ficam por cima do triângulo expandido) */}
      <div
        ref={curtainTopRef}
        className="absolute inset-x-0 top-0 z-[3] h-1/2 bg-[var(--color-bg)]"
      />
      <div
        ref={curtainBottomRef}
        className="absolute inset-x-0 bottom-0 z-[3] h-1/2 bg-[var(--color-bg)]"
      />

      {/* Conteúdo central — triângulo + counter */}
      <div className="relative z-[2] flex h-full flex-col items-center justify-center gap-10">

        {/* Triângulo — wrap para scale, svg para rotation */}
        <div ref={triangleWrapRef} className="flex items-center justify-center">
          <svg
            ref={triangleSvgRef}
            width="72"
            height="72"
            viewBox="0 0 72 72"
            className="shrink-0"
          >
            {/* Fill sólido — fica visível quando expande */}
            <path
              d="M36 8 L64 60 L8 60 Z"
              fill="var(--color-accent)"
              opacity="0.15"
            />
            {/* Stroke animado */}
            <path
              ref={triangleStrokeRef}
              d="M36 8 L64 60 L8 60 Z"
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="1.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Counter */}
        <div className="flex items-baseline gap-2">
          <span
            ref={counterRef}
            className="inline-block min-w-[52px] text-right text-[22px] font-light leading-none tabular-nums text-white/70"
            style={{
              fontFamily: "'Clash Display', 'Inter', sans-serif",
              fontFeatureSettings: '"tnum"',
            }}
          >
            0
          </span>
          <span className="loader-counter-label text-[11px] uppercase tracking-[0.3em] text-white/35">
            % loading
          </span>
        </div>
      </div>
    </div>
  )
}
