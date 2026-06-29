"use client";

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from './data/projects'
import { useHeroTitle } from './context/HeroTitleContext'

gsap.registerPlugin(ScrollTrigger)

export function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { setHoveredProject, heroVisible } = useHeroTitle()

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from(section, {
        opacity: 0,
        y: 48,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.utils.toArray<HTMLElement>('.project-row').forEach((row) => {
        const image = row.querySelector('.project-image')
        const content = row.querySelector('.project-content')

        gsap.from(content, {
          x: -40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        })

        gsap.from(image, {
          scale: 1.08,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        })

        gsap.to(image, {
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: row,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    }, section)

    return () => ctx.revert()
  }, [])

  const handleHover = (displayTitle: string | null) => {
    if (!heroVisible) return
    setHoveredProject(displayTitle)
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative z-10 min-h-screen bg-black px-6 py-24 md:px-12 md:py-32"
    >
      <div className="flex flex-col gap-24 md:gap-32">
        {projects.map((project, index) => (
          <article
            key={project.title}
            data-cursor="hover"
            className="project-row group grid cursor-none items-center gap-8 md:grid-cols-2 md:gap-16"
            onMouseEnter={() => handleHover(project.displayTitle)}
            onMouseLeave={() => handleHover(null)}
            onFocus={() => handleHover(project.displayTitle)}
            onBlur={() => handleHover(null)}
          >
            <div className={`project-content ${index % 2 === 1 ? 'md:order-2' : ''}`}>
              <p className="mb-3 text-xs tracking-[0.2em] text-white/35 uppercase">
                {project.category} · {project.year}
              </p>
              <h3 className="text-4xl font-semibold tracking-[-0.02em] text-white transition-colors group-hover:text-[#ff3b3b] md:text-5xl">
                {project.title}
              </h3>
              <p className="mt-4 text-sm text-white/40">View case study →</p>
            </div>

            <div
              className={`project-image relative overflow-hidden rounded-3xl border border-white/10 bg-black/60 backdrop-blur-sm ${index % 2 === 1 ? 'md:order-1' : ''}`}
            >
              <div
                className={`absolute inset-0 z-10 bg-gradient-to-br ${project.color} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
              />
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
