'use client'

/**
 * SmoothScrollProvider — DESACTIVADO (B12 fix).
 *
 * Antes: usava GSAP ScrollSmoother que cria #smooth-wrapper fixed overflow:hidden
 * + #smooth-content com transform para emular scroll smooth. Isto ESCONDIA
 * a scrollbar nativa do browser, o que o user reclamou.
 *
 * Agora: passthrough simples — apenas wraps children + chama ScrollTrigger.refresh()
 * no load (necessário para imagens lazy). Scroll nativo do browser, scrollbar
 * visível, smooth-scroll via CSS html { scroll-behavior: smooth } se desejado.
 *
 * HeroTransition + outras animações ScrollTrigger pinned continuam a funcionar
 * com scroll nativo (ScrollTrigger usa window scroll por defeito).
 */

import { useEffect } from 'react'

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const onLoad = () => {
      // Recalcular ScrollTrigger triggers quando imagens lazy carregarem
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        ScrollTrigger.refresh()
      })
    }
    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [])

  return <>{children}</>
}
