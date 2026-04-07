'use client'

/**
 * AccessibilityPanel — drawer slide-in LEFT (espelho do ChatbotPanel à direita).
 *
 * Design baseado em pesquisa real:
 *  - Apple: organiza por INTENÇÃO (não por tipo técnico)
 *  - AccessiBe: oferece PERFIS pré-definidos (1 clique aplica combinação)
 *  - WCAG 2.2 AA: critérios 1.4.4, 1.4.12, 2.4.7 implementados literalmente
 *  - Smashing 2025: dark mode acessível com elevação por lightness, não bordas
 *
 * Estrutura visual:
 *  1. Header — PersonStanding badge + título Clash Display + close
 *  2. Live Preview — sample "Aa + parágrafo + link" que actualiza em tempo real
 *  3. Quick Profiles — 4 chips (Visão / Leitura / Movimento / Foco)
 *  4. Conteúdo — tamanho texto, line height, letter spacing
 *  5. Visão — alto contraste, saturação, realçar links, font legível
 *  6. Navegação — parar animações, focus highlight, reading mask
 *  7. Footer — repor predefinições
 *
 * Animação:
 *  - Drawer: slide-in left 400ms
 *  - Sections: GSAP stagger from y:20 opacity:0, delay 0.25s, stagger 0.06s
 *
 * Estado persistido em localStorage `trion-a11y`. Aplicado via classes
 * `html.a11y-*` e variáveis CSS. Restaurado on first mount globalmente.
 */

import { useEffect, useRef, useState } from 'react'
import {
  X, PersonStanding, Contrast, Droplet, Link2, Pause, Focus,
  BookOpen, RotateCcw, Crosshair, Eye,
} from 'lucide-react'
import { gsap, useGSAP, ScrollSmoother } from '@/lib/gsap-init'
import { cn } from '@/lib/utils'

/* ============================================================
   STATE
   ============================================================ */

interface A11yState {
  profile: 'none' | 'vision' | 'reading' | 'motion' | 'focus'
  textSize: 0 | 1 | 2 | 3            // 100 / 110 / 125 / 150 %
  lineHeight: 0 | 1 | 2              // 1.6 / 1.8 / 2.0
  letterSpacing: 0 | 1 | 2           // 0 / 0.05em / 0.12em (WCAG 1.4.12)
  saturation: 0 | 1 | 2 | 3          // 100 / 75 / 50 / 0 %
  highContrast: boolean
  highlightLinks: boolean
  readableFont: boolean              // Atkinson Hyperlegible
  stopAnimations: boolean
  focusHighlight: boolean
  readingMask: boolean
}

const DEFAULT_STATE: A11yState = {
  profile: 'none',
  textSize: 0,
  lineHeight: 0,
  letterSpacing: 0,
  saturation: 0,
  highContrast: false,
  highlightLinks: false,
  readableFont: false,
  stopAnimations: false,
  focusHighlight: false,
  readingMask: false,
}

const STORAGE_KEY = 'trion-a11y'

/* ============================================================
   PROFILE PRESETS
   Cada perfil aplica uma combinação (override total dos defaults).
   ============================================================ */

const PROFILES: Record<Exclude<A11yState['profile'], 'none'>, Partial<A11yState>> = {
  // Visão reduzida — texto grande + alto contraste + focus visível
  vision: {
    textSize: 2,
    lineHeight: 1,
    highContrast: true,
    focusHighlight: true,
  },
  // Leitura/dislexia — font legível + espaçamento generoso + links destacados
  reading: {
    textSize: 1,
    lineHeight: 2,
    letterSpacing: 1,
    readableFont: true,
    highlightLinks: true,
  },
  // Sensibilidade ao movimento (epilepsia, vertigem) — sem animações + saturação reduzida
  motion: {
    stopAnimations: true,
    saturation: 1,
  },
  // Foco/TDAH — sem animações + reading mask + focus highlight
  focus: {
    stopAnimations: true,
    readingMask: true,
    focusHighlight: true,
  },
}

