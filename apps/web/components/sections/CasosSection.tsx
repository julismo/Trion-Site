'use client'

const cases = [
  {
    sector: 'Indústria',
    sectorIcon: 'fa-industry',
    type: 'Agente de IA Visual',
    title: 'Automação de Controlo de Qualidade',
    challenge: 'Inspeção manual de qualidade consumia 12h por turno, com 8% de taxa de erro — impactando produtividade e conformidade.',
    solution: 'Agente de IA visual integrado ao sistema MES para deteção automática de defeitos em tempo real.',
    metrics: [
      { value: '60%', label: 'redução no tempo de inspeção' },
      { value: '95%', label: 'precisão na deteção' },
    ],
  },
  {
    sector: 'Logística',
    sectorIcon: 'fa-truck',
    type: 'Automação de Processos',
    title: 'Otimização de Rotas e Planeamento',
    challenge: 'Planeamento manual de rotas resultava em 25% de capacidade desperdiçada e atrasos frequentes nas entregas.',
    solution: 'Sistema de automação inteligente de planeamento integrado ao TMS existente, com otimização em tempo real.',
    metrics: [
      { value: '35%', label: 'aumento na eficiência' },
      { value: '-28%', label: 'custo por entrega' },
    ],
  },
  {
    sector: 'Serviços Financeiros',
    sectorIcon: 'fa-landmark',
    type: 'Software Sob Medida',
    title: 'Processamento Inteligente de Documentos',
    challenge: 'Equipa de 6 pessoas dedicada exclusivamente a extrair e classificar dados de documentos — 40h por semana, alto erro humano.',
    solution: 'Plataforma de IA de extração, classificação e validação automática integrada ao CRM e sistema de gestão.',
    metrics: [
      { value: '80%', label: 'eliminação do processo manual' },
      { value: '3×', label: 'mais rápido' },
    ],
  },
]

export default function CasosSection() {
  return (
    <section className="section section-alt" id="casos">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Casos de Sucesso</span>
          <h2 className="section-title">
            Resultados reais.<br />Empresas reais.
          </h2>
          <p className="section-subtitle">
            Não prometemos — demonstramos. Cada projeto começa com um desafio claro e termina com resultados mensuráveis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {cases.map((c, i) => (
            <div
              className="reveal flex flex-col rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              key={i}
            >
              {/* Sector & type */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-accent)] bg-[rgba(255,107,44,0.08)] px-3 py-1 rounded-full">
                  <i className={`fas ${c.sectorIcon}`} /> {c.sector}
                </span>
                <span className="text-xs text-gray-500 font-medium">{c.type}</span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-[var(--color-primary)] mb-3 leading-snug">
                {c.title}
              </h3>

              {/* Challenge & Solution */}
              <p className="text-sm text-gray-600 leading-relaxed mb-2">
                <strong className="text-[var(--color-primary)] font-semibold">Desafio:</strong> {c.challenge}
              </p>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                <strong className="text-[var(--color-primary)] font-semibold">Solução:</strong> {c.solution}
              </p>

              {/* Metrics */}
              <div className="flex gap-6 pt-4 border-t border-gray-200 mt-auto mb-4">
                {c.metrics.map((m, j) => (
                  <div className="flex flex-col gap-1" key={j}>
                    <span className="text-2xl font-extrabold text-[var(--color-accent)]">{m.value}</span>
                    <span className="text-xs text-gray-500">{m.label}</span>
                  </div>
                ))}
              </div>

              {/* Link */}
              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)] hover:gap-2.5 transition-all duration-300"
              >
                Ver caso completo <i className="fas fa-arrow-right" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
