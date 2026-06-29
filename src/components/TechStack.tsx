"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  SiSpring,
  SiPostgresql,
  SiAmazonwebservices,
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiFramer,
  SiMongodb,
  SiDocker,
  SiGit,
  SiVite,
  SiJavascript,
  SiPython,
  SiExpress,
  SiGraphql,
  SiVercel,
  SiFigma,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { TbBrandThreejs } from "react-icons/tb";

const techs = [
  { icon: <FaJava size={20} />,              label: "Java 21",       color: "#f89820" },
  { icon: <SiSpring size={20} />,            label: "Spring Boot",   color: "#6db33f" },
  { icon: <SiPostgresql size={20} />,        label: "PostgreSQL",    color: "#336791" },
  { icon: <SiAmazonwebservices size={20} />, label: "AWS",           color: "#ff9900" },
  { icon: <SiReact size={20} />,             label: "React",         color: "#61dafb" },
  { icon: <SiTypescript size={20} />,        label: "TypeScript",    color: "#3178c6" },
  { icon: <SiNextdotjs size={20} />,         label: "Next.js",       color: "#000000" },
  { icon: <SiTailwindcss size={20} />,       label: "Tailwind CSS",  color: "#38bdf8" },
  { icon: <SiFramer size={20} />,            label: "Framer Motion", color: "#0055ff" },
  { icon: <TbBrandThreejs size={20} />,      label: "Three.js",      color: "#000000" },
  { icon: <SiExpress size={20} />,           label: "Express",       color: "#000000" },
  { icon: <SiMongodb size={20} />,           label: "MongoDB",       color: "#47a248" },
  { icon: <SiDocker size={20} />,            label: "Docker",        color: "#2496ed" },
  { icon: <SiGit size={20} />,               label: "Git",           color: "#f05032" },
  { icon: <SiVite size={20} />,              label: "Vite",          color: "#646cff" },
  { icon: <SiJavascript size={20} />,        label: "JavaScript",    color: "#f7df1e" },
  { icon: <SiPython size={20} />,            label: "Python",        color: "#3776ab" },
  { icon: <SiGraphql size={20} />,           label: "GraphQL",       color: "#e10098" },
  { icon: <SiVercel size={20} />,            label: "Vercel",        color: "#000000" },
  { icon: <SiFigma size={20} />,             label: "Figma",         color: "#f24e1e" },
];

const row1 = [...techs, ...techs];

function Pill({ icon, label, color }: { icon: React.ReactNode; label: string; color: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "12px",
        padding: "14px 26px",
        borderRadius: "50px",
        border: `1px solid ${hovered ? color : "var(--border)"}`,
        background: hovered ? "var(--secondary)" : "var(--card)",
        backdropFilter: "blur(12px)",
        cursor: "pointer",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        transform: hovered ? "translateY(-4px) scale(1.02)" : "translateY(0) scale(1)",
        boxShadow: hovered 
          ? `0 12px 30px -10px ${color}2a, inset 0 0 10px ${color}10` 
          : "0 4px 20px -12px rgba(0,0,0,0.1)",
        flexShrink: 0,
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          color: color,
          transition: "all 0.4s ease",
          display: "flex",
          alignItems: "center",
          transform: hovered ? "scale(1.1) rotate(4deg)" : "scale(1) rotate(0)",
        }}
      >
        {icon}
      </span>
      <span
        className="transition-colors duration-300"
        style={{
          fontSize: "14px",
          fontWeight: 600,
          color: hovered ? "var(--foreground)" : "var(--muted-foreground)",
          letterSpacing: "0.02em",
        }}
      >
        {label}
      </span>
    </div>
  );
}

function MarqueeRow({
  items,
  duration,
  reverse = false,
}: {
  items: typeof row1;
  duration: number;
  reverse?: boolean;
}) {
  const [paused, setPaused] = useState(false);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        overflow: "hidden",
        maskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
        padding: "10px 0",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "16px",
          width: "max-content",
          animation: `${reverse ? "marquee-reverse" : "marquee"} ${duration}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {items.map((tech, i) => (
          <Pill key={i} icon={tech.icon} label={tech.label} color={tech.color} />
        ))}
      </div>
    </div>
  );
}

export default function TechStack() {
  return (
    <section
      className="bg-background text-foreground transition-colors duration-300 border-b border-border"
      style={{
        padding: "120px 0",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none -translate-y-1/2" />

      {/* Header */}
      <div style={{ maxWidth: "1240px", margin: "0 auto 64px", padding: "0 24px" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p
            className="text-muted-foreground"
            style={{
              fontSize: "11px",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              marginBottom: "16px",
              fontWeight: 700,
            }}
          >
            Technologies &amp; Tools
          </p>

          <h2
            className="text-muted-foreground"
            style={{
              fontSize: "clamp(36px,5vw,60px)",
              fontWeight: 300,
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            My <span className="text-foreground" style={{ fontWeight: 900 }}>Arsenal</span>
          </h2>
        </motion.div>
      </div>

      {/* Row 1 — scrolls right to left */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.15 }}
      >
        <MarqueeRow items={row1} duration={45} />
      </motion.div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
