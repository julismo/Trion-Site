'use client'

/**
 * HERO ⭐ — Layout CENTRADO inspirado em grupowebhub.com.br
 *   - Hero ~880px imersivo, próximo de full screen
 *   - Texto totalmente centrado (eyebrow + headline + subtitle + botões + ticker)
 *   - Headline com effect="blur" (filter blur 20px + random stagger 0.02s)
 *   - HeroBackground sintético em 4 camadas (gradient + glow + grid + noise)
 *   - HeroDecor blobs com parallax GSAP no scroll
 *   - Marquee parceiros & stack
 *
 * 🚫 REGRA DEFINITIVA: NUNCA adicionar ChevronDown / scroll arrow indicator.
 * User removeu múltiplas vezes ao longo de várias sessões (2026-04-06 e 07).
 * Tentei re-adicionar e o user pediu para remover OUTRA VEZ. Não voltar a tentar.
 *
 * .hero-entry-content recebe scale-in subtle quando html.loaded classe é
 * adicionada pelo Loader (B10 — entrada suave coordenada com curtain split).
 */

import { SplitTextReveal } from '@/components/animations/SplitTextReveal'
import { FadeInScroll } from '@/components/animations/FadeInScroll'
import { GradientButton } from '@/components/ui/GradientButton'
import { HeroBackground } from '@/components/sections/hero/HeroBackground'
import { HeroDecor } from '@/components/sections/hero/HeroDecor'
import { HeroTransition } from '@/components/sections/hero/HeroTransition'
import { HeroPartnersMarquee } from '@/components/sections/hero/HeroPartnersMarquee'

export function HeroSection() {
  return (
    <section className="hero-trigger relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-24 lg:px-12">
      <HeroBackground />
      <HeroDecor />

      <div className="hero-entry-content relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        {/* Headline com effect blur — replicação exacta grupowebhub */}
        <SplitTextReveal
          as="h1"
          effect="blur"
          delay={0.1}
          className="mb-6 max-w-4xl text-balance text-[clamp(2rem,4.5vw,4rem)] font-semibold leading-[1.1]"
        >
          Lorem ipsum dolor sit amet consectetur adipiscing elit
        </SplitTextReveal>

        <FadeInScroll delay={0.4}>
          <p className="mb-10 max-w-2xl text-base text-[var(--color-fg-muted)] md:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
          </p>
        </FadeInScroll>

        <FadeInScroll delay={0.6}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <GradientButton variant="pillWhite" size="pill">
              Agendar Diagnóstico
            </GradientButton>
            <GradientButton variant="pillDark" size="pill">
              Ver Soluções
            </GradientButton>
          </div>
        </FadeInScroll>

        {/* Marquee parceiros & stack — substitui o ticker métricas */}
        <FadeInScroll delay={0.8}>
          <div className="mt-14 w-screen max-w-[100vw]">
            <HeroPartnersMarquee />
          </div>
        </FadeInScroll>
      </div>

      {/* Cortinas verticais + texto reveal — efeito grupowebhub.com.br */}
      <HeroTransition text="Cada operação é única. Cada agente é desenhado à medida do teu negócio, não copy-paste de templates." />
    </section>
  )
}