/* ============================================================
   APPLY → DOM
   Tudo via classList em <html> + variáveis CSS.
   ============================================================ */

function loadState(): A11yState {
  if (typeof window === 'undefined') return DEFAULT_STATE
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_STATE
    return { ...DEFAULT_STATE, ...JSON.parse(raw) }
  } catch {
    return DEFAULT_STATE
  }
}

function applyState(state: A11yState) {
  const html = document.documentElement
  const classList = html.classList

  // Helper: remove all variants of a prefix, optionally add one
  const setVariant = (prefix: string, value: number) => {
    for (let i = 0; i <= 3; i++) classList.remove(`${prefix}-${i}`)
    if (value > 0) classList.add(`${prefix}-${value}`)
  }

  setVariant('a11y-text', state.textSize)
  setVariant('a11y-lh', state.lineHeight)
  setVariant('a11y-ls', state.letterSpacing)
  setVariant('a11y-sat', state.saturation)

  classList.toggle('a11y-high-contrast', state.highContrast)
  classList.toggle('a11y-highlight-links', state.highlightLinks)
  classList.toggle('a11y-readable-font', state.readableFont)
  classList.toggle('a11y-stop-animations', state.stopAnimations)
  classList.toggle('a11y-focus-highlight', state.focusHighlight)
  classList.toggle('a11y-reading-mask', state.readingMask)
}

// Restaura on first global mount — antes do React montar o painel
let _restored = false
function restoreOnce() {
  if (_restored || typeof window === 'undefined') return
  _restored = true
  applyState(loadState())
}

/* ============================================================
   READING MASK — listener que actualiza --a11y-mask-y no html
   ============================================================ */

function attachReadingMask(): () => void {
  const html = document.documentElement
  const onMove = (e: MouseEvent) => {
    html.style.setProperty('--a11y-mask-y', `${e.clientY}px`)
  }
  window.addEventListener('mousemove', onMove, { passive: true })
  return () => {
    window.removeEventListener('mousemove', onMove)
    html.style.removeProperty('--a11y-mask-y')
  }
}

/* ============================================================
   COMPONENT
   ============================================================ */

interface AccessibilityPanelProps {
  open: boolean
  onClose: () => void
}

