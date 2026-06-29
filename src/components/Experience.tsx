"use client";

import { Briefcase, MapPin, Calendar, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  {
    type: "work",
    role: "Software Engineer Intern",
    company: "A2BN Pvt. Ltd.",
    location: "Indore, India",
    date: "JAN 2026 - PRESENT",
    icon: Briefcase,
    points: [
      "Built and maintained 15+ backend RESTful APIs for a NEET exam platform supporting 7 question types, Excel bulk upload, user management, and exam creation modules using Java and Spring Boot.",
      "Diagnosed and resolved 3 critical Spring Boot transaction bugs causing silent data loss, eliminating write failures across bulk operations processing 500+ records per session.",
      "Integrated AWS S3 for image storage with presigned URL generation, removing all local storage dependencies.",
      "Designed an RBAC system covering Admin, Examiner, and Student permissions; collaborated with the frontend team in 2-week Agile sprints, cutting debugging turnaround by 40%.",
      "Tested 20+ endpoints in Postman and traced errors via DBeaver and PostgreSQL logs, shipping every module with zero regression defects.",
    ],
  },
  {
    type: "education",
    role: "B.Tech in Computer Science Engineering (Data Science)",
    company: "Institute of Engineering & Science, IPS Academy",
    location: "Indore, India",
    date: "2021 - 2025",
    icon: GraduationCap,
    points: [
      "Academic Performance: Graduated with a CGPA of 8.66 / 10.0.",
      "Core Coursework: Focused on database management systems, data structures and algorithms, object-oriented programming, cloud computing, and applied machine learning.",
      "Built automation scripts, full-stack personal platforms, and query analyzers during project modules.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative min-h-screen bg-background text-foreground transition-colors duration-300 py-32 px-6 md:px-24 flex flex-col justify-center overflow-hidden border-b border-white/[0.04]">
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
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6 flex items-center justify-center gap-3">
            Professional <span className="px-4 py-1.5 rounded-2xl dark:bg-white/10 bg-black/5 text-foreground font-extrabold font-sans border dark:border-white/10 border-black/10 shadow-inner">Experience</span>
          </h2>
          <span className="px-6 py-2 rounded-full border dark:border-white/10 border-black/10 dark:bg-white/5 bg-black/5 text-[11px] font-bold tracking-[0.25em] text-muted-foreground uppercase shadow-sm">
            MY CAREER JOURNEY
          </span>
        </motion.div>

        {/* Timeline Stack */}
        <div className="relative pl-8 md:pl-12 border-l dark:border-white/[0.08] border-black/[0.08] flex flex-col gap-16">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className="relative group dark:bg-white/[0.01] bg-[#f8f9fa] border dark:border-white/[0.04] border-black/[0.06] dark:hover:border-white/[0.08] hover:border-black/[0.12] dark:hover:bg-white/[0.02] hover:bg-black/[0.01] p-8 md:p-12 rounded-[28px] transition-all duration-500 shadow-xl"
              >
                {/* Timeline dot */}
                <div className={`absolute left-[-41px] md:left-[-57px] top-[40px] w-4 h-4 rounded-full border-4 dark:border-[#0b0c10] border-white group-hover:scale-125 transition-transform duration-300 shadow-[0_0_12px_rgba(52,211,153,0.5)] ${
                  item.type === "work" ? "bg-emerald-400 shadow-[0_0_12px_#34d399]" : "bg-indigo-400 shadow-[0_0_12px_#818cf8]"
                }`} />

                {/* Title Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className={`text-2xl md:text-3xl font-extrabold mb-2 ${
                      item.type === "work" ? "text-emerald-400" : "text-indigo-400"
                    }`}>
                      {item.role}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5 font-semibold text-foreground/80">
                        <Icon size={16} className="text-gray-500" />
                        {item.company}
                      </span>
                      <span className="hidden sm:inline text-gray-400">•</span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={16} className="text-gray-500" />
                        {item.location}
                      </span>
                    </div>
                  </div>

                  {/* Date Badge */}
                  <div className="flex items-start md:items-center">
                    <span className="px-4 py-2 rounded-full dark:bg-white/[0.04] bg-black/[0.02] border dark:border-white/[0.08] border-black/[0.08] text-xs font-bold text-muted-foreground flex items-center gap-2 tracking-wider">
                      <Calendar size={14} className={item.type === "work" ? "text-emerald-400" : "text-indigo-400"} />
                      {item.date}
                    </span>
                  </div>
                </div>

                {/* Points */}
                <ul className="space-y-4">
                  {item.points.map((point, pIdx) => (
                    <li
                      key={pIdx}
                      className="flex items-start gap-3 text-[15px] text-muted-foreground leading-relaxed font-medium transition-colors hover:text-foreground/80"
                    >
                      <span className={`mt-1.5 select-none text-xs ${
                        item.type === "work" ? "text-emerald-400" : "text-indigo-400"
                      }`}>▸</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
