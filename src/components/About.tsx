"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="relative min-h-[80vh] bg-background text-foreground transition-colors duration-300 py-32 px-6 md:px-24 flex flex-col justify-center overflow-hidden border-b border-white/[0.04]">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Vintage Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-[28px] overflow-hidden border dark:border-white/[0.08] border-black/[0.08] shadow-2xl aspect-[4/3] lg:aspect-[1/1] w-full max-w-[500px] mx-auto group"
          >
            <img
              src="/about_retro.jpg"
              alt="Vintage Retro Computer Setup"
              className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
          </motion.div>

          {/* Right Column: Bio Copy */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            {/* Section Heading */}
            <div className="mb-4">
              <h2 className="text-5xl md:text-6xl font-bold text-foreground flex items-center gap-3">
                About <span className="px-4 py-1.5 rounded-2xl dark:bg-white/10 bg-black/5 text-foreground font-extrabold font-sans border dark:border-white/10 border-black/10 shadow-inner">Me</span>
              </h2>
            </div>

            {/* Paragraphs */}
            <p className="text-lg text-muted-foreground leading-relaxed font-medium">
              I am a <span className="font-semibold text-foreground">Software Engineer Intern</span> at A2BN Pvt. Ltd. and a B.Tech Computer Science (Data Science) student at <span className="font-semibold text-foreground">IPS Academy</span>. I specialize in building robust backend systems, RESTful API design, and full-stack solutions.
            </p>

            <p className="text-base text-muted-foreground leading-relaxed font-medium">
              With hands-on experience as the sole backend developer for a production NEET exam platform, I have built systems supporting Excel bulk uploads, user authorization systems (RBAC), database transaction tracing (PostgreSQL), and cloud storage pipelines (AWS S3).
            </p>

            <p className="text-base text-muted-foreground leading-relaxed font-medium">
              Strongly proficient in <span className="font-semibold text-foreground">Java, Spring Boot, PostgreSQL</span>, and <span className="font-semibold text-foreground">React.js</span>, I care about the craft — clean architecture, robust transactional integrity, database optimization, and high-performance APIs.
            </p>

            <p className="text-base text-muted-foreground leading-relaxed font-medium">
              Currently open to <span className="text-emerald-400 font-semibold">Software Engineering and full-stack roles</span> where I can apply my experience in building secure, production-grade applications.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
