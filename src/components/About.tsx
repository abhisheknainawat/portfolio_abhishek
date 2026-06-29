"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="relative min-h-[80vh] bg-[#0b0c10] py-32 px-6 md:px-24 flex flex-col justify-center overflow-hidden border-b border-white/[0.04]">
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
            className="relative rounded-[28px] overflow-hidden border border-white/[0.08] shadow-2xl aspect-[4/3] lg:aspect-[1/1] w-full max-w-[500px] mx-auto group"
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
              <h2 className="text-5xl md:text-6xl font-bold text-white flex items-center gap-3">
                About <span className="px-4 py-1.5 rounded-2xl bg-white/10 text-white font-extrabold font-sans border border-white/10 shadow-inner">Me</span>
              </h2>
            </div>

            {/* Paragraphs */}
            <p className="text-lg text-gray-300 leading-relaxed font-medium">
              I am a <span className="font-semibold text-white">Full Stack Engineer</span> and{" "}
              <span className="font-semibold text-white">Creative Developer</span> with{" "}
              <span className="text-indigo-400 font-semibold">7+ years of experience</span> building scalable, high-performance web applications for enterprise and consumer use cases. I bridge the gap between aesthetic design and robust engineering.
            </p>

            <p className="text-base text-gray-400 leading-relaxed font-medium">
              Strong expertise in <span className="font-semibold text-white">React, Angular, TypeScript</span>, and <span className="font-semibold text-white">Node.js</span>, with hands-on experience designing REST APIs, integrating backend services, and improving application performance and reliability.
            </p>

            <p className="text-base text-gray-400 leading-relaxed font-medium">
              Have worked in cross-functional, multicultural teams across <span className="font-semibold text-white">India and the UAE</span>, delivering production-ready applications used by thousands of users. Known for owning features end-to-end, writing clean and maintainable code, and collaborating closely with product and business stakeholders.
            </p>

            <p className="text-base text-gray-400 leading-relaxed font-medium">
              Currently open to <span className="text-emerald-400 font-semibold">senior/lead full-stack roles</span> in UAE or India with a focus on product-driven teams and long-term growth.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
