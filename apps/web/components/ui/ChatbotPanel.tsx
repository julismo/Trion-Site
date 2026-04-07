'use client'

/**
 * ChatbotPanel — Premium B2B chat tier-1 com GSAP animations.
 *
 * Inspiração:
 *   - Aluline (sizing 390×560 + structure)
 *   - Intercom Messenger (glassmorphism + bubble pattern)
 *   - Vercel v0 (back.out entry timeline)
 *   - Linear support (minimalism + monochrome)
 *
 * Brand:
 *   - Logo: hexágono Trion (mesmo do navbar) — NÃO sparkles AI
 *   - Cores: orange accent + dark glass (no pure black)
 *
 * GSAP timeline (open):
 *   - widget scale 0.85 → 1, opacity 0 → 1, ease back.out(1.4), 0.5s
 *   - header y 10 → 0, delay 0.2s
 *   - messages stagger 0.08, ease back.out(1.4)
 *   - status dot pulse infinite
 *   - typing dots: gsap timeline repeat -1
 *   - send button: scale 0.92 yoyo on click
 */

import { useEffect, useRef, useState } from 'react'
import { X, Send } from 'lucide-react'
import { cn } from '@/lib/utils'
import { gsap, useGSAP } from '@/lib/gsap-init'

interface ChatbotPanelProps {
  open: boolean
  onClose: () => void
}

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const QUICK_REPLIES = [
  'Quero um diagnóstico',
  'Como funciona?',
  'Quanto custa?',
]

// P3 fix: welcomeMsg como constante fora do component (estava recriado a cada render)
const WELCOME_MSG: Message = {
  id: 'welcome',
  role: 'assistant',
  content: 'Olá! Sou da equipa Trion Scale. Como posso ajudar-te hoje?',
}

const FAKE_REPLIES: Record<string, string> = {
  default:
    'Obrigado pela mensagem! Em breve um humano da Trion responde-te. Para resposta imediata, deixa o teu email.',
  diagnóstico:
    'Boa! O nosso diagnóstico é gratuito — auditamos o teu stack em 7 dias e mostramos onde IA e automação cortam custos. Queres marcar uma call?',
  funciona:
    'Trabalhamos em 3 fases: 1) Diagnóstico (1 semana, grátis). 2) Build (2-6 semanas, fixed price). 3) Operação (mensal). Tudo modular.',
  custa:
    'Depende do projecto. Diagnóstico é grátis. Builds começam em €3.5k para automações simples e vão até €50k+ para sistemas custom. Sem fees escondidos.',
  casos:
    'Temos casos de e-commerce (-63% custo operacional), saúde (4× capacidade processada), educação (+38% conversão de leads). Queres ver o estudo completo?',
}

function classifyAndReply(text: string): string {
  const t = text.toLowerCase()
  if (/(diagnós|auditoria|análise)/i.test(t)) return FAKE_REPLIES.diagnóstico
  if (/(funciona|processo|fase|metodologia|como)/i.test(t)) return FAKE_REPLIES.funciona
  if (/(custa|preço|valor|orçamento|quanto)/i.test(t)) return FAKE_REPLIES.custa
  if (/(caso|estudo|cliente|sucesso|exemplo)/i.test(t)) return FAKE_REPLIES.casos
  return FAKE_REPLIES.default
}

/* ============================================================================
   Logo Trion real — TS monogram (offwhite) com mix-blend-mode screen
   para fundo transparente. Brand consistency com Navbar.
   ============================================================================ */
function TrionLogo({ size = 18 }: { size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logos/trion-ts.png"
      alt=""
      width={size * 1.6}
      height={size * 1.6}
      style={{
        mixBlendMode: 'screen',
        objectFit: 'contain',
        objectPosition: 'center 30%',
      }}
    />
  )
}

