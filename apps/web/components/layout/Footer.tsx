'use client'

/**
 * Footer — NUNCA simples (regra Gu literal).
 * Componentes:
 *   1. Logo GIGANTE (maior que no topo) — fundo é onde a marca respira
 *   2. Marquee de tecnologias (placeholders na Fase 0)
 *   3. Links + redes sociais — SÓ aqui, nunca no topo
 *   4. Copyright fino
 *
 * Altura ~360px desktop, ~280px mobile.
 */

// lucide-react v1.x não exporta Linkedin/Instagram/etc. — SVGs inline (zero dep).
// Paths simplificados, fill="currentColor" para herdar a cor do <a>.
const SOCIALS = [
  {
    label: 'LinkedIn',
    href: '#',
    path: 'M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z',
  },
  {
    label: 'Instagram',
    href: '#',
    path: 'M12 2.2c3.2 0 3.6 0 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.25.07 1.62.07 4.81 0 3.2 0 3.56-.07 4.81-.15 3.23-1.66 4.77-4.92 4.92-1.25.06-1.62.07-4.85.07-3.2 0-3.56 0-4.81-.07-3.27-.15-4.77-1.7-4.92-4.92-.06-1.25-.07-1.62-.07-4.81 0-3.2 0-3.56.07-4.81C2.5 3.96 4 2.42 7.19 2.27 8.44 2.21 8.8 2.2 12 2.2zM12 0C8.74 0 8.33 0 7.05.07c-4.35.2-6.78 2.62-6.98 6.98C0 8.33 0 8.74 0 12s0 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 24 8.74 24 12 24s3.67 0 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98C24 15.67 24 15.26 24 12s0-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67 0 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm6.41-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z',
  },
  {
    label: 'Email',
    href: 'mailto:lorem@ipsum.com',
    path: 'M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z',
  },
]

const TECH_PLACEHOLDERS = [
  'N8N', 'Claude', 'OpenAI', 'Notion', 'Linear',
  'Slack', 'Python', 'TypeScript', 'Vercel', 'Supabase',
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--color-border)] pt-20 pb-10">
      {/* Marquee tecnologias — duplicado para loop infinito */}
      <div className="relative mb-16 overflow-hidden">
        <div className="flex animate-[marquee_30s_linear_infinite] gap-12 whitespace-nowrap">
          {[...TECH_PLACEHOLDERS, ...TECH_PLACEHOLDERS].map((tech, i) => (
            <span
              key={i}
              className="text-2xl font-medium tracking-tight text-[var(--color-fg-subtle)]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Logo GIGANTE — assinatura visual */}
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="mb-12 flex items-end justify-between gap-8">
          <h2 className="text-[clamp(4rem,15vw,12rem)] font-semibold leading-[0.85] tracking-[-0.04em] text-[var(--color-fg)]">
            Trion<span className="text-[var(--color-accent)]">.</span>
          </h2>
          <div className="hidden flex-col items-end gap-2 text-right md:flex">
            <p className="text-sm text-[var(--color-fg-subtle)]">
              Lorem, Ipsum
            </p>
            <p className="text-sm text-[var(--color-fg-subtle)]">
              lorem@ipsum.com
            </p>
          </div>
        </div>

        {/* Links + social */}
        <div className="flex flex-col items-start justify-between gap-6 border-t border-[var(--color-border)] pt-8 md:flex-row md:items-center">
          <nav className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-[var(--color-fg-muted)]">
            <a href="#solucoes" className="hover:text-[var(--color-fg)]">Soluções</a>
            <a href="#para-quem" className="hover:text-[var(--color-fg)]">Para Quem</a>
            <a href="#casos" className="hover:text-[var(--color-fg)]">Casos</a>
            <a href="#metodologia" className="hover:text-[var(--color-fg)]">Metodologia</a>
            <a href="#" className="hover:text-[var(--color-fg)]">Privacidade</a>
          </nav>

          <div className="flex items-center gap-4">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="rounded-full border border-[var(--color-border)] p-2 text-[var(--color-fg-muted)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <p className="mt-8 text-xs text-[var(--color-fg-subtle)]">
          © {new Date().getFullYear()} Trion Scale. Todos os direitos reservados.
        </p>
      </div>

    </footer>
  )
}
