"use client";

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const galleryItems = [
  {
    src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
    alt: 'Abstract gradient sculpture',
    className: 'top-[8%] left-[6%] w-[28vw] max-w-[320px] rotate-[-6deg]',
    speed: 0.8,
  },
  {
    src: 'https://images.unsplash.com/photo-1550684848-fac1c5b4eef7?w=800&q=80',
    alt: 'Neon light installation',
    className: 'top-[18%] right-[8%] w-[22vw] max-w-[260px] rotate-[8deg]',
    speed: 1.2,
  },
  {
    src: 'https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=800&q=80',
    alt: 'Minimal product render',
    className: 'top-[42%] left-[12%] w-[20vw] max-w-[240px] rotate-[4deg]',
    speed: 1.5,
  },
  {
    src: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&q=80',
    alt: 'Liquid metal abstract',
    className: 'top-[55%] right-[14%] w-[26vw] max-w-[300px] rotate-[-5deg]',
    speed: 0.6,
  },
  {
    src: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80',
    alt: 'Glass morphism UI',
    className: 'bottom-[12%] left-[28%] w-[24vw] max-w-[280px] rotate-[3deg]',
    speed: 1.0,
  },
  {
    src: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80',
    alt: '3D gradient orb',
    className: 'bottom-[18%] right-[6%] w-[18vw] max-w-[220px] rotate-[-8deg]',
    speed: 1.3,
  },
]

export function FloatingGallery() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const cards = section.querySelectorAll('.gallery-card')

    const ctx = gsap.context(() => {
      cards.forEach((card) => {
        const speed = Number((card as HTMLElement).dataset.speed) || 1

        gsap.from(card, {
          y: 80,
          opacity: 0,
          scale: 0.92,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        })

        gsap.to(card, {
          y: -120 * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })

        gsap.to(card, {
          rotate: `+=${speed * 3}`,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[140vh] overflow-hidden px-6 py-32 md:px-12"
    >
      <div className="pointer-events-none absolute inset-0">
        {galleryItems.map((item) => (
          <figure
            key={item.src}
            data-speed={item.speed}
            className={`gallery-card absolute overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur-sm ${item.className}`}
          >
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              className="aspect-[4/5] h-full w-full object-cover"
            />
          </figure>
        ))}
      </div>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        <p className="mb-6 text-xs tracking-[0.3em] text-white/40 uppercase">Selected Work</p>
        <h2 className="text-balance text-[clamp(2.5rem,8vw,5.5rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-white">
          Visual stories that float between craft and emotion
        </h2>
      </div>
    </section>
  )
}
