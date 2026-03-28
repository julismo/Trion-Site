export default function Footer({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <footer className="footer" id="footer">
      <div className="container footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#" className="logo">
              <span className="logo-icon">⬡</span>
              <span className="logo-text">Trion<span className="logo-accent">Scale</span></span>
            </a>
            <p className="footer-desc">IA sob medida para empresas que querem resultados reais — sem licenças proprietárias, sem promessas vazias.</p>
            <div className="footer-socials">
              <a href="#" className="social-link" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" className="social-link" aria-label="GitHub"><i className="fab fa-github"></i></a>
            </div>
          </div>
          <div className="footer-nav">
            <div className="footer-col">
              <h5>Soluções</h5>
              <a href="#solucoes">Agentes de IA</a>
              <a href="#solucoes">Automações Inteligentes</a>
              <a href="#solucoes">Software Sob Medida</a>
            </div>
            <div className="footer-col">
              <h5>Empresa</h5>
              <a href="#sobre">Sobre a Trion Scale</a>
            </div>
            <div className="footer-col">
              <h5>Contacto</h5>
              <a href="mailto:contacto@trionscale.com">contacto@trionscale.com</a>
              <a href="#" onClick={(e) => { e.preventDefault(); onOpenModal() }}>Agendar Diagnóstico</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Trion Scale. Todos os direitos reservados.</p>
          <div className="footer-legal">
            <a href="#">Política de Privacidade</a>
            <a href="#">Termos de Utilização</a>
            <a href="#">Gestão de Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
