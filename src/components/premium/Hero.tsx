"use client";

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ImageStrip } from './ImageStrip'
import { KineticTitle, useKineticParallax } from './KineticTitle'
import { useHeroTitle } from './context/HeroTitleContext'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const fixedRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [stripHovered, setStripHovered] = useState(false)
  const { displayText, isProjectHover, heroVisible, setHeroVisible, setHoveredProject } =
    useHeroTitle()

  useKineticParallax(contentRef, titleRef, heroVisible)

  useEffect(() => {
    const section = sectionRef.current
    const fixed = fixedRef.current
    const content = contentRef.current
    if (!section || !fixed || !content) return

    const ctx = gsap.context(() => {
      gsap.to(content, {
        y: 80,
        scale: 0.96,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      gsap.to(fixed, {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: '30% top',
          end: 'bottom top',
          scrub: 0.8,
          onLeave: () => {
            setHeroVisible(false)
            setHoveredProject(null)
          },
          onEnterBack: () => setHeroVisible(true),
        },
      })
    }, section)

    return () => ctx.revert()
  }, [setHeroVisible, setHoveredProject])

  const accent = heroVisible && (stripHovered || isProjectHover)

  return (
    <>
      <div
        ref={fixedRef}
        className="pointer-events-none fixed inset-0 z-[1] flex items-center justify-center transition-[visibility] duration-300"
        style={{ visibility: heroVisible ? 'visible' : 'hidden' }}
      >
        <div ref={contentRef} className="flex flex-col items-center will-change-transform">
          <div className={heroVisible ? 'pointer-events-auto' : 'pointer-events-none'}>
            <ImageStrip onHoverChange={(index) => setStripHovered(index !== null)} />
          </div>

          <KineticTitle ref={titleRef} text={displayText} accent={accent} />
        </div>
      </div>

      <section ref={sectionRef} className="relative min-h-screen bg-black" aria-hidden />
    </>
  )
}
