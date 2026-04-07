/**
 * Página inicial — composição estática das 9 secções.
 * Server Component (sem 'use client') — só importa secções (que são Client).
 */

import { HeroSection } from '@/components/sections/HeroSection'
import { ParaQuemSection } from '@/components/sections/ParaQuemSection'
import { SolucoesSection } from '@/components/sections/SolucoesSection'
import { MetodologiaSection } from '@/components/sections/MetodologiaSection'
import { MetricsSection } from '@/components/sections/MetricsSection'
import { CasosSection } from '@/components/sections/CasosSection'
import { DiferencialSection } from '@/components/sections/DiferencialSection'
import { ProvaSocialSection } from '@/components/sections/ProvaSocialSection'
import { SegurancaSection } from '@/components/sections/SegurancaSection'
import { CtaSection } from '@/components/sections/CtaSection'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ParaQuemSection />
      <SolucoesSection />
      <MetodologiaSection />
      <MetricsSection />
      <CasosSection />
      <DiferencialSection />
      <ProvaSocialSection />
      <SegurancaSection />
      <CtaSection />
    </main>
  )
}
