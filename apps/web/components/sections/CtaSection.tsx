export default function CtaSection({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section className="section cta-section" id="cta-final">
      <div className="cta-bg">
        <div className="cta-grid-pattern"></div>
        <div className="cta-glow"></div>
      </div>
      <div className="container cta-content reveal">
        <h2 className="cta-title">Pronto para transformar o seu<br />negócio com IA?</h2>
        <p className="cta-subtitle">Agende um diagnóstico gratuito e descubra como a IA sob medida<br className="hide-mobile" />pode impactar os seus resultados — sem compromisso.</p>
        <div className="cta-buttons">
          <button className="btn btn-white btn-large" onClick={onOpenModal}>
            Agendar Diagnóstico <i className="fas fa-arrow-right"></i>
          </button>
          <a href="mailto:contacto@trionscale.com" className="btn btn-outline-white btn-large">
            Falar com Especialista
          </a>
        </div>
        <div className="cta-trust">
          <span><i className="fas fa-check"></i> Sem compromisso</span>
          <span><i className="fas fa-check"></i> Diagnóstico gratuito</span>
          <span><i className="fas fa-check"></i> Resposta em 24 horas</span>
        </div>
      </div>
    </section>
  )
}
