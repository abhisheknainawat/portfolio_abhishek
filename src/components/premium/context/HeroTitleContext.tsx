"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { DEFAULT_HERO_TITLE } from '../data/projects'

type HeroTitleContextValue = {
  displayText: string
  isProjectHover: boolean
  heroVisible: boolean
  setHoveredProject: (title: string | null) => void
  setHeroVisible: (visible: boolean) => void
}

const HeroTitleContext = createContext<HeroTitleContextValue | null>(null)

export function HeroTitleProvider({ children }: { children: ReactNode }) {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [heroVisible, setHeroVisible] = useState(true)

  const value = useMemo(
    () => ({
      displayText: hoveredProject ?? DEFAULT_HERO_TITLE,
      isProjectHover: hoveredProject !== null,
      heroVisible,
      setHoveredProject,
      setHeroVisible,
    }),
    [hoveredProject, heroVisible],
  )

  return <HeroTitleContext.Provider value={value}>{children}</HeroTitleContext.Provider>
}

export function useHeroTitle() {
  const context = useContext(HeroTitleContext)
  if (!context) {
    throw new Error('useHeroTitle must be used within HeroTitleProvider')
  }
  return context
}
