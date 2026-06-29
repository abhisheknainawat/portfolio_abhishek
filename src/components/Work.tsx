"use client";

const projects = [
  {
    featured: true,
    bg: "linear-gradient(135deg,#0f1923,#1a2d1a,#0d2b1a)",
    label: "QMS · Live Platform",
    title: "Question Management System",
    desc: "Production-grade NEET exam prep platform. Built the entire backend solo — Excel bulk upload pipeline for 7 question types, AWS Cognito auth, S3 image proxy, and transactional data integrity.",
    stack: ["Java 21", "Spring Boot", "PostgreSQL", "AWS", "React"],
    link: "#",
  },
  {
    featured: false,
    bg: "linear-gradient(135deg,#1a0a2e,#2d1060,#1a0a2e)",
    label: "Portfolio · 2025",
    title: "Developer Portfolio",
    desc: "Cinematic dark-theme portfolio with blob cursor, scroll-reactive particle mesh, and page loader.",
    stack: ["Next.js", "Framer Motion", "GSAP"],
    link: "#",
  },
  {
    featured: false,
    bg: "linear-gradient(135deg,#1a1000,#3d2800,#1a1000)",
    label: "Coming Soon",
    title: "Next Project",
    desc: "Currently building. Something ambitious in the data science space.",
    stack: ["TBD"],
    link: "#",
  },
];

export default function Work() {
  return (
    <section
      style={{
        padding: "100px 60px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div>
          <p
            className="reveal"
            style={{
              fontSize: "10px",
              letterSpacing: "0.25em",
              color: "rgba(255,255,255,0.35)",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            Selected Work
          </p>
          <h2
            className="reveal delay-1"
            style={{
              fontSize: "clamp(36px,5vw,64px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#fff",
            }}
          >
            Projects
          </h2>
        </div>

        <a
          className="reveal"
          href="#"
          style={{
            fontSize: "11px",
            letterSpacing: "0.1em",
            color: "rgba(255,255,255,0.35)",
            textTransform: "uppercase",
            textDecoration: "none",
            borderBottom: "1px solid rgba(255,255,255,0.15)",
            paddingBottom: "1px",
          }}
        >
          View all
        </a>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginTop: "48px",
        }}
      >
        {projects.map((p, i) => (
          <div
            key={i}
            className={`reveal delay-${i + 1}`}
            style={{
              gridColumn: p.featured ? "span 2" : "span 1",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px",
              overflow: "hidden",
              background: "rgba(255,255,255,0.02)",
              transition:
                "border-color 0.4s, transform 0.4s cubic-bezier(0.16,1,0.3,1)",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.borderColor = "rgba(255,255,255,0.18)";
              el.style.transform = "translateY(-8px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLDivElement;
              el.style.borderColor = "rgba(255,255,255,0.08)";
              el.style.transform = "translateY(0)";
            }}
          >
            {/* Card image area */}
            <div
              style={{
                width: "100%",
                height: p.featured ? "280px" : "200px",
                background: p.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  color: "rgba(255,255,255,0.2)",
                  textTransform: "uppercase",
                }}
              >
                {p.label}
              </span>
            </div>

            {/* Card body */}
            <div style={{ padding: "24px" }}>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: "8px",
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.45)",
                  lineHeight: 1.6,
                  marginBottom: "16px",
                }}
              >
                {p.desc}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {p.stack.map((s, j) => (
                    <span
                      key={j}
                      style={{
                        fontSize: "10px",
                        padding: "3px 8px",
                        background: "rgba(255,255,255,0.06)",
                        borderRadius: "4px",
                        color: "rgba(255,255,255,0.4)",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <a
                  href={p.link}
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.1em",
                    color: "rgba(255,255,255,0.4)",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(255,255,255,0.15)",
                    paddingBottom: "1px",
                  }}
                >
                  View ↗
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
