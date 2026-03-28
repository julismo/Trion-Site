'use client'
import { motion } from 'motion/react'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }
  })
}

export default function HeroSection({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <div className="grid-pattern"></div>
        <div className="hero-glow"></div>
      </div>
      <div className="container hero-content">
        <motion.div
          className="hero-badge"
          initial="hidden"
          animate="show"
          custom={0}
          variants={fadeUp}
        >
          <span className="badge-dot"></span>
          <span>IA Aplicada ao Negócio — Sem Licenças Proprietárias</span>
        </motion.div>

        <motion.h1
          className="hero-title"
          initial="hidden"
          animate="show"
          custom={0.1}
          variants={fadeUp}
        >
          Transformamos os processos<br />da sua empresa com<br />
          <span className="gradient-text">IA sob medida</span>
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial="hidden"
          animate="show"
          custom={0.2}
          variants={fadeUp}
        >
          Agentes de IA personalizados, automações inteligentes e software à medida — integrados ao seu stack, sem dependência de licenças.
        </motion.p>

        <motion.div
          className="hero-ctas"
          initial="hidden"
          animate="show"
          custom={0.3}
          variants={fadeUp}
        >
          <button className="btn btn-primary btn-large" onClick={onOpenModal}>
            Agendar Diagnóstico Gratuito
            <i className="fas fa-arrow-right"></i>
          </button>
          <a href="#solucoes" className="btn btn-outline btn-large">
            Ver Soluções
          </a>
        </motion.div>

        <motion.div
          className="metrics-ticker"
          initial="hidden"
          animate="show"
          custom={0.45}
          variants={fadeUp}
        >
          <div className="ticker-track" id="tickerTrack">
            <div className="ticker-item">
              <span className="ticker-number">45%</span>
              <span className="ticker-label">redução de custos operacionais</span>
              <span className="ticker-sector">INDÚSTRIA</span>
            </div>
            <div className="ticker-divider">·</div>
            <div className="ticker-item">
              <span className="ticker-number">3×</span>
              <span className="ticker-label">mais velocidade de processamento</span>
              <span className="ticker-sector">LOGÍSTICA</span>
            </div>
            <div className="ticker-divider">·</div>
            <div className="ticker-item">
              <span className="ticker-number">70%</span>
              <span className="ticker-label">menos erros manuais</span>
              <span className="ticker-sector">SERVIÇOS FINANCEIROS</span>
            </div>
            <div className="ticker-divider">·</div>
            <div className="ticker-item">
              <span className="ticker-number">2×</span>
              <span className="ticker-label">aumento de receita</span>
              <span className="ticker-sector">RETALHO</span>
            </div>
            <div className="ticker-divider">·</div>
            <div className="ticker-item">
              <span className="ticker-number">45%</span>
              <span className="ticker-label">redução de custos operacionais</span>
              <span className="ticker-sector">INDÚSTRIA</span>
            </div>
            <div className="ticker-divider">·</div>
            <div className="ticker-item">
              <span className="ticker-number">3×</span>
              <span className="ticker-label">mais velocidade de processamento</span>
              <span className="ticker-sector">LOGÍSTICA</span>
            </div>
            <div className="ticker-divider">·</div>
            <div className="ticker-item">
              <span className="ticker-number">70%</span>
              <span className="ticker-label">menos erros manuais</span>
              <span className="ticker-sector">SERVIÇOS FINANCEIROS</span>
            </div>
            <div className="ticker-divider">·</div>
            <div className="ticker-item">
              <span className="ticker-number">2×</span>
              <span className="ticker-label">aumento de receita</span>
              <span className="ticker-sector">RETALHO</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
