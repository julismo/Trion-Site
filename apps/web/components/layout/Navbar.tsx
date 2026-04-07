'use client'

/**
 * Navbar — réplica estrutural de inovadigital.eu/header.
 *
 * Estrutura:
 *   .header
 *     .header__logos       (logo)
 *     .header__menu-nav    (links com .link-menu wrappers + flip-animate)
 *       .link-menu (Soluções) → submenu mega menu (.div-submenu) com 4 cards
 *       .link-menu × restantes (simples)
 *     .header__menus       (lang toggle PT/EN)
 *     .header-menu         (burger mobile)
 *
 * Todos os links têm .flip-animate (CSS em globals.css).
 * Submenu abre on :hover do .link-menu pai (CSS em globals.css).
 */

import { useEffect, useState } from 'react'
import { Brain, Workflow, Code2, ShieldCheck, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS: Array<{
  href: string
  label: string
  submenu?: Array<{ icon: React.ComponentType<{ size?: number; className?: string }>; href: string; title: string; desc: string }>
}> = [
  {
    href: '#solucoes',
    label: 'Soluções',
    submenu: [
      {
        icon: Brain,
        href: '#solucoes-agentes',
        title: 'Agentes IA',
        desc: 'Agentes que executam tarefas complexas. GPT, Claude, integrados no teu negócio.',
      },
      {
        icon: Workflow,
        href: '#solucoes-automacoes',
        title: 'Automações',
        desc: 'Pipelines n8n + integrações. Conecta as tuas ferramentas, elimina trabalho manual.',
      },
      {
        icon: Code2,
        href: '#solucoes-software',
        title: 'Software Custom',
        desc: 'Apps web, dashboards e ferramentas internas. TypeScript + Next.js.',
      },
      {
        icon: ShieldCheck,
        href: '#cta',
        title: 'Diagnóstico Trion',
        desc: 'Auditoria 360° do teu stack. Identificamos oportunidades de IA e automação.',
      },
    ],
  },
  { href: '#para-quem', label: 'Sobre nós' },
  { href: '#casos', label: 'Casos de Estudo' },
  { href: '#cta', label: 'Contactos' },
]

export function Navbar() {
  // P3: lang state mantido para futuro i18n switch (TODO: hook into next-intl)
  const [lang, setLang] = useState<'pt' | 'en'>('pt')
  const [mobileOpen, setMobileOpen] = useState(false)
  // B3: mix-blend-mode SÓ activo dentro do hero (scrollY < 880).
  const [isInHero, setIsInHero] = useState(true)
  // B9: pill ULTRA-subtil enquanto user está no hero + transition (scroll < 2400).
  // Após a curtain transition acabar, pill ganha bg/border normal.
  const [pillSubtle, setPillSubtle] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const onScroll = () => {
      const y = window.scrollY
      setIsInHero(y < 880)
      setPillSubtle(y < 2400)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 bg-transparent transition-all duration-300"
    >
      <div className="header mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 pt-2 lg:px-12">
        {/* header__logos — "Trion Scale" com mix-blend-mode: difference SÓ DENTRO DO HERO.
            B3 fix: fora do hero (scrollY > 880) o efeito difference faz bleed visual
            com cards/conteúdo das sections, então desactiva-se. */}
        <div className="header__logos flex items-center">
          <a href="#" aria-label="Trion Scale" className="block">
            <h1
              className="text-[22px] leading-none transition-[color] duration-300"
              style={{
                fontFamily: "'Clash Display', 'Inter', sans-serif",
                letterSpacing: '-0.01em',
                color: isInHero ? '#ffffff' : 'rgba(255, 255, 255, 0.92)',
                mixBlendMode: isInHero ? 'difference' : 'normal',
              }}
            >
              <b className="font-bold">Trion</b>
              <span className="font-normal">Scale</span>
            </h1>
          </a>
        </div>

        {/* header__menu-nav — pill com 2 estados (B9):
            - pillSubtle (em hero+transition): ultra-subtle "sussurro" — bg/border quase invisível
            - normal (após transition): bg/border visível, glass premium */}
        <nav
          className={cn(
            'header__menu-nav hidden items-center gap-9 rounded-full px-7 py-2.5 transition-all duration-500 md:flex',
            pillSubtle
              ? 'border border-white/[0.06] bg-white/[0.015] backdrop-blur-sm'
              : 'border border-white/10 bg-white/[0.04] backdrop-blur-md',
          )}
        >
          {NAV_ITEMS.map((item) => (
            <div key={item.label} className="link-menu">
              <a
                href={item.href}
                className="flip-animate whitespace-nowrap text-[13px] font-normal text-white hover:text-white"
              >
                <span className="target whitespace-nowrap" data-hover={item.label}>
                  {item.label}
                </span>
              </a>
              {item.submenu && (
                <div className="div-submenu w-[640px] rounded-2xl border border-white/10 bg-[oklch(0.145_0.005_270_/_0.95)] p-4 shadow-2xl backdrop-blur-xl">
                  <ul className="grid grid-cols-2 gap-2">
                    {item.submenu.map((sub) => {
                      const Icon = sub.icon
                      return (
                        <li key={sub.title}>
                          <a
                            href={sub.href}
                            className="group flex items-start gap-3 rounded-xl border border-transparent p-3 transition-all duration-200 hover:border-white/10 hover:bg-white/[0.04]"
                          >
                            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-[var(--color-accent)] transition-colors group-hover:border-[var(--color-accent)]/40">
                              <Icon size={16} />
                            </span>
                            <span className="flex flex-col">
                              <span className="text-sm font-medium text-[var(--color-fg)]">
                                {sub.title}
                              </span>
                              <span className="mt-0.5 text-[12px] leading-snug text-[var(--color-fg-subtle)]">
                                {sub.desc}
                              </span>
                            </span>
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* header__menus — language toggle "Pt — En" com em dash (estilo inovadigital.eu) */}
        <div className="header__menus hidden items-center gap-2 text-[13px] md:flex">
          <button
            onClick={() => setLang('pt')}
            className={cn(
              'transition-colors',
              lang === 'pt' ? 'text-white' : 'text-white/50 hover:text-white/80',
            )}
            aria-label="Português"
          >
            Pt
          </button>
          <span className="text-white/40">—</span>
          <button
            onClick={() => setLang('en')}
            className={cn(
              'transition-colors',
              lang === 'en' ? 'text-white' : 'text-white/50 hover:text-white/80',
            )}
            aria-label="English"
          >
            En
          </button>
        </div>

        {/* header-menu — mobile burger */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="header-menu flex h-10 w-10 items-center justify-center text-[var(--color-fg)] md:hidden"
          aria-label="Abrir menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="absolute inset-x-0 top-16 border-t border-white/10 bg-[oklch(0.145_0.005_270_/_0.95)] backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-1 px-6 py-4">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-3 text-sm text-[var(--color-fg-muted)] transition-colors hover:bg-white/5 hover:text-[var(--color-fg)]"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
