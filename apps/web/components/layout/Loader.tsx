'use client'

/**
 * Loader v4 — fixes scroll restoration bug + triângulo subtil ao lado do counter.
 *
 * Bug fixes (refresh em meio de scroll):
 *   1. history.scrollRestoration = 'manual' (impede browser de restaurar scroll)
 *   2. window.scrollTo(0, 0) on mount (força topo)
 *   3. body.overflow = 'hidden' enquanto loader visível (bloqueia scroll)
 *   4. ScrollTrigger.refresh() no onComplete (re-cálculo das posições pinned)
 *
 * Pattern (mantido):
 *   - 1s tela preta (assets carregam silenciosos)
 *   - "TRION SCALE" big text com SplitText blur(20px)+random (mesmo do hero)
 *   - Counter 0→100% pequeno abaixo
 *   - Triângulo SVG rotativo (stroke-draw + rotation infinita) AO LADO do counter
 *   - Curtain split (top up + bottom down) revela página
 */

import { useEffect, useRef, useState } from 'react'
import { gsap, useGSAP, SplitText, ScrollTrigger } from '@/lib/gsap-init'

export function Loader() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const brandRef = useRef<HTMLDivElement>(null)
  const triangleRef = useRef<SVGSVGElement>(null)
  const triangleStrokeRef = useRef<SVGPathElement>(null)
  const curtainTopRef = useRef<HTMLDivElement>(null)
  const curtainBottomRef = useRef<HTMLDivElement>(null)
  const [shouldRender, setShouldRender] = useState<boolean | null>(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // 1. Disable browser scroll restoration (impede scroll position bug)
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    // 2. Força topo IMEDIATAMENTE
    window.scrollTo(0, 0)

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      // B10: skip loader → adiciona classe "loaded" imediatamente para o hero
      // se revelar sem precisar de esperar pelo timeline GSAP
      document.documentElement.classList.add('loaded')
      setShouldRender(false)
    } else {
      setShouldRender(true)
    }
  }, [])

  // B13 fix: useEffect body lock REMOVIDO — causava race condition em React 19
  // strict mode dev (cleanup capturava 'hidden' como original e nunca libertava).
  // O lock + unlock agora é feito directamente dentro do useGSAP callback abaixo,
  // evitando React lifecycle race conditions. O overlay z-100 do loader já cobre
  // o ecrã visualmente, portanto o lock body é apenas defensivo (não interactivo).

  useGSAP(
    () => {
      if (shouldRender !== true) return
      if (!overlayRef.current || !brandRef.current) return

      // B13: Lock body scroll IMEDIATAMENTE quando o timeline começa.
      // Não depende de React lifecycle — evita race condition do useEffect.
      document.body.style.overflow = 'hidden'

      // SplitText em "TRION SCALE"
      const split = SplitText.create(brandRef.current, { type: 'chars, words' })

      // B8 fix: timeline guardado em local var, killed automaticamente
      // pelo useGSAP scope. Cleanup explícito no return previne double-fire.
      const tl = gsap.timeline({
        delay: 0.6, // B10: trim 1s → 0.6s — black wait mais curto sem perder o "respiro"
        onComplete: () => {
          // B13 CRÍTICO: unlock body PRIMEIRO, antes de qualquer outra coisa.
          // Garante que o user pode scrollar imediatamente quando o loader sai.
          document.body.style.overflow = ''
          // Força scroll topo + refresh ScrollTrigger
          window.scrollTo(0, 0)
          ScrollTrigger.refresh()
          split.revert()
          setDone(true)
        },
      })

      // B10: adiciona html.loaded EARLY (durante o curtain split, ~1.7s) para
      // que o hero comece o seu fade-in scale-up suavemente coordenado, em vez
      // de aparecer abruptamente quando o loader desaparece.
      tl.call(() => {
        document.documentElement.classList.add('loaded')
      }, [], 1.7)

      // 1. Brand text reveal blur+random
      tl.from(
        split.chars,
        {
          filter: 'blur(20px)',
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: { each: 0.025, from: 'random' },
        },
        0,
      )

      // 2. Counter + triangle fade in
      tl.from(
        [counterRef.current, '.loader-counter-label', triangleRef.current],
        { opacity: 0, y: 8, duration: 0.5, ease: 'power2.out', stagger: 0.08 },
        0.3,
      )

      // 3. Counter 0→100 (B10: 2s → 1.8s para feel mais snappy)
      const counterObj = { value: 0 }
      tl.to(
        counterObj,
        {
          value: 100,
          duration: 1.8,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = String(Math.round(counterObj.value))
            }
          },
        },
        0,
      )

      // 4. Triângulo: stroke-draw + rotação contínua
      // B4 fix: hardcode strokeDasharray para evitar bug do getTotalLength()
      // returning 0 antes do SVG estar pintado. Triângulo 32×32 com path
      // M16 4 L28 26 L4 26 Z = lados ~25/25/24 = perímetro ~74. Round to 80.
      if (triangleStrokeRef.current) {
        const length = 80
        gsap.set(triangleStrokeRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        })
        tl.to(
          triangleStrokeRef.current,
          { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut' },
          0.3,
        )
      }
      // B13 fix: rotação infinita corre INDEPENDENTE do timeline.
      // Antes estava DENTRO do tl com repeat:-1, fazendo o timeline ter
      // duração infinita → onComplete nunca fired → body nunca unlocked.
      gsap.to(triangleRef.current, {
        rotation: 360,
        duration: 1.8,
        ease: 'none',
        transformOrigin: 'center center',
        repeat: -1,
        delay: 0.9, // 0.6 (timeline delay) + 0.3 (timeline offset) = sync visual
      })

      // 5. Fade out tudo no final (sync 1.8s)
      tl.to(
        [counterRef.current, '.loader-counter-label', triangleRef.current],
        { opacity: 0, y: -6, duration: 0.4, ease: 'power2.in' },
        1.8,
      )
      tl.to(
        brandRef.current,
        { opacity: 0, y: -10, duration: 0.4, ease: 'power2.in' },
        1.85,
      )

      // 6. Curtain split — B10: 1.0s + power3.inOut (mais suave que expo)
      tl.to(
        curtainTopRef.current,
        { y: '-100%', duration: 1.0, ease: 'power3.inOut' },
        2.0,
      )
      tl.to(
        curtainBottomRef.current,
        { y: '100%', duration: 1.0, ease: 'power3.inOut' },
        2.0,
      )

      // 7. Fade out smooth (não snap display:none)
      tl.to(
        overlayRef.current,
        { opacity: 0, duration: 0.35, ease: 'power2.out' },
        2.8,
      )
      tl.set(overlayRef.current, { display: 'none' }, 3.15)

      // B8 + B13 fix: explicit cleanup return — kills timeline + split + unlock
      // body como safety net (se cleanup correr antes do onComplete por strict mode).
      return () => {
        document.body.style.overflow = ''  // safety net
        tl.kill()
        split.revert()
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
      {/* Cortinas */}
      <div
        ref={curtainTopRef}
        className="absolute inset-x-0 top-0 z-[1] h-1/2 bg-[var(--color-bg)]"
      />
      <div
        ref={curtainBottomRef}
        className="absolute inset-x-0 bottom-0 z-[1] h-1/2 bg-[var(--color-bg)]"
      />

      {/* Conteúdo central */}
      <div className="relative z-[2] flex h-full flex-col items-center justify-center gap-8">
        {/* Brand text gigante */}
        <div
          ref={brandRef}
          className="text-center text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-none tracking-[-0.02em] text-white/95"
          style={{ fontFamily: "'Clash Display', 'Inter', sans-serif" }}
        >
          TRION SCALE
        </div>

        {/* Counter row — triângulo + counter + label */}
        <div className="flex items-center gap-4">
          {/* Triângulo SVG — stroke-draw + rotação infinita */}
          <svg
            ref={triangleRef}
            width="28"
            height="28"
            viewBox="0 0 32 32"
            className="shrink-0"
          >
            <path
              ref={triangleStrokeRef}
              d="M16 4 L28 26 L4 26 Z"
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="1.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <circle
              cx="16"
              cy="20"
              r="1.5"
              fill="var(--color-accent)"
              fillOpacity="0.7"
            />
          </svg>

          {/* Counter + label */}
          <div className="flex items-baseline gap-2">
            <span
              ref={counterRef}
              className="inline-block min-w-[44px] text-right text-[20px] font-light leading-none tabular-nums text-white/70"
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
    </div>
  )
}
