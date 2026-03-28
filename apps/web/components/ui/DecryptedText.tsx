'use client'
import { useEffect, useRef, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&'

interface DecryptedTextProps {
  text: string
  speed?: number
  className?: string
  revealDelay?: number
}

export default function DecryptedText({
  text,
  speed = 60,
  className = '',
  revealDelay = 0,
}: DecryptedTextProps) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const timeout = setTimeout(() => {
      let index = 0
      const interval = setInterval(() => {
        setDisplayed(
          text.slice(0, index) +
          Array.from({ length: text.length - index }, () =>
            CHARS[Math.floor(Math.random() * CHARS.length)]
          ).join('')
        )
        index++
        if (index > text.length) { setDisplayed(text); clearInterval(interval) }
      }, speed)
      return () => clearInterval(interval)
    }, revealDelay)
    return () => clearTimeout(timeout)
  }, [started, text, speed, revealDelay])

  return (
    <span ref={ref} className={className}>
      {displayed || text.replace(/./g, '\u00A0')}
    </span>
  )
}
