"use client";

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextReveal } from './TextReveal'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '12+', label: 'Years experience' },
  { value: '80+', label: 'Projects shipped' },
  { value: '24', label: 'Awards won' },
]

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const marquee = marqueeRef.current
    if (!section || !marquee) return

    const ctx = gsap.context(() => {
      gsap.from('.about-stat', {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-stats',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.to(marquee, {
        xPercent: -50,
        ease: 'none',
        duration: 20,
        repeat: -1,
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="relative z-10 overflow-hidden px-6 py-32 md:px-12 md:py-40">
      <div className="grid gap-16 md:grid-cols-2 md:gap-24">
        <div>
          <TextReveal
            as="h2"
            text="Design with intention."
            splitBy="words"
            className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.03em] text-white"
          />
          <p className="mt-8 text-lg leading-relaxed text-white/50">
            I partner with ambitious brands to shape products, campaigns, and digital worlds that
            feel inevitable — quiet when they need to be, bold when it matters.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-white/50">
            From kinetic type systems to scroll-native storytelling, every frame is considered.
            Every transition earns its place.
          </p>
        </div>

        <div className="about-stats grid grid-cols-3 gap-6 border-t border-white/10 pt-10 md:border-t-0 md:pt-0">
          {stats.map((stat) => (
            <div key={stat.label} className="about-stat">
              <p className="text-3xl font-semibold text-white md:text-4xl">{stat.value}</p>
              <p className="mt-2 text-xs tracking-wide text-white/40 uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mt-32 overflow-hidden border-y border-white/10 py-8">
        <div ref={marqueeRef} className="flex w-max gap-12 whitespace-nowrap">
          {[...Array(2)].map((_, copy) => (
            <div key={copy} className="flex gap-12">
              {['Motion', 'Typography', 'Brand', 'Product', 'Film', 'Web'].map((word) => (
                <span
                  key={`${copy}-${word}`}
                  className="text-[clamp(3rem,10vw,7rem)] font-semibold tracking-[-0.04em] text-white/10 uppercase"
                >
                  {word}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
