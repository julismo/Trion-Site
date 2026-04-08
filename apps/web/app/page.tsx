/**
 * Página inicial — composição V2 (7 secções, enxuta).
 *
 * Decisão estrutural (TRI-23, 2026-04-07):
 *   REMOVED: ParaQuem (vibe template IA) · Diferencial (duplicava stack do hero) · Segurança (sem badges reais)
 *   KEPT: Hero · Soluções · Metodologia (rebrand) · Métricas · Casos · ProvaSocial (testemunho) · CTA
 *
 * Server Component (sem 'use client') — só importa secções (que são Client).
 */

import { HeroSection } from '@/components/sections/HeroSection'
import { SolucoesSection } from '@/components/sections/SolucoesSection'
import { MetodologiaSection } from '@/components/sections/MetodologiaSection'
import { MetricsSection } from '@/components/sections/MetricsSection'
import { CasosSection } from '@/components/sections/CasosSection'
import { ProvaSocialSection } from '@/components/sections/ProvaSocialSection'
import { CtaSection } from '@/components/sections/CtaSection'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <SolucoesSection />
      <MetodologiaSection />
      <MetricsSection />
      <CasosSection />
      <ProvaSocialSection />
      <CtaSection />
    </main>
  )
}
