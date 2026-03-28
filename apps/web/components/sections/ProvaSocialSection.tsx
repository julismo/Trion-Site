'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import { cn } from '@/lib/utils'

const logos = [
  'TechCorp', 'LogiPrime', 'FinanceHub', 'IndustriMax',
  'HealthPlus', 'RetailPro', 'DataFlow', 'NovaSystems',
]

const testimonials = [
  {
    quote: 'A Trion Scale entendeu o nosso contexto desde o primeiro dia. Em 3 meses, automatizámos processos que consumiam semanas da nossa equipa. O ROI foi claro muito antes do que esperávamos.',
    initials: 'MC',
    name: 'Miguel Costa',
    role: 'COO — Empresa de Logística B2B',
  },
  {
    quote: 'Finalmente encontrámos um parceiro técnico que fala a linguagem do negócio e entrega resultados reais. Sem black-boxes, sem licenças — o código ficou connosco.',
    initials: 'SR',
    name: 'Sofia Rodrigues',
    role: 'CIO — Grupo Industrial',
  },
  {
    quote: 'O ROI ficou claro nos primeiros 90 dias. IA aplicada com pragmatismo — sem hype, sem promessas vazias. Estamos agora a expandir para outras áreas do negócio.',
    initials: 'JP',
    name: 'João Pinto',
    role: 'Diretor de Inovação — Serviços Financeiros',
  },
]

export default function ProvaSocialSection() {
  const [active, setActive] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  const resetInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(next, 5000)
  }, [next])

  useEffect(() => {
    intervalRef.current = setInterval(next, 5000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [next])

  return (
    <section className="section" id="prova-social">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Empresas que confiam na Trion Scale</span>
          <h2 className="section-title">
            Parceiros que escolheram<br />IA com propósito
          </h2>
        </div>

        {/* Logo Marquee */}
        <div className="logos-marquee reveal relative overflow-hidden mb-12 py-4">
          <div
            className="flex gap-4 w-max hover:[animation-play-state:paused]"
            style={{ animation: 'logoScroll 25s linear infinite' }}
          >
            {[...logos, ...logos].map((name, i) => (
              <div
                className="inline-flex items-center justify-center px-5 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm font-semibold text-gray-400 whitespace-nowrap transition-colors duration-300 hover:text-gray-500 hover:border-gray-300"
                key={i}
              >
                {name}
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="reveal">
          {/* Slider */}
          <div className="relative overflow-hidden">
            {testimonials.map((t, i) => (
              <div
                className={cn(
                  'animate-[fadeInUp_0.4s_ease]',
                  i === active ? 'block' : 'hidden'
                )}
                key={i}
              >
                <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-12 max-w-[800px] mx-auto text-center shadow-lg">
                  {/* Stars */}
                  <div className="flex justify-center gap-1 mb-6 text-amber-400 text-sm">
                    {[...Array(5)].map((_, s) => (
                      <i className="fas fa-star" key={s} />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-lg md:text-xl font-medium text-[var(--color-primary)] leading-relaxed italic mb-8">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4 justify-center">
                    <div className="w-12 h-12 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-sm font-bold text-white shrink-0">
                      {t.initials}
                    </div>
                    <div className="flex flex-col gap-0.5 text-left">
                      <span className="text-sm font-bold text-[var(--color-primary)]">{t.name}</span>
                      <span className="text-xs text-gray-500">{t.role}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-5 mt-8">
            <button
              onClick={() => { prev(); resetInterval() }}
              aria-label="Anterior"
              className="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-600 flex items-center justify-center text-sm cursor-pointer transition-colors duration-300 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              <i className="fas fa-chevron-left" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <span
                  key={i}
                  onClick={() => { setActive(i); resetInterval() }}
                  className={cn(
                    'h-2 rounded-full cursor-pointer transition-all duration-300',
                    i === active
                      ? 'w-6 bg-[var(--color-accent)]'
                      : 'w-2 bg-gray-300'
                  )}
                />
              ))}
            </div>

            <button
              onClick={() => { next(); resetInterval() }}
              aria-label="Próximo"
              className="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-600 flex items-center justify-center text-sm cursor-pointer transition-colors duration-300 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              <i className="fas fa-chevron-right" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
