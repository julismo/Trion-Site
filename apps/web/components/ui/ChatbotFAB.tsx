'use client'

/**
 * ChatbotFAB — pattern Inova, single-pill expansível:
 *   1. Após scroll > 2400 — aparece como círculo 48×48 só com o icon
 *   2. Após 2.5s — expande para pill 240px revelando o texto rotativo
 *   3. Mensagens rodam cada 10s com crossfade (range pedido: 8-15s)
 *   4. Click em qualquer parte do pill abre o ChatbotPanel
 *
 * Width fixa quando expandido (240px) — diferentes mensagens NÃO causam
 * layout shift, só o texto pisca em crossfade.
 *
 * Hidden mobile <sm. Respeita prefers-reduced-motion (sem rotação).
 */

import { useEffect, useRef, useState } from 'react'
import { gsap, useGSAP } from '@/lib/gsap-init'
import { cn } from '@/lib/utils'
import { ChatbotPanel } from './ChatbotPanel'

/**
 * Mensagens — escolhidas com pesquisa Drift/Intercom 2025:
 *  - Perspectiva do VISITANTE (o que ele está a pensar), não da empresa
 *  - Antecipam objeções/dúvidas ("quanto custa?", "por onde começar?")
 *  - 20-22 caracteres cada para uniformidade visual no pill
 *  - Português europeu directo, sem emojis, sem "olá!"
 */
const MESSAGES = [
  'Tens um projeto novo?',     // 21 — qualificação
  'Quanto custa começar?',     // 21 — antecipa objeção #1
  'Marcamos uma reunião?',     // 21 — call to action
  'Vamos pôr em marcha?',      // 20 — urgência
  'Por onde quer começar?',    // 22 — antecipa "como"
]

/**
 * Timing — research-backed:
 *  - EXPAND_DELAY 7s: pedido directo do user (espera após FAB visível)
 *  - ROTATION 8s: industry default (Drift/Intercom/HubSpot/Crisp ~8-10s)
 *    Attention span 2026 = 43s. Tempo leitura 20 chars em PT ~2s + buffer = 8s sweet spot
 *  - FADE 280ms: crossfade rápido para minimizar cognitive load
 */
const EXPAND_DELAY = 7000    // ms — 7s espera depois do FAB ficar visível
const ROTATION_INTERVAL = 8000  // ms — industry default 8s
const FADE_DURATION = 280    // ms — crossfade entre mensagens
const TEXT_WIDTH = 170       // px — cabe a mais longa "Por onde quer começar?" (22ch)

export function ChatbotFAB() {
  const ref = useRef<HTMLButtonElement>(null)
  const triangleRef = useRef<SVGSVGElement>(null)
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [messageIndex, setMessageIndex] = useState(0)
  const [messageShown, setMessageShown] = useState(true)

  // Visibilidade do FAB — após scroll > 2400
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 2400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Pill expande 2.5s após ficar visível. Colapsa se chat abrir.
  useEffect(() => {
    if (!visible || open) {
      setExpanded(false)
      return
    }
    const timer = setTimeout(() => setExpanded(true), EXPAND_DELAY)
    return () => clearTimeout(timer)
  }, [visible, open])

  // Rotação de mensagens — só corre quando o pill está expandido
  useEffect(() => {
    if (!expanded) return
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const interval = setInterval(() => {
      setMessageShown(false)
      setTimeout(() => {
        setMessageIndex((i) => (i + 1) % MESSAGES.length)
        setMessageShown(true)
      }, FADE_DURATION)
    }, ROTATION_INTERVAL)
    return () => clearInterval(interval)
  }, [expanded])

  // Quantum rotation — triângulo SVG roda continuamente
  useGSAP(
    () => {
      if (!triangleRef.current) return
      if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const outer = triangleRef.current.querySelector('.q-outer')
      const inner = triangleRef.current.querySelector('.q-inner')
      if (outer)
        gsap.to(outer, { rotation: 360, duration: 12, repeat: -1, ease: 'none', transformOrigin: 'center center' })
      if (inner)
        gsap.to(inner, { rotation: -360, duration: 8, repeat: -1, ease: 'none', transformOrigin: 'center center' })
    },
    { scope: ref },
  )

  return (
    <>
      {/* Pill ÚNICO — círculo (48px) que expande para pill (48 + 162 = 210px)
          após 7s. Texto à esquerda + icon ancorado à direita. Width explícita
          via inline style — garante que o icon NUNCA é comprimido. */}
      <button
        ref={ref}
        type="button"
        aria-label="Fale connosco"
        onClick={() => setOpen(true)}
        style={{ width: expanded ? `${48 + TEXT_WIDTH}px` : '48px' }}
        className={cn(
          'fixed bottom-6 right-6 z-40 hidden h-12 items-center overflow-hidden rounded-full border border-white/10 bg-[oklch(0.13_0.005_270_/_0.92)] text-white shadow-[0_4px_16px_rgba(0,0,0,0.4)] backdrop-blur-md transition-[width,transform,opacity,box-shadow,border-color] duration-500 ease-[var(--ease-snap)] hover:scale-[1.03] hover:border-white/25 hover:shadow-[0_8px_28px_rgba(0,0,0,0.55)] sm:flex',
          visible
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-12 opacity-0',
        )}
      >
        {/* Container do texto — width explícita 0 ou 162px.
            Crítico: NÃO usar flex-1 nem min-w-0. Width via style garante
            que não há fight com o icon container shrink-0. */}
        <div
          style={{ width: expanded ? `${TEXT_WIDTH}px` : '0px' }}
          className="overflow-hidden whitespace-nowrap text-center transition-[width] duration-500 ease-[var(--ease-snap)]"
        >
          <span
            style={{ transitionDuration: `${FADE_DURATION}ms` }}
            className={cn(
              'inline-block px-4 text-[13px] font-medium transition-opacity',
              expanded && messageShown ? 'opacity-100' : 'opacity-0',
            )}
          >
            {MESSAGES[messageIndex]}
          </span>
        </div>

        {/* Icon — sempre 48×48 ancorado à direita. Sem flex shrink, sem
            interferência do container do texto. */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center">
          <svg
            ref={triangleRef}
            width="22"
            height="22"
            viewBox="0 0 24 24"
            className="block"
          >
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
        </div>
      </button>

      <ChatbotPanel open={open} onClose={() => setOpen(false)} />
    </>
  )
}
