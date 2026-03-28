'use client'

const resources = [
  {
    category: 'Operações',
    title: 'Como aplicar IA em processos financeiros sem substituir o seu ERP',
    desc: 'Um guia prático para líderes de tecnologia e operações que querem integrar IA sem reescrever o stack existente.',
    readTime: '8 min de leitura',
  },
  {
    category: 'Agentes de IA',
    title: 'Agentes de IA vs Chatbots: qual a diferença e quando usar cada um',
    desc: 'Entenda as diferenças técnicas e estratégicas — e como escolher a abordagem certa para o seu caso de uso específico.',
    readTime: '6 min de leitura',
  },
  {
    category: 'Automação',
    title: '5 sinais de que a sua empresa está pronta para automação com IA',
    desc: 'Antes de investir, avalie a maturidade dos seus dados e processos com estes 5 indicadores práticos de prontidão.',
    readTime: '5 min de leitura',
  },
]

export default function RecursosSection() {
  return (
    <section className="section" id="recursos">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Recursos</span>
          <h2 className="section-title">
            Conhecimento que<br />transforma decisões.
          </h2>
          <p className="section-subtitle">
            Conteúdos práticos e educativos para decisores que querem aplicar IA de forma intencional e pragmática.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {resources.map((r, i) => (
            <div
              className="reveal flex flex-col rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              key={i}
            >
              {/* Category */}
              <span className="inline-block text-xs font-semibold uppercase tracking-wide text-[var(--color-accent)] bg-[rgba(255,107,44,0.08)] px-3 py-1 rounded-full w-fit mb-4">
                {r.category}
              </span>

              {/* Title */}
              <h3 className="text-lg font-bold text-[var(--color-primary)] leading-snug mb-3">
                {r.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed mb-6 grow">
                {r.desc}
              </p>

              {/* Meta */}
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <span className="text-xs text-gray-400 flex items-center gap-1.5">
                  <i className="fas fa-clock" /> {r.readTime}
                </span>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)] hover:gap-2.5 transition-all duration-300"
                >
                  Ler artigo <i className="fas fa-arrow-right" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center reveal">
          <a href="#" className="btn btn-outline">
            Ver todos os recursos <i className="fas fa-arrow-right" />
          </a>
        </div>
      </div>
    </section>
  )
}