export function AccessibilityPanel({ open, onClose }: AccessibilityPanelProps) {
  const [s, setS] = useState<A11yState>(DEFAULT_STATE)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Restore preferences on first mount
  useEffect(() => {
    restoreOnce()
    setS(loadState())
  }, [])

  // ESC key closes
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // Focus trap on open
  useEffect(() => {
    if (open && closeBtnRef.current) {
      setTimeout(() => closeBtnRef.current?.focus(), 350)
    }
  }, [open])

  // Lock scroll when open — CRÍTICO: pausa também o ScrollSmoother do site,
  // senão ele captura wheel events antes de chegarem ao overflow-y-auto
  // do painel e o user fica sem conseguir scrollar dentro do drawer.
  useEffect(() => {
    if (!open) return
    const smoother = ScrollSmoother.get()
    smoother?.paused(true)
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      smoother?.paused(false)
      document.body.style.overflow = original
    }
  }, [open])

  // Reading mask listener — only attached when active
  useEffect(() => {
    if (!s.readingMask) return
    return attachReadingMask()
  }, [s.readingMask])

  // GSAP stagger entry — sections cascade in when drawer opens
  useGSAP(
    () => {
      if (!open || !containerRef.current) return
      const sections = containerRef.current.querySelectorAll('[data-a11y-section]')
      gsap.from(sections, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.06,
        delay: 0.25, // wait for drawer slide-in
      })
    },
    { scope: containerRef, dependencies: [open] },
  )

  /* ----- mutators ----- */

  const persist = (next: A11yState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    applyState(next)
    setS(next)
  }

  const update = (patch: Partial<A11yState>) => {
    persist({ ...s, ...patch, profile: 'none' }) // manual change → clear preset
  }

  const applyProfile = (profile: Exclude<A11yState['profile'], 'none'>) => {
    // Toggle off if same profile already active
    if (s.profile === profile) {
      persist({ ...DEFAULT_STATE, profile: 'none' })
      return
    }
    persist({ ...DEFAULT_STATE, ...PROFILES[profile], profile })
  }

  const reset = () => {
    localStorage.removeItem(STORAGE_KEY)
    applyState(DEFAULT_STATE)
    setS(DEFAULT_STATE)
  }

  /* ----- preview values ----- */

  const previewSize = ['1rem', '1.1rem', '1.25rem', '1.5rem'][s.textSize]
  const previewLH = ['1.6', '1.8', '2'][s.lineHeight]
  const previewLS = ['0', '0.05em', '0.12em'][s.letterSpacing]
  const previewFilter = `saturate(${[1, 0.75, 0.5, 0][s.saturation]})`

  /* ============================================================
     RENDER
     ============================================================ */

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm transition-opacity duration-300',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer LEFT — 440px, glassmorphic */}
      <aside
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="a11y-title"
        className={cn(
          'fixed left-0 top-0 z-[61] flex h-full w-full flex-col border-r border-white/10 bg-[oklch(0.13_0.005_270_/_0.97)] shadow-[8px_0_60px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-transform duration-400 ease-[var(--ease-smooth)] sm:w-[440px]',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {/* ─── HEADER — sóbrio, sem ornamentos ─── */}
        <header
          data-a11y-section
          className="flex items-center justify-between border-b border-white/[0.06] px-6 py-5"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/85">
              <PersonStanding size={18} />
            </span>
            <div>
              <h2
                id="a11y-title"
                style={{ fontFamily: 'var(--font-display)' }}
                className="text-[19px] font-semibold leading-none tracking-tight text-white"
              >
                Acessibilidade
              </h2>
              <p className="mt-1.5 text-[11px] text-white/45">
                Ajusta o site ao teu modo de leitura
              </p>
            </div>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar painel"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-white/[0.08] text-white/55 transition-all duration-150 ease-[var(--ease-snap)] hover:border-white/25 hover:bg-white/[0.04] hover:text-white"
          >
            <X size={15} />
          </button>
        </header>

        {/* ─── SCROLL AREA ─── */}
        <div className="flex-1 overflow-y-auto">
          {/* Live preview — sample real */}
          <section
            data-a11y-section
            className="border-b border-white/[0.06] px-6 py-5"
          >
            <SectionLabel title="Pré-visualização" />
            <div
              className={cn(
                'mt-3 rounded-xl border border-white/[0.08] bg-white/[0.025] px-5 py-4 transition-colors',
                s.readableFont && 'a11y-preview-readable',
                s.highContrast && 'border-white bg-black',
              )}
              style={{
                fontSize: previewSize,
                lineHeight: previewLH,
                letterSpacing: previewLS,
                filter: previewFilter,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: `calc(${previewSize} * 1.7)`,
                }}
                className="font-semibold leading-none text-white"
              >
                Aa
              </div>
              <p className="mt-2 text-white/75">
                Lorem ipsum dolor sit amet,{' '}
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className={cn(
                    'underline-offset-2',
                    s.highlightLinks
                      ? 'font-semibold text-[var(--color-accent)] underline'
                      : 'text-[var(--color-accent)]',
                  )}
                >
                  consectetur adipiscing
                </a>{' '}
                elit sed do eiusmod tempor.
              </p>
            </div>
          </section>

          {/* Quick profiles */}
          <section data-a11y-section className="px-6 py-5">
            <SectionLabel title="Perfis" />
            <div className="mt-3 grid grid-cols-2 gap-2">
              <ProfileChip
                icon={Eye}
                label="Visão"
                desc="Texto grande, contraste"
                active={s.profile === 'vision'}
                onClick={() => applyProfile('vision')}
              />
              <ProfileChip
                icon={BookOpen}
                label="Leitura"
                desc="Font legível, espaçada"
                active={s.profile === 'reading'}
                onClick={() => applyProfile('reading')}
              />
              <ProfileChip
                icon={Pause}
                label="Movimento"
                desc="Sem animações"
                active={s.profile === 'motion'}
                onClick={() => applyProfile('motion')}
              />
              <ProfileChip
                icon={Crosshair}
                label="Foco"
                desc="Máscara de leitura"
                active={s.profile === 'focus'}
                onClick={() => applyProfile('focus')}
              />
            </div>
          </section>

          {/* CONTENT — Conteúdo */}
          <section data-a11y-section className="border-t border-white/[0.06] px-6 py-5">
            <SectionLabel title="Conteúdo" />

            <div className="mt-4 space-y-4">
              <SegmentField
                label="Tamanho do texto"
                values={['100%', '110%', '125%', '150%']}
                active={s.textSize}
                onChange={(i) => update({ textSize: i as A11yState['textSize'] })}
              />
              <SegmentField
                label="Altura da linha"
                values={['1.6', '1.8', '2.0']}
                active={s.lineHeight}
                onChange={(i) => update({ lineHeight: i as A11yState['lineHeight'] })}
              />
              <SegmentField
                label="Espaço entre letras"
                values={['Normal', '+0.05', '+0.12']}
                active={s.letterSpacing}
                onChange={(i) => update({ letterSpacing: i as A11yState['letterSpacing'] })}
              />
            </div>
          </section>

          {/* DISPLAY — Visão */}
          <section data-a11y-section className="border-t border-white/[0.06] px-6 py-5">
            <SectionLabel title="Visão" />

            <div className="mt-4 space-y-4">
              <SegmentField
                label="Saturação"
                values={['100%', '75%', '50%', '0%']}
                active={s.saturation}
                onChange={(i) => update({ saturation: i as A11yState['saturation'] })}
              />

              <div className="grid grid-cols-2 gap-2">
                <ToggleTile
                  icon={Contrast}
                  label="Alto contraste"
                  active={s.highContrast}
                  onToggle={() => update({ highContrast: !s.highContrast })}
                />
                <ToggleTile
                  icon={Link2}
                  label="Realçar links"
                  active={s.highlightLinks}
                  onToggle={() => update({ highlightLinks: !s.highlightLinks })}
                />
                <ToggleTile
                  icon={Droplet}
                  label="Font legível"
                  active={s.readableFont}
                  onToggle={() => update({ readableFont: !s.readableFont })}
                />
              </div>
            </div>
          </section>

          {/* ORIENTATION — Navegação */}
          <section data-a11y-section className="border-t border-white/[0.06] px-6 py-5">
            <SectionLabel title="Navegação" />

            <div className="mt-4 grid grid-cols-2 gap-2">
              <ToggleTile
                icon={Pause}
                label="Parar animações"
                active={s.stopAnimations}
                onToggle={() => update({ stopAnimations: !s.stopAnimations })}
              />
              <ToggleTile
                icon={Focus}
                label="Realçar foco"
                active={s.focusHighlight}
                onToggle={() => update({ focusHighlight: !s.focusHighlight })}
              />
              <ToggleTile
                icon={BookOpen}
                label="Máscara de leitura"
                active={s.readingMask}
                onToggle={() => update({ readingMask: !s.readingMask })}
              />
            </div>
          </section>
        </div>

        {/* ─── FOOTER — minimal ─── */}
        <footer
          data-a11y-section
          className="border-t border-white/[0.06] px-6 py-4"
        >
          <button
            type="button"
            onClick={reset}
            className="flex w-full items-center justify-center gap-2 rounded-md border border-white/[0.08] bg-transparent px-4 py-2.5 text-[12px] font-normal text-white/65 transition-all duration-150 ease-[var(--ease-snap)] hover:border-white/25 hover:bg-white/[0.04] hover:text-white"
          >
            <RotateCcw size={13} />
            Repor predefinições
          </button>
        </footer>
      </aside>
    </>
  )
}

