export default function SobreSection({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section className="section section-alt" id="sobre">
      <div className="container">
        <div className="about-wrapper reveal">
          <div className="about-text">
            <span className="section-label">Sobre a Trion Scale</span>
            <h2 className="section-title">Acreditamos que a IA<br />deve servir o negócio.</h2>
            <p className="about-desc">A Trion Scale nasceu da convicção de que a inteligência artificial só cria valor real quando é aplicada com intenção, profundidade técnica e foco em resultados de negócio mensuráveis.</p>
            <p className="about-desc">Não somos uma consultoria genérica que fala de IA como tendência. Somos engenheiros, arquitectos de software e consultores de negócio que constroem soluções que funcionam — e que ficam com os clientes a longo prazo.</p>
            <button className="btn btn-primary" onClick={onOpenModal}>Falar com especialista</button>
          </div>
          <div className="about-pillars">
            <div className="pillar-card">
              <div className="pillar-num">01</div>
              <h4>Expertise Técnica Profunda</h4>
              <p>Engenheiros de IA, arquitectos de software e especialistas em dados — com experiência em projetos complexos para grandes empresas.</p>
            </div>
            <div className="pillar-card">
              <div className="pillar-num">02</div>
              <h4>Foco em Resultados de Negócio</h4>
              <p>Cada projeto começa com KPIs claros e termina com resultados mensuráveis. Tecnologia é o meio — impacto é o fim.</p>
            </div>
            <div className="pillar-card">
              <div className="pillar-num">03</div>
              <h4>Parceria de Longo Prazo</h4>
              <p>Não entregamos apenas projetos — construímos capacidades. A solução melhora com o tempo, e a sua equipa cresce connosco.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
