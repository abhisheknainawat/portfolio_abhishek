"use client";

import { HeroTitleProvider } from "./context/HeroTitleContext";
import { CustomCursor } from "./CustomCursor";
import { Hero } from "./Hero";
import { WorkSection } from "./WorkSection";
import ProjectsSection from "./ProjectsSection";
import { AboutSection } from "./AboutSection";
import { FloatingGallery } from "./FloatingGallery";
import { Footer } from "./Footer";
import { useLenis } from "./hooks/useLenis";

export default function PremiumPortfolioSection() {
  useLenis();

  return (
    <HeroTitleProvider>
      <CustomCursor />
      <div className="relative bg-black text-[#f5f5f7]">
        <Hero />
        <WorkSection />
        <ProjectsSection />
        <AboutSection />
        <FloatingGallery />
        <Footer />
      </div>
    </HeroTitleProvider>
  );
}
