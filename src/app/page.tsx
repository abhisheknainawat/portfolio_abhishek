import ScrollyCanvas from "@/components/ScrollyCanvas";
import Projects from "@/components/Projects";
import WhatIDo from "@/components/WhatIDo";
import About from "@/components/About";
import Expertise from "@/components/Expertise";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import TechStack from "@/components/TechStack";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#121212]">
      <ScrollyCanvas />
      <Projects />
      <WhatIDo />
      <TechStack />
      <About />
      <Experience />
      <Expertise />
      <Work />
      <Contact />
    </main>
  );
}
