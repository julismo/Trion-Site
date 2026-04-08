'use client'

/**
 * HeroTransition — réplica EXACTA do efeito grupowebhub.com.br
 *
 * Estrutura HTML:
 *   .hero-transition-curtains (absolute inset-0 z-20, flex row, OPACITY 0 default)
 *     ├ 11 cortinas verticais (height: 0% inicial via CSS)
 *   .textoTransicao (absolute z-25, OPACITY 0 default)
 *     └ p.textoAnimado2 (chars y:100% mask depois do split)
 *
 * Bug fixes (audit B1 + B5):
 *   B1: estado oculto por defeito via inline style — não há flash window
 *   B1: fallback explícito reduced-motion (deixa hidden, não tenta animar)
 *   B5: ScrollTrigger guardado em ref, kill no cleanup (selector match estava broken)
 */

import { useRef } from 'react'
import { gsap, useGSAP, SplitText, ScrollTrigger } from '@/lib/gsap-init'

const NUM_CURTAINS = 11

interface HeroTransitionProps {
  text?: string
  triggerSelector?: string
}

export function HeroTransition({
  text = 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna.',
  triggerSelector = 'section.hero-trigger',
}: HeroTransitionProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!ref.current) return

      const transition = ref.current.querySelector<HTMLDivElement>('.hero-transition-curtains')
      const textoTransicaoWrapper = ref.current.querySelector<HTMLElement>('.hero-texto-transicao')
      const textoAnimado2 = ref.current.querySelector<HTMLElement>('.textoAnimado2')
      // CRÍTICO: resolver o trigger como DOM node real (não selector string).
      // O scope do useGSAP limita seletores ao próprio ref — passar string
      // 'section.hero-trigger' falha porque a section é PAI do scope.
      const triggerEl = ref.current.closest<HTMLElement>(triggerSelector)
      if (!transition || !textoAnimado2 || !textoTransicaoWrapper || !triggerEl) return

      // Reduced-motion fallback: deixa tudo hidden, não anima.
      // (User prefere ver site sem o efeito do que ver bug visual)
      if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(transition, { opacity: 0 })
        gsap.set(textoTransicaoWrapper, { opacity: 0 })
        return
      }

      // Estado from EXPLÍCITO antes de qualquer animação — evita flash de elementos visíveis
      gsap.set(transition, { opacity: 1 })
      gsap.set([...transition.children], { height: '0%' })
      gsap.set(textoTransicaoWrapper, { opacity: 1 })

      // SplitText chars com mask: lines (esconde overflow vertical)
      const split2 = new SplitText(textoAnimado2, {
        type: 'lines, words, chars',
        mask: 'lines',
      })

      // Estado from explícito nos chars (y 100%, opacity 0) ANTES do timeline
      gsap.set(split2.chars, { y: '100%', opacity: 0 })

      // Replica EXACTA das linhas 353-382 do grupowebhub script.js
      // GUARDAR ScrollTrigger ref para cleanup correcto (B5 fix)
      const tlTransitionHero = gsap.timeline({
        scrollTrigger: {
          trigger: triggerEl,
          scrub: 1,
          pin: triggerEl,
          pinSpacing: true,
          start: 'top top',
          end: '+=2000',
          invalidateOnRefresh: true,
        },
      })

      tlTransitionHero.to([...transition.children], {
        height: '100%',
        duration: 1,
        stagger: 0.08,
      })

      tlTransitionHero.to(
        split2.chars,
        {
          y: '0%',
          opacity: 1,
          duration: 0.3,
          stagger: 0.03,
        },
        '-=.5',
      )

      // B5 fix: kill o ScrollTrigger criado por este timeline directamente.
      // O scrollTrigger é exposto via tlTransitionHero.scrollTrigger.
      return () => {
        split2.revert()
        tlTransitionHero.scrollTrigger?.kill()
        tlTransitionHero.kill()
      }
    },
    { scope: ref, dependencies: [triggerSelector, text] },
  )

  return (
    <div ref={ref} aria-hidden="true">
      {/* Cortinas — z-20 ACIMA do conteúdo z-10. Estado from: opacity 0, h 0% (escondido inicial) */}
      <div
        className="hero-transition-curtains pointer-events-none absolute inset-0 z-[20] hidden flex-row lg:flex"
        style={{ opacity: 0 }}
      >
        {Array.from({ length: NUM_CURTAINS }).map((_, i) => (
          <div key={i} className="flex-1 bg-[var(--color-bg)]" style={{ height: '0%' }} />
        ))}
      </div>

      {/* Texto reveal — z-25, OPACITY 0 default */}
      <div
        className="hero-texto-transicao pointer-events-none absolute inset-0 z-[25] hidden items-center justify-center lg:flex"
        style={{ opacity: 0, padding: '3.6rem' }}
      >
        <p
          className="textoAnimado2 w-full font-normal"
          style={{
            fontFamily: 'var(--font-inter), Inter, sans-serif',
            fontSize: 'clamp(2.25rem, 3.75vw, 4.5rem)',
            fontWeight: 400,
            lineHeight: 'normal',
            textAlign: 'start',
            color: 'rgba(255, 255, 255, 0.75)',
            hyphens: 'manual',
          }}
        >
          {text}
        </p>
      </div>
    </div>
  )
}
