import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const transitionVariants = {
  item: {
    hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
    },
  },
}
