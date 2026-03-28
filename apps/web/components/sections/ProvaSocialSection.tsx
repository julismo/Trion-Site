'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

const companies = [
  'TechCorp', 'LogiPrime', 'FinanceHub', 'IndustriMax',
  'HealthPlus', 'RetailPro', 'DataFlow', 'NovaSystems',
];

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      'A Trion Scale entendeu o nosso contexto desde o primeiro dia. Em 3 meses, automatizámos processos que consumiam semanas da nossa equipa. O ROI foi claro muito antes do que esperávamos.',
    name: 'Miguel Costa',
    role: 'COO',
    company: 'Empresa de Logística B2B',
    initials: 'MC',
  },
  {
    quote:
      'Finalmente encontrámos um parceiro técnico que fala a linguagem do negócio e entrega resultados reais. Sem black-boxes, sem licenças — o código ficou connosco.',
    name: 'Sofia Rodrigues',
    role: 'CIO',
    company: 'Grupo Industrial',
    initials: 'SR',
  },
  {
    quote:
      'O ROI ficou claro nos primeiros 90 dias. IA aplicada com pragmatismo — sem hype, sem promessas vazias. Estamos agora a expandir para outras áreas do negócio.',
    name: 'João Pinto',
    role: 'Diretor de Inovação',
    company: 'Serviços Financeiros',
    initials: 'JP',
  },
];

export default function ProvaSocialSection() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setTimeout(() => {
        setCurrent(index);
        setIsAnimating(false);
      }, 200);
    },
    [isAnimating]
  );

  const next = useCallback(() => {
    goTo((current + 1) % testimonials.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + testimonials.length) % testimonials.length);
  }, [current, goTo]);

  useEffect(() => {
    intervalRef.current = setInterval(next, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [next]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const resetInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(next, 5000);
  };

  const t = testimonials[current];

  return (
    <section
      ref={sectionRef}
      id="prova-social"
      style={{
        padding: '96px 24px',
        background: 'var(--muted)',
        color: 'var(--foreground)',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Part A — Logo Marquee */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '64px',
            transition: 'opacity 0.7s ease',
            opacity: visible ? 1 : 0,
          }}
        >
          <p
            style={{
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--muted-foreground)',
              marginBottom: '28px',
            }}
          >
            Empresas que confiam na Trion Scale
          </p>
          <h2
            style={{
              fontSize: 'clamp(22px, 3vw, 32px)',
              fontWeight: 700,
              color: 'var(--foreground)',
              marginBottom: '32px',
            }}
          >
            Parceiros que escolheram IA com propósito
          </h2>

          {/* Marquee */}
          <div
            style={{
              overflow: 'hidden',
              position: 'relative',
              maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '16px',
                animation: 'slide 22s linear infinite',
                width: 'max-content',
              }}
            >
              {[...companies, ...companies].map((name, i) => (
                <span
                  key={i}
                  style={{
                    display: 'inline-block',
                    padding: '8px 20px',
                    background: 'var(--background)',
                    border: '1px solid var(--border)',
                    borderRadius: '999px',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--muted-foreground)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: '1px',
            background: 'var(--border)',
            margin: '0 0 64px',
          }}
        />

        {/* Part B — Testimonials */}
        <div
          style={{
            transition: 'opacity 0.7s ease 0.2s',
            opacity: visible ? 1 : 0,
          }}
        >
          <div
            style={{
              maxWidth: '720px',
              margin: '0 auto',
              textAlign: 'center',
            }}
          >
            {/* Quote block */}
            <div
              style={{
                background: 'var(--background)',
                border: '1px solid var(--border)',
                borderRadius: '20px',
                padding: '48px 40px',
                marginBottom: '32px',
                minHeight: '220px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '28px',
                transition: 'opacity 0.2s ease',
                opacity: isAnimating ? 0 : 1,
              }}
            >
              {/* Large quote mark */}
              <span
                style={{
                  fontSize: '56px',
                  lineHeight: 0.8,
                  color: 'var(--accent)',
                  fontFamily: 'Georgia, serif',
                  display: 'block',
                  marginBottom: '4px',
                }}
              >
                "
              </span>
              <p
                style={{
                  fontSize: 'clamp(16px, 2.2vw, 20px)',
                  color: 'var(--foreground)',
                  lineHeight: 1.7,
                  fontStyle: 'italic',
                  margin: 0,
                }}
              >
                {t.quote}
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'center' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'var(--accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '15px',
                    fontWeight: 700,
                    color: '#fff',
                    flexShrink: 0,
                  }}
                >
                  {t.initials}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontSize: '15px', fontWeight: 700, color: 'var(--foreground)', margin: 0 }}>
                    {t.name}
                  </p>
                  <p style={{ fontSize: '13px', color: 'var(--muted-foreground)', margin: 0 }}>
                    {t.role} — {t.company}
                  </p>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
              <button
                onClick={() => { prev(); resetInterval(); }}
                aria-label="Anterior"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'var(--background)',
                  border: '1px solid var(--border)',
                  color: 'var(--foreground)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  transition: 'border-color 0.2s',
                }}
              >
                ←
              </button>

              {/* Dots */}
              <div style={{ display: 'flex', gap: '8px' }}>
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { goTo(i); resetInterval(); }}
                    aria-label={`Testemunho ${i + 1}`}
                    style={{
                      width: i === current ? '24px' : '8px',
                      height: '8px',
                      borderRadius: '999px',
                      background: i === current ? 'var(--accent)' : 'var(--border)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'width 0.3s ease, background 0.3s ease',
                      padding: 0,
                    }}
                  />
                ))}
              </div>

              <button
                onClick={() => { next(); resetInterval(); }}
                aria-label="Próximo"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'var(--background)',
                  border: '1px solid var(--border)',
                  color: 'var(--foreground)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  transition: 'border-color 0.2s',
                }}
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
