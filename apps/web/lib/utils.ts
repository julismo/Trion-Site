import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * cn() — combina classes Tailwind com merge inteligente.
 * `clsx` resolve condicionais (booleanos, undefined, arrays).
 * `twMerge` deduplica conflitos (ex: "px-2 px-4" → "px-4").
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
