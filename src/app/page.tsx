import ScrollyCanvas from "@/components/ScrollyCanvas";
import Projects from "@/components/Projects";
import WhatIDo from "@/components/WhatIDo";
import About from "@/components/About";
import Experience from "@/components/Experience";
import TechStack from "@/components/TechStack";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <ScrollyCanvas />
      <Projects />
      <WhatIDo />
      <TechStack />
      <About />
      <Experience />
      <Contact />
    </main>
  );
}
