"use client"

import { useState, useEffect } from "react"
import { FileText, Menu } from "lucide-react"
import { Github, Linkedin } from "@/components/icons"

import { ModeToggle } from "@/components/theme-switch"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolledPastHero, setScrolledPastHero] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      // The hero section (ScrollyCanvas) has a scroll container of 500vh.
      // So the hero section is finished when scrollY is around 400vh to 500vh.
      // Let's say once the user scrolls past 3.8 times the window height, they are past the hero section.
      const threshold = window.innerHeight * 3.8
      setScrolledPastHero(scrollY > threshold)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 transform-gpu bg-transparent border-b border-transparent py-6 ${
          scrolledPastHero
            ? "-translate-y-full opacity-0 pointer-events-none"
            : "translate-y-0 opacity-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-14">
            
            {/* Logo (Left) */}
            <a
              href="#"
              aria-label="home"
              className="flex items-center gap-2 whitespace-nowrap group"
            >
              <span className="text-2xl font-black tracking-widest text-white uppercase transition-all group-hover:text-white/80">
                ABHISHEK.
              </span>
            </a>

            {/* Navigation Links (Center) - Hidden on Mobile */}
            <nav className="hidden md:flex items-center gap-[28px] leading-none">
              {navItems.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="text-[13px] font-semibold tracking-[0.02em] text-white/75 hover:text-white transition-colors duration-200 leading-none flex items-center"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Actions & Socials (Right) - Hidden on Mobile */}
            <div className="hidden md:flex items-center gap-6">
              <a
                href="mailto:abhisheknainawat9@gmail.com?subject=Resume Request - Abhishek Nainawat"
                className="bg-white/5 backdrop-blur-md border border-white/40 hover:bg-white/10 text-white rounded-[20px] px-4 py-1.5 text-[13px] font-medium flex items-center gap-2 transition-all leading-none"
              >
                <FileText className="h-4 w-4 text-white/80" />
                <span>Resume</span>
              </a>
              <a
                href="https://github.com/abhisheknainawat"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/in/abhishek-nainawat"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <ModeToggle />
            </div>

            {/* Mobile Navigation Trigger */}
            <div className="md:hidden flex items-center">
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger render={<Button variant="ghost" size="icon" className="text-white hover:bg-white/10" />}>
                  <Menu className="h-6 w-6" />
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-full bg-[#121212] border-l border-white/10 text-white sm:w-[400px]"
                >
                  <div className="flex flex-col h-full justify-between p-8 mt-12">
                    <nav className="flex flex-col gap-6">
                      {navItems.map((item, idx) => (
                        <a
                          key={idx}
                          href={item.href}
                          className="text-2xl font-semibold text-white/80 hover:text-white transition-colors"
                          onClick={() => setMobileOpen(false)}
                        >
                          {item.label}
                        </a>
                      ))}
                    </nav>
                    <div className="flex flex-col gap-6 border-t border-white/10 pt-8">
                      <a
                        href="mailto:abhisheknainawat9@gmail.com?subject=Resume Request - Abhishek Nainawat"
                        className="bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-full py-3 text-center text-md font-medium flex items-center justify-center gap-2 transition-all"
                        onClick={() => setMobileOpen(false)}
                      >
                        <FileText className="h-5 w-5" />
                        <span>Resume</span>
                      </a>
                      <div className="flex justify-center items-center gap-6 mt-2">
                        <a
                          href="https://github.com/abhisheknainawat"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/60 hover:text-white transition-colors"
                        >
                          <Github className="h-6 w-6" />
                        </a>
                        <a
                          href="https://linkedin.com/in/abhishek-nainawat"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/60 hover:text-white transition-colors"
                        >
                          <Linkedin className="h-6 w-6" />
                        </a>
                        <ModeToggle />
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

          </div>
        </div>
      </header>
    </>
  )
}
