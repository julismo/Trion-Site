'use client'

/**
 * Registo central dos plugins GSAP.
 * Importar SEMPRE deste ficheiro — nunca do `gsap` directamente.
 *
 * Os plugins SplitText e ScrollSmoother passaram a 100% gratuitos em 2025.
 * `useGSAP` (hook React) faz cleanup automático ao desmontar — sem memory leaks.
 *
 * Guard `typeof window` evita erro durante o SSR (registerPlugin toca em window).
 */

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, useGSAP)
}

export { gsap, ScrollTrigger, ScrollSmoother, SplitText, useGSAP }
