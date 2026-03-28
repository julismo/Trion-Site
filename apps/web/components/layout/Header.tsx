'use client'
import { useEffect, useState } from 'react'

export default function Header({ onOpenModal }: { onOpenModal: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => {
    setMenuOpen(false)
    document.body.style.overflow = ''
  }

  const toggleMenu = () => {
    const next = !menuOpen
    setMenuOpen(next)
    document.body.style.overflow = next ? 'hidden' : ''
  }

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}`} id="header">
      <div className="container header-inner">
        <a href="#" className="logo">
          <span className="logo-icon">⬡</span>
          <span className="logo-text">Trion<span className="logo-accent">Scale</span></span>
        </a>
        <nav className={`nav${menuOpen ? ' open' : ''}`} id="nav">
          <a href="#solucoes" className="nav-link" onClick={closeMenu}>Soluções</a>
          <a href="#como-trabalhamos" className="nav-link" onClick={closeMenu}>Como Trabalhamos</a>
          <a href="#sobre" className="nav-link" onClick={closeMenu}>Sobre</a>
        </nav>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={onOpenModal}>Agendar Diagnóstico</button>
          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            id="hamburger"
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={toggleMenu}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  )
}
