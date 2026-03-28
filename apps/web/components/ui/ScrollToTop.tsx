'use client'
import { useEffect, useState } from 'react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      className={`scroll-top${visible ? ' visible' : ''}`}
      id="scrollTopBtn"
      aria-label="Voltar ao topo"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <i className="fas fa-arrow-up"></i>
    </button>
  )
}
