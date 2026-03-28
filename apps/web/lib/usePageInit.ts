'use client'
import { useEffect } from 'react'

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function animateCounter(element: Element) {
  const originalText = element.textContent || ''
  const numMatch = originalText.match(/[\d.]+/)
  if (!numMatch) return

  const target = parseFloat(numMatch[0])
  const prefix = (originalText.match(/^[^0-9]*/) || [''])[0]
  const suffix = (originalText.match(/[^0-9.]*$/) || [''])[0]
  const duration = 1500
  const start = performance.now()

  const update = (timestamp: number) => {
    const elapsed = timestamp - start
    const progress = Math.min(elapsed / duration, 1)
    const eased = easeOutCubic(progress)
    const current = Math.round(eased * target * 10) / 10

    element.textContent = prefix + (Number.isInteger(target) ? Math.round(current) : current) + suffix

    if (progress < 1) {
      requestAnimationFrame(update)
    } else {
      element.textContent = originalText
    }
  }

  requestAnimationFrame(update)
}

export function usePageInit() {
  // Reveal on scroll (IntersectionObserver)
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal')
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const parent = entry.target.closest('.personas-grid, .cases-grid, .resources-grid')
            const delay = parent
              ? Array.from(parent.querySelectorAll('.reveal')).indexOf(entry.target as Element) * 120
              : 0
            setTimeout(() => entry.target.classList.add('visible'), delay)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )

    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Animated counters
  useEffect(() => {
    const counters = document.querySelectorAll('.result-num, .ticker-number')
    if (!counters.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 }
    )

    counters.forEach(counter => observer.observe(counter))
    return () => observer.disconnect()
  }, [])

  // Smooth scroll for anchor links
  useEffect(() => {
    const handleClick = (e: Event) => {
      const anchor = (e.target as Element).closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (!href || href === '#') return
      const target = document.querySelector(href)
      if (!target) return

      e.preventDefault()
      const headerHeight = document.getElementById('header')?.offsetHeight || 72
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16
      window.scrollTo({ top: targetTop, behavior: 'smooth' })
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  // Active nav link on scroll
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const navLinks = document.querySelectorAll('.nav-link')
    if (!sections.length || !navLinks.length) return

    const headerHeight = document.getElementById('header')?.offsetHeight || 72

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id')
            navLinks.forEach(link => {
              link.classList.toggle('active', link.getAttribute('href') === `#${id}`)
            })
          }
        })
      },
      {
        threshold: 0.3,
        rootMargin: `-${headerHeight}px 0px -60% 0px`
      }
    )

    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  // Process steps progressive reveal
  useEffect(() => {
    const steps = document.querySelectorAll('.process-step')
    if (!steps.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const stepNum = parseInt(el.dataset.step || '1')
            setTimeout(() => {
              el.style.opacity = '1'
              el.style.transform = 'translateX(0)'
            }, (stepNum - 1) * 150)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    steps.forEach(step => {
      const el = step as HTMLElement
      el.style.opacity = '0'
      el.style.transform = 'translateX(-20px)'
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease'
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // Ticker pause on hover
  useEffect(() => {
    const ticker = document.querySelector('.ticker-track') as HTMLElement | null
    if (!ticker) return
    const pause = () => { ticker.style.animationPlayState = 'paused' }
    const play = () => { ticker.style.animationPlayState = 'running' }
    ticker.addEventListener('mouseenter', pause)
    ticker.addEventListener('mouseleave', play)
    return () => {
      ticker.removeEventListener('mouseenter', pause)
      ticker.removeEventListener('mouseleave', play)
    }
  }, [])

  // CTA analytics tracking
  useEffect(() => {
    const handleTrack = (e: Event) => {
      const btn = (e.target as Element).closest('[data-track]') as HTMLElement | null
      if (btn) {
        console.log('[Analytics] cta_click', { label: btn.dataset.track })
      }
    }
    document.addEventListener('click', handleTrack)
    return () => document.removeEventListener('click', handleTrack)
  }, [])
}
