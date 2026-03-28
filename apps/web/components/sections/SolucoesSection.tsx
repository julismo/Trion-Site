export default function SolucoesSection() {
  return (
    <section className="section" id="solucoes">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Soluções</span>
          <h2 className="section-title">Tudo o que precisa.<br />Nada do que não precisa.</h2>
          <p className="section-subtitle">Três tipos de solução, todos desenvolvidos à medida para o seu negócio, dados e processos específicos.</p>
        </div>

        <div className="solutions-list">
          {/* Solução 01 */}
          <div className="solution-item reveal">
            <div className="solution-number">01</div>
            <div className="solution-content">
              <div className="solution-badge">Agentes de IA</div>
              <h3 className="solution-title">Agentes de IA<br />Personalizados</h3>
              <p className="solution-desc">Agentes inteligentes que automatizam decisões complexas, integrados aos seus dados e processos internos. IA que entende o seu negócio — não genérica.</p>
              <div className="solution-usecases">
                <span className="usecase-tag"><i className="fas fa-comment-alt"></i> Atendimento ao cliente</span>
                <span className="usecase-tag"><i className="fas fa-file-alt"></i> Análise de documentos</span>
                <span className="usecase-tag"><i className="fas fa-headset"></i> Suporte interno</span>
                <span className="usecase-tag"><i className="fas fa-tags"></i> Classificação e triagem</span>
              </div>
              <div className="solution-highlight">
                <i className="fas fa-check-circle"></i>
                <span>IA que aprende com os seus dados, não com dados genéricos</span>
              </div>
            </div>
            <div className="solution-visual">
              <div className="solution-card-visual">
                <div className="visual-header">
                  <div className="visual-dots">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                  </div>
                  <span className="visual-title">Agente de IA — Atendimento</span>
                </div>
                <div className="visual-body">
                  <div className="agent-flow">
                    <div className="agent-step active">
                      <div className="step-icon"><i className="fas fa-inbox"></i></div>
                      <div className="step-info">
                        <span className="step-name">Entrada do pedido</span>
                        <span className="step-status success">✓ Processado</span>
                      </div>
                    </div>
                    <div className="agent-connector"></div>
                    <div className="agent-step active">
                      <div className="step-icon"><i className="fas fa-brain"></i></div>
                      <div className="step-info">
                        <span className="step-name">Classificação automática</span>
                        <span className="step-status success">✓ Alta prioridade</span>
                      </div>
                    </div>
                    <div className="agent-connector"></div>
                    <div className="agent-step">
                      <div className="step-icon"><i className="fas fa-bolt"></i></div>
                      <div className="step-info">
                        <span className="step-name">Ação automática</span>
                        <span className="step-status processing">⟳ Executando...</span>
                      </div>
                    </div>
                  </div>
                  <div className="agent-metric">
                    <span className="metric-label">Tempo médio de resposta</span>
                    <span className="metric-value">1.2s</span>
                    <span className="metric-diff positive">-94% vs. manual</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Solução 02 */}
          <div className="solution-item solution-reverse reveal">
            <div className="solution-number">02</div>
            <div className="solution-content">
              <div className="solution-badge">Automações</div>
              <h3 className="solution-title">Automações Inteligentes<br />de Processos</h3>
              <p className="solution-desc">Elimine tarefas manuais repetitivas com fluxos automatizados que conectam sistemas, dados e pessoas. Menos retrabalho, mais velocidade operacional.</p>
              <div className="solution-usecases">
                <span className="usecase-tag"><i className="fas fa-file-invoice-dollar"></i> Processos financeiros</span>
                <span className="usecase-tag"><i className="fas fa-truck"></i> Operações logísticas</span>
                <span className="usecase-tag"><i className="fas fa-user-check"></i> Onboarding</span>
                <span className="usecase-tag"><i className="fas fa-chart-bar"></i> Relatórios automáticos</span>
              </div>
              <div className="solution-highlight">
                <i className="fas fa-check-circle"></i>
                <span>Conectamos qualquer sistema via APIs, sem reescrever o seu stack</span>
              </div>
            </div>
            <div className="solution-visual">
              <div className="solution-card-visual">
                <div className="visual-header">
                  <div className="visual-dots">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                  </div>
                  <span className="visual-title">Automação — Fluxo Financeiro</span>
                </div>
                <div className="visual-body">
                  <div className="automation-flow">
                    <div className="auto-node">
                      <span className="auto-icon"><i className="fas fa-database"></i></span>
                      <span>ERP</span>
                    </div>
                    <div className="auto-arrow">→</div>
                    <div className="auto-node highlight">
                      <span className="auto-icon"><i className="fas fa-brain"></i></span>
                      <span>IA</span>
                    </div>
                    <div className="auto-arrow">→</div>
                    <div className="auto-node">
                      <span className="auto-icon"><i className="fas fa-check"></i></span>
                      <span>CRM</span>
                    </div>
                  </div>
                  <div className="auto-stats">
                    <div className="auto-stat">
                      <span className="auto-stat-num">70%</span>
                      <span className="auto-stat-label">menos tempo</span>
                    </div>
                    <div className="auto-stat">
                      <span className="auto-stat-num">0</span>
                      <span className="auto-stat-label">erros manuais</span>
                    </div>
                    <div className="auto-stat">
                      <span className="auto-stat-num">24/7</span>
                      <span className="auto-stat-label">operação</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Solução 03 */}
          <div className="solution-item reveal">
            <div className="solution-number">03</div>
            <div className="solution-content">
              <div className="solution-badge">Software Sob Medida</div>
              <h3 className="solution-title">Software Sob Medida<br />com IA</h3>
              <p className="solution-desc">Desenvolvimento de aplicações à medida com inteligência artificial incorporada — desenhadas para o seu contexto, dados e fluxos de trabalho específicos.</p>
              <div className="solution-usecases">
                <span className="usecase-tag"><i className="fas fa-tachometer-alt"></i> Dashboards preditivos</span>
                <span className="usecase-tag"><i className="fas fa-layer-group"></i> Plataformas de gestão</span>
                <span className="usecase-tag"><i className="fas fa-search"></i> Ferramentas de análise</span>
                <span className="usecase-tag"><i className="fas fa-robot"></i> Copilots internos</span>
              </div>
              <div className="solution-highlight">
                <i className="fas fa-check-circle"></i>
                <span>Tecnologia que se adapta à sua empresa — não o contrário</span>
              </div>
            </div>
            <div className="solution-visual">
              <div className="solution-card-visual">
                <div className="visual-header">
                  <div className="visual-dots">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                  </div>
                  <span className="visual-title">Dashboard Preditivo</span>
                </div>
                <div className="visual-body">
                  <div className="dashboard-preview">
                    <div className="dash-metric">
                      <span className="dash-label">Previsão de demanda</span>
                      <span className="dash-value">+12%</span>
                      <div className="dash-bar">
                        <div className="dash-bar-fill" style={{ width: '72%' }}></div>
                      </div>
                    </div>
                    <div className="dash-metric">
                      <span className="dash-label">Eficiência operacional</span>
                      <span className="dash-value">94%</span>
                      <div className="dash-bar">
                        <div className="dash-bar-fill" style={{ width: '94%' }}></div>
                      </div>
                    </div>
                    <div className="dash-metric">
                      <span className="dash-label">Redução de custos</span>
                      <span className="dash-value">-35%</span>
                      <div className="dash-bar">
                        <div className="dash-bar-fill" style={{ width: '55%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="solution-disclaimer reveal">
          <div className="disclaimer-inner">
            <i className="fas fa-shield-alt"></i>
            <span>Sem dependência de licenças proprietárias. <strong>Flexibilidade total. Controlo dos seus dados.</strong></span>
          </div>
        </div>
      </div>
    </section>
  )
}
