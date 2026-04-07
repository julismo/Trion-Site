import type { Metadata } from 'next'
import { Inter, Atkinson_Hyperlegible } from 'next/font/google'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import { Navbar } from '@/components/layout/Navbar'
import { Loader } from '@/components/layout/Loader'
import { Footer } from '@/components/layout/Footer'
import { ChatbotFAB } from '@/components/ui/ChatbotFAB'
import { AccessibilityFAB } from '@/components/ui/AccessibilityFAB'
import './globals.css'

/**
 * Inter — body / UI font (Google Fonts via next/font, optimized).
 * Clash Display vem via @import em globals.css (Fontshare CDN).
 * Pairing: Clash Display headlines + Inter body — exacto que grupowebhub.com.br usa.
 */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

/**
 * Atkinson Hyperlegible — font para baixa visão (Braille Institute).
 * B10: display 'optional' (não bloqueia render, só mostra se carregar
 * em <100ms). Só é activada quando user liga "Font legível" no A11y panel.
 */
const atkinson = Atkinson_Hyperlegible({
  subsets: ['latin'],
  variable: '--font-readable',
  display: 'optional',
  weight: ['400', '700'],
  preload: false,
})

export const metadata: Metadata = {
  title: 'Trion Scale — Inteligência Aplicada ao Negócio',
  description:
    'Agentes IA, automações e software custom para empresas que querem escalar com tecnologia.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-PT" className={`${inter.variable} ${atkinson.variable}`} style={{ background: '#0a0a0c' }}>
      {/* B10: bg dark inline em <html> e <body> evita white flash no first paint
          (acontece ANTES do CSS carregar — crítico para reload feel) */}
      <body style={{ background: '#0a0a0c' }}>
        {/* Loader e Navbar FORA do smooth-wrapper (gotcha #4 GSAP+Next 16) */}
        <Loader />
        <Navbar />
        <SmoothScrollProvider>
          {children}
          <Footer />
        </SmoothScrollProvider>
        {/* FABs Inova-style: AccessibilityFAB bottom-left + ChatbotFAB bottom-right */}
        <AccessibilityFAB />
        <ChatbotFAB />
      </body>
    </html>
  )
}
