"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar } from "lucide-react";

const items = [
  {
    role: "Full Stack Engineer",
    company: "Lloyds Technology Centre India",
    location: "Hyderabad, Telangana, India · On-site",
    date: "JUN 2025 - PRESENT",
    points: [
      "Designed and developed scalable, user-facing web applications using React, TypeScript, and modern frontend architectures, ensuring high performance, accessibility, and maintainability.",
      "Collaborated closely with backend engineers, product managers, and QA teams to deliver end-to-end features aligned with business and compliance requirements.",
      "Improved frontend performance and stability by optimising component rendering, state management, and API integrations, reducing UI-related production issues.",
      "Played a key role in feature ownership, from requirement analysis and technical design to implementation, testing, and deployment.",
      "Conducted code reviews, enforced frontend best practices, and ensured adherence to enterprise coding standards.",
      "Mentored junior developers, providing technical guidance and helping improve overall team productivity and code quality.",
      "Worked within Agile/Scrum environments, actively contributing to sprint planning, estimations, and release cycles.",
    ],
  },
  {
    role: "Senior Software Engineer",
    company: "Innovatech Technology Solutions",
    location: "Abu Dhabi Emirate, United Arab Emirates · On-site",
    date: "JUL 2022 - JUN 2025",
    points: [
      "Built and maintained web applications using React, Angular, TypeScript, Node.js, and backend services, supporting business-critical workflows for enterprise clients.",
      "Worked directly with UAE-based stakeholders and cross-functional teams, translating business requirements into scalable technical solutions.",
      "Led frontend architecture decisions, ensuring reusable components, consistent UI patterns, and clean integration with backend APIs.",
      "Improved application performance, usability, and reliability by identifying bottlenecks and implementing optimisation strategies across the frontend layer.",
      "Took ownership of complex features and modules, delivering production-ready features end-to-end.",
      "Collaborated closely with product owners to define user stories, estimate effort, and establish sprints.",
      "Maintained clean coding standards through peer code reviews and unit testing coverages.",
    ],
  },
];

export default function Experience() {
  return (
    <section className="relative min-h-screen bg-[#0b0c10] py-32 px-6 md:px-24 flex flex-col justify-center overflow-hidden border-b border-white/[0.04]">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24 flex flex-col items-center"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 flex items-center justify-center gap-3">
            Professional <span className="px-4 py-1.5 rounded-2xl bg-white/10 text-white font-extrabold font-sans border border-white/10 shadow-inner">Experience</span>
          </h2>
          <span className="px-6 py-2 rounded-full border border-white/10 bg-white/5 text-[11px] font-bold tracking-[0.25em] text-gray-400 uppercase shadow-sm">
            MY CAREER JOURNEY
          </span>
        </motion.div>

        {/* Timeline Stack */}
        <div className="relative pl-8 md:pl-12 border-l border-white/[0.08] flex flex-col gap-16">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="relative group bg-white/[0.01] border border-white/[0.04] hover:border-white/[0.08] hover:bg-white/[0.02] p-8 md:p-12 rounded-[28px] transition-all duration-500 shadow-xl"
            >
              {/* Timeline dot */}
              <div className="absolute left-[-41px] md:left-[-57px] top-[40px] w-4 h-4 rounded-full border-4 border-[#0b0c10] bg-emerald-400 group-hover:scale-125 transition-transform duration-300 shadow-[0_0_12px_#34d399]" />

              {/* Title Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-emerald-400 mb-2">
                    {item.role}
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-gray-400">
                    <span className="flex items-center gap-1.5 font-semibold text-white/80">
                      <Briefcase size={16} className="text-gray-500" />
                      {item.company}
                    </span>
                    <span className="hidden sm:inline text-gray-600">•</span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={16} className="text-gray-500" />
                      {item.location}
                    </span>
                  </div>
                </div>

                {/* Date Badge */}
                <div className="flex items-start md:items-center">
                  <span className="px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-bold text-gray-300 flex items-center gap-2 tracking-wider">
                    <Calendar size={14} className="text-emerald-400" />
                    {item.date}
                  </span>
                </div>
              </div>

              {/* Points */}
              <ul className="space-y-4">
                {item.points.map((point, pIdx) => (
                  <li
                    key={pIdx}
                    className="flex items-start gap-3 text-[15px] text-gray-400 leading-relaxed font-medium transition-colors hover:text-gray-300"
                  >
                    <span className="text-emerald-400 mt-1.5 select-none text-xs">▸</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
