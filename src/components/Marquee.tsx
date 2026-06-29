"use client";

export default function Marquee() {
  const text = [
    "Backend Engineer",
    "Java · Spring Boot",
    "AWS · PostgreSQL",
    "React · TypeScript",
    "Available for Work",
    "Creative Engineer",
  ];
  const repeated = [...text, ...text];

  return (
    <div
      style={{
        padding: "18px 0",
        background: "rgba(255,255,255,0.03)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
    >
      <div
        style={{
          display: "inline-block",
          animation: "marquee 25s linear infinite",
        }}
      >
        {repeated.map((item, i) => (
          <span key={i}>
            <span
              style={{
                fontSize: "11px",
                letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.35)",
                textTransform: "uppercase",
                padding: "0 32px",
              }}
            >
              {item}
            </span>
            <span style={{ color: "rgba(255,255,255,0.15)" }}>·</span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
