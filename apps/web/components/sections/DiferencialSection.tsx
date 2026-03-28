export default function DiferencialSection() {
  return (
    <section className="section" id="diferencial">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Diferencial</span>
          <h2 className="section-title">IA genérica vs.<br />IA sob medida</h2>
          <p className="section-subtitle">A maioria das soluções de IA são genéricas. A Trion Scale constrói o que a sua empresa realmente precisa.</p>
        </div>

        <div className="comparison-table reveal">
          <div className="comparison-col comparison-generic">
            <div className="comparison-header">
              <div className="comparison-icon bad"><i className="fas fa-times"></i></div>
              <h3>IA Genérica</h3>
              <p>Plataformas e ferramentas prontas</p>
            </div>
            <ul className="comparison-list">
              <li className="bad"><i className="fas fa-times-circle"></i> Não se adapta aos seus dados específicos</li>
              <li className="bad"><i className="fas fa-times-circle"></i> Integrações limitadas e complexas</li>
              <li className="bad"><i className="fas fa-times-circle"></i> Dependência de licenças mensais</li>
              <li className="bad"><i className="fas fa-times-circle"></i> Lock-in na plataforma do fornecedor</li>
              <li className="bad"><i className="fas fa-times-circle"></i> ROI difícil de medir e atribuir</li>
              <li className="bad"><i className="fas fa-times-circle"></i> Escala cara e imprevisível</li>
            </ul>
          </div>
          <div className="comparison-divider">
            <div className="comparison-vs">VS</div>
          </div>
          <div className="comparison-col comparison-custom">
            <div className="comparison-header">
              <div className="comparison-icon good"><i className="fas fa-check"></i></div>
              <h3>IA Sob Medida <span className="brand-tag">Trion Scale</span></h3>
              <p>Construída para o seu contexto</p>
            </div>
            <ul className="comparison-list">
              <li className="good"><i className="fas fa-check-circle"></i> Treinada nos seus dados e processos</li>
              <li className="good"><i className="fas fa-check-circle"></i> Integrada ao seu stack existente</li>
              <li className="good"><i className="fas fa-check-circle"></i> Sem licenças — o código é seu</li>
              <li className="good"><i className="fas fa-check-circle"></i> Sem lock-in — total flexibilidade</li>
              <li className="good"><i className="fas fa-check-circle"></i> KPIs definidos e ROI mensurável</li>
              <li className="good"><i className="fas fa-check-circle"></i> Escala previsível e controlada</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
