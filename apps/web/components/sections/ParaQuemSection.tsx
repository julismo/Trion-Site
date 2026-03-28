export default function ParaQuemSection() {
  return (
    <section className="section section-alt" id="para-quem">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Para Quem</span>
          <h2 className="section-title">Criada para os decisores<br />que querem resultados reais</h2>
          <p className="section-subtitle">A Trion Scale trabalha com líderes que já perceberam que IA genérica não resolve — e que precisam de um parceiro que entenda tanto de tecnologia como de negócio.</p>
        </div>
        <div className="personas-grid">
          <div className="persona-card reveal">
            <div className="persona-icon">
              <i className="fas fa-cogs"></i>
            </div>
            <div className="persona-tag">COO / Diretor de Operações</div>
            <h3 className="persona-title">Operação emperrada por processos manuais?</h3>
            <p className="persona-desc">Processos lentos, dependência de planilhas, retrabalho constante? Automatizamos o que trava a sua operação — sem interromper o que já funciona.</p>
            <a href="#solucoes" className="persona-link">Ver soluções <i className="fas fa-arrow-right"></i></a>
          </div>
          <div className="persona-card reveal">
            <div className="persona-icon">
              <i className="fas fa-server"></i>
            </div>
            <div className="persona-tag">CIO / Head de IT</div>
            <h3 className="persona-title">Pressão para trazer IA, sistemas fragmentados?</h3>
            <p className="persona-desc">Integramos IA ao seu stack existente — ERP, CRM, bases de dados — com segurança, governança e sem black-boxes ou lock-in em licenças.</p>
            <a href="#solucoes" className="persona-link">Ver soluções <i className="fas fa-arrow-right"></i></a>
          </div>
          <div className="persona-card reveal">
            <div className="persona-icon">
              <i className="fas fa-lightbulb"></i>
            </div>
            <div className="persona-tag">Diretor de Inovação</div>
            <h3 className="persona-title">POCs que nunca chegam a produção?</h3>
            <p className="persona-desc">Levamos projetos de IA do diagnóstico ao resultado mensurável. Discovery, protótipo, produção — com KPIs claros em cada fase.</p>
            <a href="#como-trabalhamos" className="persona-link">Ver metodologia <i className="fas fa-arrow-right"></i></a>
          </div>
          <div className="persona-card reveal">
            <div className="persona-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <div className="persona-tag">CEO / Fundador</div>
            <h3 className="persona-title">Concorrentes já usam IA — por onde começar?</h3>
            <p className="persona-desc">Criamos um roadmap pragmático, começando onde o impacto é maior. Sem jargão, sem hype — foco em payback rápido e escalabilidade real.</p>
            <a href="#casos" className="persona-link">Ver casos de sucesso <i className="fas fa-arrow-right"></i></a>
          </div>
        </div>
      </div>
    </section>
  )
}