export function ChatbotPanel({ open, onClose }: ChatbotPanelProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [quickActionsUsed, setQuickActionsUsed] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const widgetRef = useRef<HTMLDivElement>(null)
  const sendBtnRef = useRef<HTMLButtonElement>(null)

  // ESC fecha
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // Welcome message on open
  useEffect(() => {
    if (open && messages.length === 0) setMessages([WELCOME_MSG])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // Focus input
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 400)
  }, [open])

  // GSAP open/close timeline
  useGSAP(
    () => {
      if (!widgetRef.current) return
      if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(widgetRef.current, { opacity: open ? 1 : 0, scale: 1, pointerEvents: open ? 'auto' : 'none' })
        return
      }

      const tl = gsap.timeline()
      if (open) {
        tl.set(widgetRef.current, { pointerEvents: 'auto' })
          .fromTo(
            widgetRef.current,
            { opacity: 0, scale: 0.85, y: 16 },
            { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.4)' },
          )
          .from(
            widgetRef.current.querySelector('.chat-header'),
            { opacity: 0, y: 10, duration: 0.3, ease: 'power2.out' },
            0.2,
          )
          .from(
            widgetRef.current.querySelectorAll('.chat-msg-initial'),
            { opacity: 0, y: 12, scale: 0.95, duration: 0.4, ease: 'back.out(1.3)', stagger: 0.08 },
            0.3,
          )
          .from(
            widgetRef.current.querySelectorAll('.chat-quick-reply'),
            { opacity: 0, y: 8, scale: 0.9, duration: 0.3, ease: 'back.out(1.3)', stagger: 0.06 },
            0.5,
          )
          .from(
            widgetRef.current.querySelector('.chat-input-area'),
            { opacity: 0, y: 8, duration: 0.3, ease: 'power2.out' },
            0.55,
          )
      } else {
        tl.to(widgetRef.current, {
          opacity: 0,
          scale: 0.92,
          y: 12,
          duration: 0.25,
          ease: 'power2.in',
          onComplete: () => {
            if (widgetRef.current) widgetRef.current.style.pointerEvents = 'none'
          },
        })
      }
    },
    { scope: widgetRef, dependencies: [open] },
  )

  // GSAP status dot pulse — continuous infinite
  useGSAP(
    () => {
      if (!widgetRef.current) return
      if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const dot = widgetRef.current.querySelector('.status-dot')
      if (!dot) return
      gsap.to(dot, {
        opacity: 0.4,
        scale: 0.85,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    },
    { scope: widgetRef },
  )

  function sendMessage(text?: string) {
    const content = (text ?? input).trim()
    if (!content || loading) return

    // Send button feedback
    if (sendBtnRef.current) {
      gsap.to(sendBtnRef.current, {
        scale: 0.88,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut',
      })
    }

    setQuickActionsUsed(true)
    const userMsg: Message = { id: `u-${Date.now()}`, role: 'user', content }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    const delay = 700 + Math.min(1500, content.length * 15)
    setTimeout(() => {
      const botMsg: Message = {
        id: `b-${Date.now()}`,
        role: 'assistant',
        content: classifyAndReply(content),
      }
      setMessages((prev) => [...prev, botMsg])
      setLoading(false)
    }, delay)
  }

  // GSAP entry para mensagens novas (após primeira render)
  useGSAP(
    () => {
      if (!widgetRef.current) return
      if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const last = widgetRef.current.querySelector('.chat-msg:last-of-type')
      if (last && messages.length > 1) {
        gsap.fromTo(
          last,
          { opacity: 0, y: 12, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.4)' },
        )
      }
    },
    { scope: widgetRef, dependencies: [messages.length] },
  )

  // GSAP typing dots — staggered bounce
  useGSAP(
    () => {
      if (!widgetRef.current || !loading) return
      if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const dots = widgetRef.current.querySelectorAll('.chat-typing-dot')
      if (!dots.length) return
      gsap.to(dots, {
        y: -6,
        duration: 0.4,
        ease: 'sine.inOut',
        stagger: 0.12,
        repeat: -1,
        yoyo: true,
      })
    },
    { scope: widgetRef, dependencies: [loading] },
  )

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div
      ref={widgetRef}
      role="dialog"
      aria-modal="true"
      aria-label="Chat Trion Scale"
      style={{
        width: '400px',
        height: '600px',
        maxHeight: 'calc(100dvh - 120px)',
        background: 'rgba(15, 18, 28, 0.92)',
        backdropFilter: 'blur(16px) saturate(140%)',
        WebkitBackdropFilter: 'blur(16px) saturate(140%)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.04) inset',
        transformOrigin: 'bottom right',
        opacity: 0,
        pointerEvents: 'none',
      }}
      className={cn(
        'fixed bottom-5 right-5 z-[61] flex max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-[20px] sm:bottom-6 sm:right-6',
      )}
    >
      {/* Header */}
      <div
        className="chat-header flex shrink-0 items-center justify-between px-4 py-3.5"
        style={{
          background:
            'linear-gradient(135deg, oklch(0.18 0.04 30 / 0.6) 0%, oklch(0.13 0.01 270 / 0.4) 100%)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{
                background:
                  'linear-gradient(135deg, var(--color-accent) 0%, oklch(0.55 0.18 30) 100%)',
                boxShadow: '0 4px 16px rgba(255, 107, 44, 0.35)',
              }}
            >
              <TrionLogo size={18} />
            </div>
            <span className="status-dot absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0f121c] bg-emerald-400" />
          </div>
          <div>
            <p className="text-[14px] font-semibold leading-tight text-white">
              Trion Scale
            </p>
            <p className="text-[11px] text-white/55">Equipa online · Resposta em &lt; 24h</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg p-1.5 text-white/40 transition-colors hover:bg-white/5 hover:text-white/80"
          aria-label="Fechar"
        >
          <X size={16} />
        </button>
      </div>

      {/* Messages scroll area */}
      <div className="chat-scrollbar min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((msg, i) => {
          const isInitial = i === 0
          return (
            <div
              key={msg.id}
              className={cn(
                'chat-msg flex',
                isInitial && 'chat-msg-initial',
                msg.role === 'user' ? 'justify-end' : 'justify-start',
              )}
            >
              {msg.role === 'assistant' && (
                <div className="mr-2 flex h-7 w-7 shrink-0 items-end pb-0.5">
                  <span
                    className="flex h-7 w-7 items-center justify-center rounded-lg"
                    style={{
                      background:
                        'linear-gradient(135deg, var(--color-accent) 0%, oklch(0.55 0.18 30) 100%)',
                    }}
                  >
                    <TrionLogo size={12} />
                  </span>
                </div>
              )}
              <div
                className={cn(
                  'max-w-[78%] px-3.5 py-2.5 text-[13px] leading-relaxed',
                  msg.role === 'user' ? 'text-[var(--color-bg)]' : 'text-white/88',
                )}
                style={
                  msg.role === 'user'
                    ? {
                        background: 'var(--color-accent)',
                        borderRadius: '18px 18px 4px 18px',
                        boxShadow: '0 2px 12px rgba(255, 107, 44, 0.25)',
                      }
                    : {
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '18px 18px 18px 4px',
                      }
                }
              >
                {msg.content}
              </div>
            </div>
          )
        })}

        {/* Loading typing dots */}
        {loading && (
          <div className="flex justify-start">
            <div className="mr-2 flex h-7 w-7 shrink-0 items-end pb-0.5">
              <span
                className="flex h-7 w-7 items-center justify-center rounded-lg"
                style={{
                  background:
                    'linear-gradient(135deg, var(--color-accent) 0%, oklch(0.55 0.18 30) 100%)',
                }}
              >
                <TrionLogo size={12} />
              </span>
            </div>
            <div
              className="px-4 py-3"
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '18px 18px 18px 4px',
              }}
            >
              <div className="flex h-3 items-center gap-1.5">
                <span className="chat-typing-dot h-1.5 w-1.5 rounded-full bg-white/55" />
                <span className="chat-typing-dot h-1.5 w-1.5 rounded-full bg-white/55" />
                <span className="chat-typing-dot h-1.5 w-1.5 rounded-full bg-white/55" />
              </div>
            </div>
          </div>
        )}

        {/* Quick replies */}
        {!quickActionsUsed && messages.length === 1 && !loading && (
          <div className="flex flex-wrap gap-2 pl-9 pt-1">
            {QUICK_REPLIES.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="chat-quick-reply rounded-full px-3 py-1.5 text-[12px] text-white/75 transition-all hover:text-white"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.10)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 107, 44, 0.15)'
                  e.currentTarget.style.borderColor = 'rgba(255, 107, 44, 0.5)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.10)'
                }}
              >
                {q}
              </button>
            ))}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div
        className="chat-input-area shrink-0 px-3 pb-3 pt-2"
        style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}
      >
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Escreve a tua mensagem..."
            disabled={loading}
            className="flex-1 text-[13px] text-white outline-none placeholder:text-white/30 disabled:opacity-40"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              padding: '11px 14px',
              transition: 'border-color 0.2s, background 0.2s',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 107, 44, 0.45)'
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.07)'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
            }}
          />
          <button
            ref={sendBtnRef}
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
            style={{
              background: 'var(--color-accent)',
              boxShadow: '0 4px 14px rgba(255, 107, 44, 0.35)',
            }}
            aria-label="Enviar"
          >
            <Send size={15} className="text-[var(--color-bg)]" />
          </button>
        </div>
        <p className="mt-2 text-center text-[10px] text-white/25">
          Powered by Trion Scale · {new Date().getFullYear()}
        </p>
      </div>
    </div>
  )
}
