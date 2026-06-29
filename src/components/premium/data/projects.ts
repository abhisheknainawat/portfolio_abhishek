export const DEFAULT_HERO_TITLE = 'PROJECTS'

export const projects = [
  {
    title: 'Aether OS',
    displayTitle: 'AETHER OS',
    category: 'Product Design',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&q=80',
    color: 'from-blue-500/20 to-cyan-500/5',
  },
  {
    title: 'Monolith',
    displayTitle: 'MONOLITH',
    category: 'Brand Identity',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1200&q=80',
    color: 'from-violet-500/20 to-purple-500/5',
  },
  {
    title: 'Solstice',
    displayTitle: 'SOLSTICE',
    category: 'Campaign Film',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4eef7?w=1200&q=80',
    color: 'from-orange-500/20 to-amber-500/5',
  },
  {
    title: 'Nexus',
    displayTitle: 'NEXUS',
    category: 'Web Experience',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1200&q=80',
    color: 'from-emerald-500/20 to-teal-500/5',
  },
] as const

export type Project = (typeof projects)[number]
