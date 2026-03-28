export default function SegurancaSection() {
  return (
    <section className="section section-alt" id="seguranca">
      <div className="container">
        <div className="security-wrapper reveal">
          <div className="security-text">
            <span className="section-label">Segurança e Integração</span>
            <h2 className="section-title">Confiança não é<br />opcional.</h2>
            <p className="section-subtitle">Segurança enterprise incorporada em cada camada — desde a infraestrutura até à aplicação.</p>
            <div className="security-badges">
              <div className="security-badge"><i className="fas fa-shield-alt"></i> GDPR Compliant</div>
              <div className="security-badge"><i className="fas fa-lock"></i> SSL / TLS</div>
              <div className="security-badge"><i className="fas fa-database"></i> Data Encryption</div>
              <div className="security-badge"><i className="fas fa-key"></i> Zero Lock-in</div>
            </div>
          </div>
          <div className="security-features">
            <div className="security-feature">
              <div className="sf-icon"><i className="fas fa-plug"></i></div>
              <div className="sf-content">
                <h4>Integração nativa com ERPs, CRMs e bases de dados</h4>
                <p>APIs, webhooks e conectores para os principais sistemas empresariais. Sem duplicação de dados.</p>
              </div>
            </div>
            <div className="security-feature">
              <div className="sf-icon"><i className="fas fa-code-branch"></i></div>
              <div className="sf-content">
                <h4>O código e os dados são seus, sempre</h4>
                <p>Sem dependência de licenças — entregamos código-fonte completo e documentado. Total portabilidade.</p>
              </div>
            </div>
            <div className="security-feature">
              <div className="sf-icon"><i className="fas fa-balance-scale"></i></div>
              <div className="sf-content">
                <h4>Conformidade com GDPR e proteção de dados</h4>
                <p>Processos e arquiteturas desenhados para conformidade desde o início. Auditáveis e transparentes.</p>
              </div>
            </div>
            <div className="security-feature">
              <div className="sf-icon"><i className="fas fa-eye"></i></div>
              <div className="sf-content">
                <h4>Arquitetura segura e auditável</h4>
                <p>Logs completos, rastreabilidade de decisões de IA e monitorização contínua de comportamentos anómalos.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
