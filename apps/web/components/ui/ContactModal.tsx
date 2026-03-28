'use client'
import { useState, useEffect, FormEvent } from 'react'

const FORMSPREE_URL = 'https://formspree.io/f/xykbzqjg'

export default function ContactModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.checkValidity()) { form.reportValidity(); return }

    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())

    setSubmitting(true)
    setError('')

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          nome: data.nome || '',
          email: data.email || '',
          empresa: data.empresa || '',
          cargo: data.cargo || '',
          interesse: data.interesse || '',
          descricao: data.descricao || '',
          origem: 'website_formulario',
          data_submissao: new Date().toISOString(),
        }),
      })
      if (!res.ok) throw new Error('Falha na resposta do servidor')
      setSuccess(true)
    } catch {
      setError('Ocorreu um erro ao enviar. Por favor, tente novamente.')
      setSubmitting(false)
    }
  }

  const handleClose = () => {
    setSuccess(false)
    setError('')
    setSubmitting(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div
      className="modal-overlay active"
      id="modalOverlay"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose() }}
    >
      <div className="modal" id="contactModal">
        <button className="modal-close" onClick={handleClose} aria-label="Fechar">&times;</button>
        <div className="modal-header">
          <div className="modal-logo">
            <span className="logo-icon">⬡</span>
            <span className="logo-text">Trion<span className="logo-accent">Scale</span></span>
          </div>
          <h2 className="modal-title">Agende o seu Diagnóstico Gratuito</h2>
          <p className="modal-subtitle">Preencha o formulário e a nossa equipa entrará em contacto em até 24 horas.</p>
        </div>

        {!success ? (
          <form className="contact-form" id="contactForm" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nome">Nome *</label>
                <input type="text" id="nome" name="nome" placeholder="O seu nome" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Corporativo *</label>
                <input type="email" id="email" name="email" placeholder="nome@empresa.com" required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="empresa">Empresa *</label>
                <input type="text" id="empresa" name="empresa" placeholder="Nome da empresa" required />
              </div>
              <div className="form-group">
                <label htmlFor="cargo">Cargo *</label>
                <select id="cargo" name="cargo" required defaultValue="">
                  <option value="" disabled>Selecionar cargo</option>
                  <option>COO / Diretor de Operações</option>
                  <option>CIO / Head de IT</option>
                  <option>Diretor de Inovação</option>
                  <option>CEO / Fundador</option>
                  <option>Outro</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="interesse">Área Principal de Interesse *</label>
              <select id="interesse" name="interesse" required defaultValue="">
                <option value="" disabled>Selecionar área</option>
                <option>Agentes de IA Personalizados</option>
                <option>Automações Inteligentes de Processos</option>
                <option>Software Sob Medida com IA</option>
                <option>Diagnóstico Geral de Oportunidades</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="descricao">Breve descrição do desafio ou objetivo</label>
              <textarea id="descricao" name="descricao" placeholder="Descreva em poucas palavras o principal processo ou desafio que quer abordar com IA..." rows={4}></textarea>
            </div>
            {error && (
              <div style={{
                background: '#fee2e2', border: '1px solid #fca5a5', color: '#dc2626',
                padding: '0.75rem 1rem', borderRadius: '0.5rem', fontSize: '0.875rem', marginBottom: '0.5rem'
              }}>{error}</div>
            )}
            <button type="submit" className="btn btn-primary btn-full" disabled={submitting}>
              {submitting
                ? <><i className="fas fa-circle-notch fa-spin"></i> A enviar...</>
                : <>Enviar Pedido <i className="fas fa-arrow-right"></i></>
              }
            </button>
            <p className="form-privacy"><i className="fas fa-lock"></i> Os seus dados estão seguros. Não partilhamos com terceiros.</p>
          </form>
        ) : (
          <div className="form-success visible" id="formSuccess">
            <div className="success-icon"><i className="fas fa-check-circle"></i></div>
            <h3>Pedido enviado com sucesso!</h3>
            <p>Obrigado pelo interesse. A nossa equipa entrará em contacto em até <strong>24 horas</strong> para agendar o seu diagnóstico gratuito.</p>
            <button className="btn btn-primary" onClick={handleClose}>Fechar</button>
          </div>
        )}
      </div>
    </div>
  )
}
