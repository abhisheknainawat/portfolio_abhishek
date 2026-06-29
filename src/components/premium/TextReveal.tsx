"use client";

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

type TextRevealProps = {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  delay?: number
  splitBy?: 'chars' | 'words' | 'lines'
}

export function TextReveal({
  text,
  className = '',
  as: Tag = 'h2',
  delay = 0,
  splitBy = 'chars',
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const units =
      splitBy === 'words'
        ? text.split(' ')
        : splitBy === 'lines'
          ? text.split('\n')
          : text.split('')

    container.innerHTML = units
      .map((unit, i) => {
        const content = splitBy === 'words' && i < units.length - 1 ? `${unit}&nbsp;` : unit
        return `<span class="inline-block overflow-hidden align-top"><span class="reveal-unit inline-block will-change-transform">${content === ' ' ? '&nbsp;' : content}</span></span>`
      })
      .join(splitBy === 'lines' ? '<br/>' : '')

    const units_el = container.querySelectorAll('.reveal-unit')

    const ctx = gsap.context(() => {
      gsap.set(units_el, { yPercent: 110 })
      gsap.to(units_el, {
        yPercent: 0,
        duration: 1,
        stagger: splitBy === 'chars' ? 0.025 : 0.06,
        ease: 'power4.out',
        delay,
        onStart: () => container.classList.add('ready'),
      })
    }, container)

    return () => ctx.revert()
  }, [text, delay, splitBy])

  return (
    <Tag ref={containerRef as never} className={`${className} opacity-0 [&.ready]:opacity-100`}>
      {text}
    </Tag>
  )
}
