"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Check, Loader2 } from "lucide-react";

const budgetOptions = ["< $5k", "$5k - $15k", "$15k - $50k", "$50k+"];

function FormInput({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  type?: string;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative w-full group footer-input-group hover:scale-[1.02] transition-transform duration-300">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        placeholder=" "
        className="block w-full px-6 py-5 text-base dark:text-white text-black dark:bg-white/[0.01] bg-black/[0.02] border dark:border-white/[0.08] border-black/[0.08] rounded-2xl focus:border-red-500 dark:focus:bg-white/[0.03] focus:bg-black/[0.03] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-500/10 placeholder-transparent"
      />
      <label
        className={`absolute left-6 top-5 text-gray-500 pointer-events-none transition-all duration-300 origin-[0] ${
          focused || value
            ? "-translate-y-8 scale-75 text-red-400 bg-background px-2"
            : ""
        }`}
      >
        {label}
      </label>
    </div>
  );
}

function FormTextarea({
  label,
  value,
  onChange,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative w-full group footer-input-group hover:scale-[1.02] transition-transform duration-300">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        rows={4}
        placeholder=" "
        className="block w-full px-6 py-5 text-base dark:text-white text-black dark:bg-white/[0.01] bg-black/[0.02] border dark:border-white/[0.08] border-black/[0.08] rounded-2xl focus:border-red-500 dark:focus:bg-white/[0.03] focus:bg-black/[0.03] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-500/10 placeholder-transparent resize-none"
      />
      <label
        className={`absolute left-6 top-5 text-gray-500 pointer-events-none transition-all duration-300 origin-[0] ${
          focused || value
            ? "-translate-y-8 scale-75 text-red-400 bg-background px-2"
            : ""
        }`}
      >
        {label}
      </label>
    </div>
  );
}

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [project, setProject] = useState("");
  const [budget, setBudget] = useState("< $5k");
  const [message, setMessage] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const [btnState, setBtnState] = useState<"idle" | "loading" | "success">("idle");

  // Mouse Move Event for Radial Gradient Glow
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Button Ripple on Click
  const handleBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = { x, y, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);
  };

  // Remove ripple after animation completes
  useEffect(() => {
    if (ripples.length === 0) return;
    const timer = setTimeout(() => {
      setRipples((prev) => prev.slice(1));
    }, 600);
    return () => clearTimeout(timer);
  }, [ripples]);

  // Form Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (btnState !== "idle") return;

    setBtnState("loading");

    // Simulate 1 second backend latency
    setTimeout(() => {
      setBtnState("success");

      // Formulate and launch direct mail client link
      const mailtoUrl = `mailto:abhisheknainawat9@gmail.com?subject=New Project Request - ${encodeURIComponent(name)}&body=Hello Abhishek,%0D%0A%0D%0AI would like to reach out to build a project with you.%0D%0A%0D%0AHere are my details:%0D%0A- Name: ${encodeURIComponent(name)}%0D%0A- Email: ${encodeURIComponent(email)}%0D%0A- Project Type: ${encodeURIComponent(project)}%0D%0A- Budget Range: ${encodeURIComponent(budget)}%0D%0A%0D%0AMessage:%0D%0A${encodeURIComponent(message)}%0D%0A%0D%0ABest regards`;
      
      window.location.href = mailtoUrl;

      // Reset Form fields after 3 seconds success animation
      setTimeout(() => {
        setBtnState("idle");
        setName("");
        setEmail("");
        setProject("");
        setBudget("< $5k");
        setMessage("");
      }, 3000);
    }, 1000);
  };

  // GSAP ScrollTrigger entry animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%", // Animates when top of footer reaches 80% viewport height
        toggleActions: "play none none none",
      },
    });

    // Heading reveal
    tl.fromTo(
      ".footer-heading",
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
    );

    // Form reveal
    tl.fromTo(
      ".footer-form",
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power4.out" },
      "-=0.6"
    );

    // Input fields stagger reveal
    tl.fromTo(
      ".footer-input-group",
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power4.out", stagger: 0.12 },
      "-=0.5"
    );

    // Bottom items reveal
    tl.fromTo(
      ".footer-bottom-item",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power4.out", stagger: 0.1 },
      "-=0.4"
    );
  }, []);

  return (
    <section
      id="contact"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative group min-h-screen bg-background text-foreground transition-colors duration-300 py-32 px-6 md:px-24 flex flex-col justify-between overflow-hidden border-t dark:border-white/[0.04] border-black/[0.04] select-none"
    >
      {/* Repeating noise overlay */}
      <div className="absolute inset-0 noise-overlay pointer-events-none opacity-[0.025]" />

      {/* Radial tracking glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(239, 68, 68, 0.025), transparent 80%)`,
        }}
      />

      <div className="max-w-6xl mx-auto w-full relative z-10 flex-grow grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left Side: Oversized Heading */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <h2 className="footer-heading text-6xl md:text-8xl font-black text-foreground tracking-tight leading-none">
            Let&apos;s get
            <br />
            you
            <br />
            <span className="text-red-500">building.</span>
          </h2>
        </div>

        {/* Right Side: Modern Glassmorphic Form */}
        <form
          onSubmit={handleSubmit}
          className="footer-form lg:col-span-7 w-full flex flex-col gap-6"
        >
          {/* Grid Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="What's your name?"
              value={name}
              onChange={setName}
              required
            />
            <FormInput
              label="Your email address?"
              value={email}
              onChange={setEmail}
              type="email"
              required
            />
          </div>

          <FormInput
            label="What project are we building?"
            value={project}
            onChange={setProject}
          />

          {/* Budget Pills */}
          <div className="footer-input-group flex flex-col gap-3">
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Project Budget
            </span>
            <div className="flex flex-wrap gap-3">
              {budgetOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setBudget(opt)}
                  className={`px-6 py-3.5 rounded-2xl text-sm font-bold border transition-all duration-300 hover:scale-105 active:scale-95 ${
                    budget === opt
                      ? "bg-red-500 border-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.35)]"
                      : "dark:bg-white/[0.01] bg-black/[0.02] dark:border-white/[0.08] border-black/[0.08] text-muted-foreground hover:border-foreground/30 dark:hover:text-white hover:text-black"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Message Textarea */}
          <FormTextarea
            label="Tell me a bit about the scope..."
            value={message}
            onChange={setMessage}
          />

          {/* Send Button */}
          <div className="footer-input-group flex justify-start mt-4">
            <button
              ref={buttonRef}
              type="submit"
              onClick={handleBtnClick}
              className={`relative overflow-hidden group/btn px-8 py-5 rounded-2xl font-bold flex items-center gap-3 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 ${
                btnState === "success"
                  ? "bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.35)]"
                  : "bg-red-500 text-white hover:bg-red-600 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]"
              }`}
            >
              {/* Ripple Effect Overlays */}
              {ripples.map((ripple) => (
                <span
                  key={ripple.id}
                  className="absolute rounded-full bg-white/30 animate-ripple pointer-events-none"
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                    transform: "translate(-50%, -50%)",
                    width: "400px",
                    height: "400px",
                  }}
                />
              ))}

              {btnState === "idle" && (
                <>
                  <span>Send Message</span>
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover/btn:translate-x-2"
                  />
                </>
              )}

              {btnState === "loading" && (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Sending...</span>
                </>
              )}

              {btnState === "success" && (
                <>
                  <Check size={18} className="animate-bounce" />
                  <span>Message Sent Successfully</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Footer Bottom Block */}
      <div className="max-w-6xl mx-auto w-full mt-24 border-t dark:border-white/[0.08] border-black/[0.08] pt-12 flex flex-col gap-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-muted-foreground font-semibold">
          {/* Column 1 */}
          <div className="footer-bottom-item flex flex-col gap-2">
            <span className="text-gray-600 uppercase tracking-widest text-xs">
              Contact Info
            </span>
            <a
              href="mailto:abhisheknainawat9@gmail.com"
              className="text-muted-foreground hover:text-foreground underline-hover w-fit"
            >
              abhisheknainawat9@gmail.com
            </a>
            <button className="text-muted-foreground hover:text-foreground underline-hover w-fit text-left">
              Book a call
            </button>
          </div>

          {/* Column 2 */}
          <div className="footer-bottom-item flex flex-col gap-2">
            <span className="text-gray-600 uppercase tracking-widest text-xs">
              Navigation
            </span>
            <button className="text-muted-foreground hover:text-foreground underline-hover w-fit text-left">
              HOME
            </button>
            <button className="text-muted-foreground hover:text-foreground underline-hover w-fit text-left">
              WORK
            </button>
            <button className="text-muted-foreground hover:text-foreground underline-hover w-fit text-left">
              CONTACT
            </button>
          </div>

          {/* Column 3 */}
          <div className="footer-bottom-item flex flex-col gap-2">
            <span className="text-gray-600 uppercase tracking-widest text-xs">
              Studio
            </span>
            <span className="text-muted-foreground">Indore, India</span>
            <span className="text-muted-foreground">GMT +05:30</span>
          </div>

          {/* Column 4 */}
          <div className="footer-bottom-item flex flex-col gap-2">
            <span className="text-gray-600 uppercase tracking-widest text-xs">
              Privacy Policy
            </span>
            <span className="text-muted-foreground">Copyright © 2026</span>
            <button className="text-muted-foreground hover:text-foreground underline-hover w-fit text-left">
              Terms of use
            </button>
          </div>
        </div>

        {/* Massive Outlined Title */}
        <div className="footer-bottom-item overflow-hidden">
          <h1 className="text-[clamp(3.5rem,10vw,12rem)] font-extrabold text-center tracking-wider dark:text-white/[0.02] text-black/[0.02] border-text leading-none py-4 select-none">
            ABHISHEK
          </h1>
        </div>
      </div>

      <style>{`
        .noise-overlay {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.025'/%3E%3C/svg%3E");
        }
        .underline-hover {
          position: relative;
        }
        .underline-hover::after {
          content: '';
          position: absolute;
          width: 100%;
          transform: scaleX(0);
          height: 1.5px;
          bottom: -2px;
          left: 0;
          background-color: currentColor;
          transform-origin: bottom left;
          transition: transform 0.3s ease-out;
        }
        .underline-hover:hover::after {
          transform: scaleX(1);
        }
        .border-text {
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.05);
          color: transparent;
        }
        .light .border-text {
          -webkit-text-stroke: 1.5px rgba(0, 0, 0, 0.05);
        }
        @keyframes ripple {
          from {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0);
          }
          to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1);
          }
        }
        .animate-ripple {
          animation: ripple 0.6s linear;
        }
      `}</style>
    </section>
  );
}
