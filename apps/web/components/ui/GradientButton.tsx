'use client'

/**
 * GradientButton — botão primário Trion.
 * - font-weight: 500 (Medium) — nunca Bold
 * - hover: translateY(-2px) + clarear cor (regra Gu)
 * - radius 12px (token --radius-button)
 *
 * Variantes:
 *   primary   — laranja sólido
 *   secondary — borda + transparente
 *   ghost     — link puro com seta
 */

import { tv, type VariantProps } from 'tailwind-variants'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const button = tv({
  base: 'inline-flex items-center gap-2 rounded-[var(--radius-button)] font-medium transition-all duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-0.5',
  variants: {
    variant: {
      primary:
        'bg-[var(--color-accent)] text-[var(--color-bg)] hover:bg-[var(--color-accent-hover)] hover:shadow-[var(--shadow-glow)]',
      secondary:
        'border border-[var(--color-border-strong)] bg-transparent text-[var(--color-fg)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]',
      ghost:
        'bg-transparent text-[var(--color-fg-muted)] hover:text-[var(--color-accent)] hover:translate-x-1',
      // Grupowebhub-style pill — white pill com ícone arrow circular
      pillWhite:
        'rounded-full bg-white/90 text-black/90 hover:bg-white hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]',
      // Grupowebhub-style pill — dark with subtle border
      pillDark:
        'rounded-full border-2 border-white/20 bg-black/90 text-white/90 hover:border-white/40 hover:bg-black',
    },
    size: {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-base md:text-lg',
      xl: 'px-10 py-5 text-lg',
      // Grupowebhub asymmetric padding (8/20) — left wider for text, right narrow for arrow icon
      pill: 'gap-3 py-2 pl-5 pr-2 text-base',
    },
  },
  defaultVariants: { variant: 'primary', size: 'md' },
})

interface GradientButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  asChild?: boolean
  arrow?: boolean
}

export function GradientButton({
  className,
  variant,
  size,
  arrow = true,
  children,
  ...props
}: GradientButtonProps) {
  const isPillSize = size === 'pill'
  // Pill variants get a circular badge with arrow inside
  const isPillVariant = variant === 'pillWhite' || variant === 'pillDark'

  return (
    <button className={cn(button({ variant, size }), className)} {...props}>
      <span>{children}</span>
      {arrow && (isPillSize || isPillVariant) ? (
        <span
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-full',
            variant === 'pillWhite' && 'bg-black/90 text-white/90',
            variant === 'pillDark' && 'bg-white/90 text-black/90',
            !isPillVariant && 'bg-[var(--color-bg)] text-[var(--color-fg)]',
          )}
        >
          <ArrowRight size={16} />
        </span>
      ) : (
        arrow && <ArrowRight size={18} className="transition-transform duration-300" />
      )}
    </button>
  )
}
