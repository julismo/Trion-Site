'use client'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

interface InfiniteSliderProps {
  items: string[]
  speed?: number
  reverse?: boolean
  className?: string
  itemClassName?: string
}

export function InfiniteSlider({
  items,
  speed = 40,
  reverse = false,
  className,
  itemClassName,
}: InfiniteSliderProps) {
  const duration = `${(items.length * 4000) / speed}s`
  const doubled = [...items, ...items]

  return (
    <div className={cn('overflow-hidden', className)}>
      <div
        className={cn(
          'flex gap-8 w-max',
          reverse ? 'animate-slide-reverse' : 'animate-slide'
        )}
        style={{ animationDuration: duration }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className={cn(
              'text-sm font-mono uppercase tracking-widest whitespace-nowrap px-3 py-1.5 rounded border',
              'text-[var(--muted-foreground)] border-[var(--border)]',
              'hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors duration-200',
              itemClassName
            )}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
