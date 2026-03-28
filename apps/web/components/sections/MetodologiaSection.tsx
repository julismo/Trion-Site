export default function MetodologiaSection() {
  return (
    <section className="section section-alt" id="como-trabalhamos">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Metodologia</span>
          <h2 className="section-title">Cinco passos.<br />Resultados mensuráveis.</h2>
          <p className="section-subtitle">Da primeira conversa à produção — uma metodologia clara, transparente e orientada a impacto real.</p>
        </div>

        <div className="process-wrapper">
          <div className="process-steps">
            <div className="process-step reveal" data-step="1">
              <div className="process-step-num">01</div>
              <div className="process-step-body">
                <div className="process-icon"><i className="fas fa-search"></i></div>
                <h3 className="process-step-title">Diagnóstico</h3>
                <p className="process-step-desc">Analisamos os seus processos, dados e oportunidades de IA. Identificamos onde o impacto é maior e mais rápido.</p>
                <div className="process-step-output">
                  <span className="output-label">Entregável:</span>
                  <span className="output-value">Mapa de oportunidades com estimativas de ROI</span>
                </div>
              </div>
            </div>
            <div className="process-connector"></div>
            <div className="process-step reveal" data-step="2">
              <div className="process-step-num">02</div>
              <div className="process-step-body">
                <div className="process-icon"><i className="fas fa-drafting-compass"></i></div>
                <h3 className="process-step-title">Desenho de Solução</h3>
                <p className="process-step-desc">Definimos a arquitetura, integrações necessárias e KPIs de sucesso. Sem surpresas no caminho.</p>
                <div className="process-step-output">
                  <span className="output-label">Entregável:</span>
                  <span className="output-value">Blueprint técnico e plano de projeto</span>
                </div>
              </div>
            </div>
            <div className="process-connector"></div>
            <div className="process-step reveal" data-step="3">
              <div className="process-step-num">03</div>
              <div className="process-step-body">
                <div className="process-icon"><i className="fas fa-flask"></i></div>
                <h3 className="process-step-title">Prototipagem e Validação</h3>
                <p className="process-step-desc">Construímos um protótipo funcional para validar hipóteses com a sua equipa antes do investimento total.</p>
                <div className="process-step-output">
                  <span className="output-label">Entregável:</span>
                  <span className="output-value">Protótipo validado com métricas iniciais</span>
                </div>
              </div>
            </div>
            <div className="process-connector"></div>
            <div className="process-step reveal" data-step="4">
              <div className="process-step-num">04</div>
              <div className="process-step-body">
                <div className="process-icon"><i className="fas fa-rocket"></i></div>
                <h3 className="process-step-title">Implementação em Produção</h3>
                <p className="process-step-desc">Integramos ao stack existente com segurança, governança e suporte total à mudança para a sua equipa.</p>
                <div className="process-step-output">
                  <span className="output-label">Entregável:</span>
                  <span className="output-value">Solução em produção com monitorização activa</span>
                </div>
              </div>
            </div>
            <div className="process-connector"></div>
            <div className="process-step reveal" data-step="5">
              <div className="process-step-num">05</div>
              <div className="process-step-body">
                <div className="process-icon"><i className="fas fa-sync-alt"></i></div>
                <h3 className="process-step-title">Melhoria Contínua</h3>
                <p className="process-step-desc">Monitorizamos, otimizamos e evoluímos a solução com base em dados reais. IA que melhora com o tempo.</p>
                <div className="process-step-output">
                  <span className="output-label">Entregável:</span>
                  <span className="output-value">Relatórios mensais de performance e evolução</span>
                </div>
              </div>
            </div>
          </div>

          <div className="process-code-block reveal">
            <div className="code-header">
              <div className="visual-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <span className="code-filename">trion.workflow.ts</span>
            </div>
            <pre className="code-content"><code><span className="code-comment">{'// Metodologia Trion Scale'}</span>{'\n'}<span className="code-keyword">const</span> <span className="code-var">projeto</span> = <span className="code-fn">trionScale</span>.<span className="code-fn">iniciar</span>{'({'}{'\n'}  <span className="code-prop">fase1</span>: <span className="code-str">{'\'diagnostico\''}</span>,{'\n'}  <span className="code-prop">fase2</span>: <span className="code-str">{'\'desenho\''}</span>,{'\n'}  <span className="code-prop">fase3</span>: <span className="code-str">{'\'prototipagem\''}</span>,{'\n'}  <span className="code-prop">fase4</span>: <span className="code-str">{'\'producao\''}</span>,{'\n'}  <span className="code-prop">fase5</span>: <span className="code-str">{'\'melhoria_continua\''}</span>,{'\n'}  <span className="code-prop">licencas</span>: <span className="code-bool">false</span>,{'\n'}  <span className="code-prop">lockIn</span>: <span className="code-bool">false</span>,{'\n'}  <span className="code-prop">roi</span>: <span className="code-str">{'\'mensuravel\''}</span>{'\n'}{')'}{'\n'}{'\n'}<span className="code-comment">{'// Resultado garantido'}</span>{'\n'}<span className="code-keyword">await</span> <span className="code-var">projeto</span>.<span className="code-fn">executar</span>(){'\n'}<span className="code-comment">{'// ✓ Em produção — 87 dias'}</span></code></pre>
          </div>
        </div>
      </div>
    </section>
  )
}
