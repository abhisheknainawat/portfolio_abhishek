"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Layers, Workflow, Server, Cloud } from "lucide-react";

const capabilities = [
  {
    icon: Layers,
    iconColor: "#818cf8", // Indigo
    title: "Frontend Architecture",
    description:
      "Designing scalable, maintainable, and high-performance frontend systems for enterprise applications using React, Next.js, and TypeScript.",
  },
  {
    icon: Workflow,
    iconColor: "#34d399", // Emerald/teal
    title: "Full-Stack Development",
    description:
      "Building seamless end-to-end applications with robust Node.js backend services and modern interactive user interfaces.",
  },
  {
    icon: Server,
    iconColor: "#f59e0b", // Amber/yellow
    title: "Backend Development",
    description:
      "Engineering high-performance, secure backend services, RESTful APIs, bulk data pipelines, and database schemas using Java, Spring Boot, and PostgreSQL.",
  },
  {
    icon: Cloud,
    iconColor: "#a855f7", // Violet/purple
    title: "DevOps & Infrastructure",
    description:
      "Configuring automated CI/CD deployment pipelines, managing AWS S3 storage architectures, and containerizing software packages using Git, Docker, and shell scripting.",
  },
];

function CapabilityCard({ item }: { item: typeof capabilities[number] }) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse coords for 3D Tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map to degree values for rotation
  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);

  // Spring animations for smooth tilt returning to normal
  const springConfig = { damping: 22, stiffness: 220, mass: 0.6 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  // Spotlight coordinates (percentage of card dimensions)
  const [spotlightCoords, setSpotlightCoords] = useState({ px: 0, py: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Normalize coordinates: center is (0,0), range is [-0.5, 0.5]
    const relativeX = mouseX / width - 0.5;
    const relativeY = mouseY / height - 0.5;

    x.set(relativeX);
    y.set(relativeY);

    // Update spotlight coords in percentages
    const pctX = Math.round((mouseX / width) * 100);
    const pctY = Math.round((mouseY / height) * 100);
    setSpotlightCoords({ px: pctX, py: pctY });
  };

  const handleMouseLeave = () => {
    // Reset spring to center
    x.set(0);
    y.set(0);
  };

  const Icon = item.icon;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className="group relative rounded-[28px] p-8 md:p-12 dark:bg-white/[0.02] bg-[#f8f9fa] border dark:border-white/[0.06] border-black/[0.06] dark:hover:border-white/[0.15] hover:border-black/[0.15] dark:hover:bg-white/[0.03] hover:bg-black/[0.01] transition-colors duration-500 shadow-2xl flex flex-col items-start gap-6 cursor-pointer overflow-hidden select-none"
    >
      {/* Spotlight highlight tracking the mouse */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(350px circle at ${spotlightCoords.px}% ${spotlightCoords.py}%, rgba(255,255,255,0.06), transparent 70%)`,
        }}
      />

      {/* Radial colored glow tracking the mouse */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-2xl"
        style={{
          background: `radial-gradient(300px circle at ${spotlightCoords.px}% ${spotlightCoords.py}%, ${item.iconColor}07, transparent 80%)`,
        }}
      />

      {/* Icon Container */}
      <div 
        style={{ transform: "translateZ(30px)" }}
        className="p-4 rounded-2xl dark:bg-white/[0.04] bg-black/[0.02] border dark:border-white/[0.08] border-black/[0.08] dark:group-hover:border-white/[0.15] group-hover:border-black/[0.15] dark:group-hover:bg-white/[0.07] group-hover:bg-black/[0.05] transition-all duration-500"
      >
        <Icon
          size={28}
          style={{ color: item.iconColor }}
          className="transition-transform duration-500 group-hover:scale-115 group-hover:rotate-[3deg]"
        />
      </div>

      {/* Content */}
      <div 
        style={{ transform: "translateZ(20px)" }} 
        className="flex flex-col gap-3"
      >
        <h3 className="text-2xl md:text-3xl font-extrabold text-foreground transition-colors">
          {item.title}
        </h3>
        <p className="text-base text-muted-foreground leading-relaxed font-medium transition-colors">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function WhatIDo() {
  return (
    <section id="services" className="relative min-h-[95vh] bg-background text-foreground transition-colors duration-300 py-32 px-6 md:px-24 flex flex-col justify-center overflow-hidden border-b border-white/[0.04]">
      {/* Animated background ambient glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none animate-pulse-slow-reverse" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 flex flex-col items-center"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6 flex items-center justify-center gap-3">
            What I <span className="px-4 py-1 rounded-xl dark:bg-white/10 bg-black/5 text-foreground font-extrabold font-sans hover:bg-black/10 dark:hover:bg-white/15 transition-colors duration-300">Do</span>
          </h2>
          <span className="px-6 py-2 rounded-full border border-white/10 dark:bg-white/5 bg-black/5 text-[11px] font-bold tracking-[0.25em] text-muted-foreground uppercase shadow-sm">
            CORE CAPABILITIES
          </span>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {capabilities.map((item, idx) => (
            <CapabilityCard key={idx} item={item} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.8; transform: translate(0, 0) scale(1); }
          50% { opacity: 1; transform: translate(15px, -15px) scale(1.05); }
        }
        @keyframes pulse-slow-reverse {
          0%, 100% { opacity: 0.8; transform: translate(0, 0) scale(1); }
          50% { opacity: 1; transform: translate(-15px, 15px) scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 12s ease-in-out infinite;
        }
        .animate-pulse-slow-reverse {
          animation: pulse-slow-reverse 15s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
