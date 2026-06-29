"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import gsap from 'gsap'
import { DEFAULT_HERO_TITLE } from './data/projects'

type KineticTitleProps = {
  text: string
  accent?: boolean
  className?: string
}

function animateIn(node: HTMLElement, delay = 0) {
  const chars = node.querySelectorAll('.kinetic-char-inner')
  gsap.killTweensOf(chars)
  gsap.set(chars, { yPercent: -115, opacity: 0 })
  gsap.to(chars, {
    yPercent: 0,
    opacity: 1,
    duration: 0.75,
    ease: 'power4.out',
    stagger: {
      each: 0.045,
      from: 'center',
    },
    delay,
  })
}

function animateOut(node: HTMLElement, onComplete: () => void) {
  const chars = node.querySelectorAll('.kinetic-char-inner')
  gsap.killTweensOf(chars)
  gsap.to(chars, {
    yPercent: -115,
    opacity: 0,
    duration: 0.35,
    ease: 'power3.in',
    stagger: {
      each: 0.04,
      from: 'center',
    },
    onComplete,
  })
}

export const KineticTitle = forwardRef<HTMLHeadingElement, KineticTitleProps>(
  function KineticTitle({ text, accent = false, className = '' }, ref) {
    const innerRef = useRef<HTMLHeadingElement>(null)
    const [renderedText, setRenderedText] = useState(text)
    const pendingText = useRef<string | null>(null)

    useImperativeHandle(ref, () => innerRef.current as HTMLHeadingElement)

    useEffect(() => {
      const node = innerRef.current
      if (!node) return

      if (text === renderedText) return

      pendingText.current = text
      animateOut(node, () => {
        if (pendingText.current !== null) {
          setRenderedText(pendingText.current)
          pendingText.current = null
        }
      })
    }, [text, renderedText])

    useEffect(() => {
      const node = innerRef.current
      if (!node) return
      animateIn(node, renderedText === DEFAULT_HERO_TITLE ? 0.35 : 0)
    }, [renderedText])

    useEffect(() => {
      const node = innerRef.current
      if (!node) return

      gsap.to(node, {
        color: accent ? '#ff3b3b' : '#ffffff',
        duration: 0.4,
        ease: 'power2.out',
      })
    }, [accent])

    return (
      <h1
        ref={innerRef}
        data-cursor="hero"
        className={`font-display flex whitespace-nowrap text-[clamp(4rem,21vw,15rem)] leading-[0.82] tracking-[-0.09em] text-white uppercase select-none ${className}`}
        aria-label={renderedText}
      >
        {renderedText.split('').map((char, index) => (
          <span key={`${renderedText}-${index}`} className="kinetic-char inline-block overflow-hidden">
            <span className="kinetic-char-inner inline-block will-change-transform">
              {char === ' ' ? '\u00A0' : char}
            </span>
          </span>
        ))}
      </h1>
    )
  },
)

export function useKineticParallax(
  containerRef: React.RefObject<HTMLElement | null>,
  titleRef: React.RefObject<HTMLElement | null>,
  enabled = true,
) {
  useEffect(() => {
    if (!enabled) return

    const container = containerRef.current
    const title = titleRef.current
    if (!container || !title) return

    const onMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      const x = (e.clientX / innerWidth - 0.5) * 24
      const y = (e.clientY / innerHeight - 0.5) * 16

      gsap.to(container, { x, y, duration: 1.2, ease: 'power2.out' })

      const letters = title.querySelectorAll('.kinetic-char-inner')
      letters.forEach((letter, i) => {
        const depth = (i - letters.length / 2) * 0.35
        gsap.to(letter, {
          y: (e.clientY / innerHeight - 0.5) * depth * -10,
          duration: 0.7,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      })
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [containerRef, titleRef, enabled])
}