/* ============================================================
   SUB-COMPONENTS
   ============================================================ */

/**
 * SectionLabel — texto puro, sem ícone (skill: "se remover o ícone não
 * perde sentido, remove"). Cor quiet, accent reservado para active states.
 */
function SectionLabel({ title }: { title: string }) {
  return (
    <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
      {title}
    </div>
  )
}

/**
 * ProfileChip — preset combinado. Active = border accent + bg subtil shift.
 * Sem glow, sem dot decorativo. Subtle layering only.
 */
function ProfileChip({
  icon: Icon,
  label,
  desc,
  active,
  onClick,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>
  label: string
  desc: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'group flex flex-col items-start gap-3 rounded-xl border p-4 text-left transition-all duration-150 ease-[var(--ease-snap)]',
        active
          ? 'border-[var(--color-accent)]/70 bg-[var(--color-accent)]/[0.06]'
          : 'border-white/[0.07] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]',
      )}
    >
      <span
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-md border transition-colors',
          active
            ? 'border-[var(--color-accent)]/40 bg-[var(--color-accent)]/[0.12] text-[var(--color-accent)]'
            : 'border-white/[0.08] bg-white/[0.03] text-white/65 group-hover:text-white/85',
        )}
      >
        <Icon size={15} />
      </span>
      <div>
        <div
          className={cn(
            'text-[13px] font-medium tracking-tight',
            active ? 'text-white' : 'text-white/85',
          )}
        >
          {label}
        </div>
        <div className="mt-0.5 text-[11px] leading-tight text-white/40">{desc}</div>
      </div>
    </button>
  )
}

