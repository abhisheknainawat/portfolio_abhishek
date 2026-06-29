"use client";

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const images = [
  {
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
    alt: 'Portrait in soft light',
  },
  {
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    alt: 'Editorial portrait',
  },
  {
    src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80',
    alt: 'Fashion portrait',
  },
  {
    src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&q=80',
    alt: 'Desert road journey',
  },
  {
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
    alt: 'Mountain landscape',
  },
  {
    src: 'https://images.unsplash.com/photo-1550684848-fac1c5b4eef7?w=400&q=80',
    alt: 'Neon abstract light',
  },
  {
    src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80',
    alt: 'Studio fashion shot',
  },
  {
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    alt: 'Close portrait',
  },
  {
    src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80',
    alt: 'Warm portrait',
  },
  {
    src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80',
    alt: 'Moody portrait',
  },
]

type ImageStripProps = {
  onHoverChange?: (index: number | null) => void
}

export function ImageStrip({ onHoverChange }: ImageStripProps) {
  const stripRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(0)

  useEffect(() => {
    const strip = stripRef.current
    if (!strip) return

    const items = strip.querySelectorAll('.strip-item')

    const ctx = gsap.context(() => {
      gsap.from(items, {
        y: 40,
        opacity: 0,
        scale: 0.6,
        stagger: 0.06,
        duration: 0.9,
        ease: 'back.out(1.4)',
        delay: 0.15,
      })

      items.forEach((item, i) => {
        gsap.to(item, {
          y: i % 2 === 0 ? -6 : 6,
          duration: 2 + i * 0.15,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.1,
        })
      })
    }, strip)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const strip = stripRef.current
    if (!strip) return

    const items = strip.querySelectorAll('.strip-item')

    items.forEach((item, i) => {
      const isActive = activeIndex === i
      gsap.to(item, {
        scale: isActive ? 1.55 : 1,
        duration: 0.5,
        ease: 'power3.out',
      })
    })
  }, [activeIndex])

  const handleEnter = (index: number) => {
    setActiveIndex(index)
    onHoverChange?.(index)
  }

  const handleLeave = () => {
    setActiveIndex(0)
    onHoverChange?.(null)
  }

  return (
    <div
      ref={stripRef}
      className="mb-6 flex items-end justify-center gap-2 md:mb-8 md:gap-3"
      onMouseLeave={handleLeave}
    >
      {images.map((image, index) => (
        <button
          key={image.src}
          type="button"
          data-cursor="gallery"
          className="strip-item relative shrink-0 overflow-hidden rounded-xl md:rounded-2xl"
          onMouseEnter={() => handleEnter(index)}
          onFocus={() => handleEnter(index)}
          aria-label={image.alt}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="h-12 w-12 object-cover md:h-14 md:w-14"
            draggable={false}
          />
        </button>
      ))}
    </div>
  )
}
