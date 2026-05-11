"use client";

import { motion } from "framer-motion";

const PROJECTS = [
  {
    id: 1,
    title: "Dental Web Amber",
    category: "Web App",
    description: "A comprehensive dental clinic management and booking platform.",
    link: "https://dental-web-amber.vercel.app/",
    image: "https://image.thum.io/get/width/800/crop/600/https://dental-web-amber.vercel.app/",
  },
  {
    id: 2,
    title: "Liveblocks Collab",
    category: "Real-time App",
    description: "A real-time collaborative workspace using Liveblocks.",
    link: "https://liveblock-abhi.vercel.app/",
    image: "https://image.thum.io/get/width/800/crop/600/https://liveblock-abhi.vercel.app/",
  },
  {
    id: 3,
    title: "All Services Platform",
    category: "Service Platform",
    description: "A multi-service booking and provider platform.",
    link: "https://all-services1.vercel.app/",
    image: "https://image.thum.io/get/width/800/crop/600/https://all-services1.vercel.app/",
  },
  {
    id: 4,
    title: "3D Interactive Portfolio",
    category: "3D Experience",
    description: "An interactive 3D web experience built with modern web technologies.",
    link: "https://abhishek-3d-website.netlify.app/",
    image: "https://image.thum.io/get/width/800/crop/600/https://abhishek-3d-website.netlify.app/",
  },
];

export default function Projects() {
  return (
    <section className="min-h-screen bg-[#121212] py-32 px-8 md:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Selected Works
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl">
            A showcase of recent projects blending aesthetic design with robust engineering.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {PROJECTS.map((project, index) => (
            <motion.a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group glass-card overflow-hidden cursor-pointer flex flex-col block"
            >
              <div className="relative h-64 md:h-80 w-full overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <span className="text-sm font-medium tracking-widest text-emerald-400 uppercase mb-3">
                  {project.category}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {project.title}
                </h3>
                <p className="text-gray-400 line-clamp-2 mt-auto">
                  {project.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