/**
 * SegmentField — radio group estilo segmented control.
 * Tabular nums no valor mostrado (cross-table.md: stripe/vercel/linear usam).
 */
function SegmentField({
  label,
  values,
  active,
  onChange,
}: {
  label: string
  values: string[]
  active: number
  onChange: (i: number) => void
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[12px] font-normal text-white/65">{label}</span>
        <span className="text-[11px] tabular-nums text-white/45">{values[active]}</span>
      </div>
      <div
        className="grid gap-1 rounded-lg border border-white/[0.07] bg-white/[0.02] p-1"
        style={{ gridTemplateColumns: `repeat(${values.length}, 1fr)` }}
      >
        {values.map((v, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onChange(i)}
            aria-pressed={active === i}
            className={cn(
              'rounded-md px-2 py-1.5 text-[11px] font-medium tabular-nums transition-all duration-150 ease-[var(--ease-snap)]',
              active === i
                ? 'bg-[var(--color-accent)]/[0.12] text-[var(--color-accent)] ring-1 ring-inset ring-[var(--color-accent)]/40'
                : 'text-white/55 hover:bg-white/[0.04] hover:text-white/80',
            )}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  )
}

/**
 * ToggleTile — pattern Inova: click no card todo activa.
 * Active = subtle layering (lightness shift + border accent), sem glow
 * sem dot decorativo. "Whisper, não shout" (skill interface-design).
 */
function ToggleTile({
  icon: Icon,
  label,
  active,
  onToggle,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>
  label: string
  active: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      role="switch"
      aria-checked={active}
      aria-label={label}
      className={cn(
        'group flex flex-col items-center justify-center gap-2.5 rounded-xl border px-3 py-4 text-center transition-all duration-150 ease-[var(--ease-snap)]',
        active
          ? 'border-[var(--color-accent)]/70 bg-[var(--color-accent)]/[0.06]'
          : 'border-white/[0.07] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]',
      )}
    >
      <span
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-md border transition-colors',
          active
            ? 'border-[var(--color-accent)]/40 bg-[var(--color-accent)]/[0.12] text-[var(--color-accent)]'
            : 'border-white/[0.08] bg-white/[0.03] text-white/65 group-hover:text-white/85',
        )}
      >
        <Icon size={17} />
      </span>
      <span
        className={cn(
          'text-[11px] font-medium leading-tight tracking-tight',
          active ? 'text-white' : 'text-white/70 group-hover:text-white/85',
        )}
      >
        {label}
      </span>
    </button>
  )
}
