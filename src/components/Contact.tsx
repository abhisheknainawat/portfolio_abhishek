"use client";

export default function Contact() {
  return (
    <section
      style={{
        textAlign: "center",
        padding: "120px 60px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <p
        className="reveal"
        style={{
          fontSize: "10px",
          letterSpacing: "0.25em",
          color: "rgba(255,255,255,0.35)",
          textTransform: "uppercase",
          marginBottom: "32px",
        }}
      >
        Let&apos;s connect
      </p>

      <h2
        className="reveal delay-1"
        style={{
          fontSize: "clamp(48px,8vw,100px)",
          fontWeight: 800,
          letterSpacing: "-0.04em",
          lineHeight: 0.95,
          color: "#fff",
          marginBottom: "40px",
        }}
      >
        Let&apos;s build
        <br />
        <span style={{ color: "rgba(255,255,255,0.2)" }}>something.</span>
      </h2>

      <div className="reveal delay-2">
        <a
          href="mailto:abhishek@email.com"
          style={{
            fontSize: "18px",
            color: "rgba(255,255,255,0.5)",
            borderBottom: "1px solid rgba(255,255,255,0.2)",
            paddingBottom: "4px",
            display: "inline-block",
            marginBottom: "48px",
            letterSpacing: "0.02em",
            textDecoration: "none",
            transition: "color 0.3s, border-color 0.3s",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.color = "#fff";
            el.style.borderColor = "rgba(255,255,255,0.6)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.color = "rgba(255,255,255,0.5)";
            el.style.borderColor = "rgba(255,255,255,0.2)";
          }}
        >
          abhishek@email.com
        </a>
      </div>

      <div
        className="reveal delay-3"
        style={{ display: "flex", gap: "16px", justifyContent: "center" }}
      >
        <button
          style={{
            padding: "14px 32px",
            borderRadius: "40px",
            fontSize: "13px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            cursor: "pointer",
            fontFamily: "Inter, sans-serif",
            background: "#fff",
            color: "#000",
            border: "1px solid #fff",
            transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.transform = "translateY(-2px)";
            el.style.boxShadow = "0 12px 30px rgba(255,255,255,0.15)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.transform = "translateY(0)";
            el.style.boxShadow = "none";
          }}
        >
          Download Resume
        </button>

        <button
          style={{
            padding: "14px 32px",
            borderRadius: "40px",
            fontSize: "13px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            cursor: "pointer",
            fontFamily: "Inter, sans-serif",
            background: "transparent",
            color: "rgba(255,255,255,0.6)",
            border: "1px solid rgba(255,255,255,0.2)",
            transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.borderColor = "rgba(255,255,255,0.5)";
            el.style.color = "#fff";
            el.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.borderColor = "rgba(255,255,255,0.2)";
            el.style.color = "rgba(255,255,255,0.6)";
            el.style.transform = "translateY(0)";
          }}
        >
          View GitHub
        </button>
      </div>
    </section>
  );
}
