"use client";

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextReveal } from './TextReveal'

gsap.registerPlugin(ScrollTrigger)

export function Footer() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from('.footer-link', {
        y: 24,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <footer id="contact" ref={sectionRef} className="relative z-10 px-6 pb-12 pt-32 md:px-12 md:pb-16">
      <div className="border-t border-white/10 pt-20">
        <TextReveal
          as="h2"
          text="Let's create something remarkable."
          splitBy="words"
          className="max-w-4xl text-balance text-[clamp(2.5rem,7vw,5rem)] font-semibold tracking-[-0.03em] text-white"
        />

        <a
          href="mailto:hello@morgan.studio"
          data-cursor="hover"
          className="footer-link mt-10 inline-block text-2xl text-[#2997ff] transition hover:text-white md:text-3xl"
        >
          hello@morgan.studio
        </a>

        <div className="footer-link mt-20 flex flex-col justify-between gap-6 border-t border-white/10 pt-8 text-sm text-white/35 md:flex-row md:items-center">
          <p>© 2026 Alex Morgan. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" data-cursor="hover" className="transition hover:text-white">
              Instagram
            </a>
            <a href="#" data-cursor="hover" className="transition hover:text-white">
              Dribbble
            </a>
            <a href="#" data-cursor="hover" className="transition hover:text-white">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
