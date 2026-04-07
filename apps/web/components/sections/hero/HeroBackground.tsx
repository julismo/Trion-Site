'use client'

/**
 * HeroBackground — sistema de 4 camadas sintético (sem imagem estática).
 *
 * Camadas (do fundo para o topo):
 *   1. Gradient base       — linear vertical, --hero-bg-from → --hero-bg-to
 *   2. Radial glow         — accent orange ambiente, mix-blend-screen
 *   3. Grid SVG sutil      — 1px lines, mask radial fade nas bordas
 *   4. Noise turbulence    — feTurbulence inline, mix-blend-overlay
 *
 * Quando a prop `videoSrc` for passada (ex: video do Flow):
 *   - Renderiza <video> ABSOLUTO por cima das camadas
 *   - As 4 camadas continuam atrás como fallback enquanto o video carrega
 *
 * Hidden em mobile (<lg) — só lg+. Mobile fica com fundo body.
 */

interface HeroBackgroundProps {
  videoSrc?: string
  posterSrc?: string
  /** Intensidade do glow (0–1), default 1 */
  intensity?: number
}

export function HeroBackground({ videoSrc, posterSrc, intensity = 1 }: HeroBackgroundProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden lg:block">
      {/* Layer 1 — gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, var(--hero-bg-from) 0%, var(--hero-bg-to) 100%)',
        }}
      />

      {/* Layer 2 — radial glow ambiente */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 60% at 70% 50%, var(--hero-glow), transparent 70%)',
          mixBlendMode: 'screen',
          opacity: intensity,
        }}
      />

      {/* Layer 3 — grid SVG, mask radial para esmaecer nas bordas */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpath d='M80 0H0v80' stroke='%23ffffff' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
          maskImage:
            'radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 80%)',
        }}
      />

      {/* Layer 4 — noise turbulence */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Optional video on top of all 4 layers (when Flow loop is ready) */}
      {videoSrc && (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={posterSrc}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {/* Vignette top + bottom — protege headline e chevron */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, var(--color-bg) 0%, transparent 25%, transparent 75%, var(--color-bg) 100%)',
        }}
      />

      {/* B9: Navbar "covinha" — radial elipse top-center, dark soft halo
          atrás do logo+pill+lang. Cria contraste subtil sem hard borders.
          Largura ~70% (cobre logo→pill→lang), altura ~22% (~200px no h-screen). */}
      <div
        className="absolute inset-x-0 top-0 h-[200px]"
        style={{
          background:
            'radial-gradient(ellipse 60% 100% at center 0%, oklch(0.08 0.005 270 / 0.7) 0%, oklch(0.10 0.005 270 / 0.45) 30%, transparent 75%)',
        }}
      />
    </div>
  )
}
