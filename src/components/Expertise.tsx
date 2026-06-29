"use client";

import { useEffect, useRef, useState } from "react";

const items = [
  { num: "01", title: "Backend Engineering",    tags: ["Java 21", "Spring Boot", "REST APIs"] },
  { num: "02", title: "Cloud & Infrastructure", tags: ["AWS EC2", "S3", "RDS", "Cognito"] },
  { num: "03", title: "Frontend Development",   tags: ["React", "TypeScript", "Next.js"] },
  { num: "04", title: "Data & Systems Design",  tags: ["PostgreSQL", "System Design", "Data Science"] },
];

export default function Expertise() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    Array(items.length).fill(false)
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              (entry.target as HTMLElement).getAttribute("data-index") || "0"
            );
            setVisibleItems((prev) => {
              const updated = [...prev];
              updated[index] = true;
              return updated;
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    const itemElements = containerRef.current?.querySelectorAll("[data-index]");
    itemElements?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        padding: "120px 60px",
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle background glow */}
      <div
        style={{
          position: "absolute",
          bottom: "-50%",
          left: "-10%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: "60px" }}>
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.25em",
              color: "rgba(255,255,255,0.4)",
              textTransform: "uppercase",
              marginBottom: "16px",
              fontWeight: 600,
            }}
          >
            My Arsenal
          </p>

          <h2
            style={{
              fontSize: "clamp(36px,5vw,64px)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "#fff",
              marginBottom: "12px",
            }}
          >
            Expertise
          </h2>

          <div
            style={{
              width: "60px",
              height: "3px",
              background: "linear-gradient(90deg, rgba(59,130,246,0.8) 0%, transparent 100%)",
            }}
          />
        </div>

        {/* Items Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              data-index={i}
              style={{
                opacity: visibleItems[i] ? 1 : 0,
                transform: visibleItems[i] ? "translateY(0)" : "translateY(40px)",
                transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <div
                style={{
                  padding: "32px",
                  borderRadius: "24px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(20px)",
                  cursor: "pointer",
                  transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.background = "rgba(59,130,246,0.08)";
                  el.style.borderColor = "rgba(59,130,246,0.3)";
                  el.style.transform = "translateY(-8px)";
                  el.style.boxShadow =
                    "0 20px 40px rgba(59,130,246,0.1), 0 0 1px rgba(255,255,255,0.1)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.background = "rgba(255,255,255,0.04)";
                  el.style.borderColor = "rgba(255,255,255,0.08)";
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "none";
                }}
              >
                {/* Number Badge */}
                <span
                  style={{
                    fontSize: "48px",
                    fontWeight: 800,
                    color: "rgba(59,130,246,0.3)",
                    lineHeight: 1,
                    marginBottom: "16px",
                  }}
                >
                  {item.num}
                </span>

                {/* Title */}
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: "20px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {item.title}
                </h3>

                {/* Tags */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                    marginTop: "auto",
                  }}
                >
                  {item.tags.map((tag, j) => (
                    <span
                      key={j}
                      style={{
                        fontSize: "11px",
                        letterSpacing: "0.1em",
                        padding: "6px 12px",
                        border: "1px solid rgba(59,130,246,0.3)",
                        borderRadius: "20px",
                        color: "rgba(59,130,246,0.7)",
                        textTransform: "uppercase",
                        fontWeight: 600,
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget;
                        el.style.background = "rgba(59,130,246,0.15)";
                        el.style.borderColor = "rgba(59,130,246,0.6)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget;
                        el.style.background = "transparent";
                        el.style.borderColor = "rgba(59,130,246,0.3)";
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

