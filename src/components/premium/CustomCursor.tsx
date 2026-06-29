"use client";

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function CustomCursor() {
  const blobRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) return

    const blob = blobRef.current
    const icon = iconRef.current
    if (!blob || !icon) return

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const target = { x: pos.x, y: pos.y }
    let mode: 'default' | 'hero' | 'gallery' | 'link' = 'default'

    gsap.set(blob, { x: pos.x, y: pos.y, xPercent: -50, yPercent: -50 })
    gsap.set(icon, { opacity: 0, scale: 0.5 })

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX
      target.y = e.clientY
    }

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.12
      pos.y += (target.y - pos.y) * 0.12
      gsap.set(blob, { x: pos.x, y: pos.y })
    }

    gsap.ticker.add(tick)

    const setMode = (next: typeof mode) => {
      if (mode === next) return
      mode = next

      if (next === 'hero') {
        gsap.to(blob, {
          width: 72,
          height: 72,
          backgroundColor: '#ff3b3b',
          duration: 0.4,
          ease: 'power3.out',
        })
        gsap.to(icon, { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(2)' })
      } else if (next === 'gallery') {
        gsap.to(blob, {
          width: 48,
          height: 48,
          backgroundColor: '#ff3b3b',
          duration: 0.35,
          ease: 'power3.out',
        })
        gsap.to(icon, { opacity: 0, scale: 0.5, duration: 0.25 })
      } else if (next === 'link') {
        gsap.to(blob, {
          width: 56,
          height: 56,
          backgroundColor: '#ff3b3b',
          duration: 0.35,
          ease: 'power3.out',
        })
        gsap.to(icon, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)' })
      } else {
        gsap.to(blob, {
          width: 16,
          height: 16,
          backgroundColor: '#ff3b3b',
          duration: 0.4,
          ease: 'power3.out',
        })
        gsap.to(icon, { opacity: 0, scale: 0.5, duration: 0.25 })
      }
    }

    const listeners: Array<{
      el: Element
      enter: () => void
      leave: () => void
    }> = []

    const bind = (selector: string, enter: typeof mode, leave: typeof mode = 'default') => {
      document.querySelectorAll(selector).forEach((el) => {
        const onEnter = () => setMode(enter)
        const onLeave = () => setMode(leave)
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
        listeners.push({ el, enter: onEnter, leave: onLeave })
      })
    }

    window.addEventListener('mousemove', onMove)

    bind('[data-cursor="hero"]', 'hero')
    bind('[data-cursor="gallery"]', 'gallery')
    bind('a, button, [data-cursor="hover"]', 'link')

    return () => {
      window.removeEventListener('mousemove', onMove)
      gsap.ticker.remove(tick)
      listeners.forEach(({ el, enter, leave }) => {
        el.removeEventListener('mouseenter', enter)
        el.removeEventListener('mouseleave', leave)
      })
    }
  }, [])

  return (
    <div
      ref={blobRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden h-4 w-4 items-center justify-center rounded-full bg-[#ff3b3b] md:flex"
      aria-hidden
    >
      <span ref={iconRef} className="text-sm leading-none text-white">
        ↗
      </span>
    </div>
  )
}
