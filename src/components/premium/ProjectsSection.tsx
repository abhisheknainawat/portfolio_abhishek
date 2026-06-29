"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

const SPRING = {
    mass: 0.1, // avoid Controls inertia. Lower mass = snappier motion; higher mass = lethargic motion
    damping: 10, // its like the weight of the ball heavier the ball less it will bounce or harder the rubber band the more it will bounce
    stiffness: 131, // like rubber Band the more you stretch the more speed it goes back to the original position
};

const projects = [
    {
        id: "01",
        name: "ESTELLE",
        description: "PORTFOLIO WEBSITE FOR A SOPHISTICATED, HIGH-END ARCHITECTURAL FIRM.",
        bgColor: "#2a2a2a",
    },
    {
        id: "02",
        name: "MAISON",
        description: "BRAND IDENTITY FOR A LUXURY FRENCH INTERIOR DESIGN STUDIO.",
        bgColor: "#222222",
    },
    {
        id: "03",
        name: "ATELIER",
        description: "DIGITAL EXPERIENCE FOR A CONTEMPORARY ART GALLERY SPACE.",
        bgColor: "#252525",
    },
];

export default function ProjectsSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [linesVisible, setLinesVisible] = useState(false);
    const [activeIdx, setActiveIdx] = useState(0);

    // Mouse spring motion values
    const xSpring = useSpring(0, SPRING);
    const ySpring = useSpring(0, SPRING);
    const opacitySpring = useSpring(0, SPRING);
    const scaleSpring = useSpring(0, SPRING);

    // Each image has its own translateY driven by scroll
    const [imgStates, setImgStates] = useState(
        projects.map(() => ({ y: 100, opacity: 0 }))
    );

    useEffect(() => {
        const t = setTimeout(() => setLinesVisible(true), 300);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const handleScroll = () => {
            const rect = section.getBoundingClientRect();
            const totalScrollable = section.offsetHeight - window.innerHeight;
            const scrolled = Math.max(-rect.top, 0);
            // progress: 0 → 1 over the whole sticky section
            const progress = Math.min(scrolled / totalScrollable, 1);

            const N = projects.length;
            const animationEndProgress = 0.85;

            const newStates = projects.map((_, i) => {
                // This image's scroll window: finishes by 0.85 progress
                const start = (i / N) * animationEndProgress;
                const end = ((i + 1) / N) * animationEndProgress;
                const local = (progress - start) / (end - start); // 0→1 within this image's range
                const clamped = Math.min(Math.max(local, 0), 1);

                if (clamped <= 0) {
                    // Not yet started — waiting below
                    return { y: 100, opacity: 0 };
                }

                // Ease in — slide up from bottom, fade out completely off the screen
                const eased = 1 - Math.pow(1 - clamped, 3); // ease-out cubic
                const y = 100 - eased * 160; // 100vh → -60vh (completely exits top)
                const opacity = clamped < 0.12 ? clamped / 0.12 : clamped > 0.85 ? 1 - (clamped - 0.85) / 0.15 : 1;

                return { y, opacity };
            });

            setImgStates(newStates);

            // Dynamically determine the active project based on progress mapped inside active window
            const activeIndex = Math.min(Math.floor((progress / animationEndProgress) * N), N - 1);
            setActiveIdx(activeIndex >= 0 ? activeIndex : 0);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section
            ref={sectionRef}
            style={{ position: "relative", height: `${100 + projects.length * 50}vh`, background: "#000000" }}
        >
            {/* Sticky viewport */}
            <div
                onPointerMove={(e) => {
                    const bounds = e.currentTarget.getBoundingClientRect();
                    xSpring.set(e.clientX - bounds.left);
                    ySpring.set(e.clientY - bounds.top);
                }}
                onPointerEnter={() => {
                    opacitySpring.set(1);
                    scaleSpring.set(1);
                }}
                onPointerLeave={() => {
                    opacitySpring.set(0);
                    scaleSpring.set(0);
                }}
                style={{
                    position: "sticky",
                    top: 0,
                    height: "100vh",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "none", // Hide default cursor to let the custom spring-based cursor shine
                }}
            >
                {/* Custom Spring Mouse Follow cursor */}
                <motion.div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        backgroundColor: "#f97316", // Orange-500
                        x: xSpring,
                        y: ySpring,
                        opacity: opacitySpring,
                        scale: scaleSpring,
                        pointerEvents: "none",
                        marginLeft: "-20px",
                        marginTop: "-20px",
                        zIndex: 4, // Below project cards and text, above lines
                    }}
                />
                {/* Decorative vertical lines — left */}
                {[
                    { left: "80px", height: linesVisible ? "180px" : "0px", delay: "0s" },
                    { left: "130px", height: linesVisible ? "130px" : "0px", delay: "0.05s" },
                    { left: "180px", height: linesVisible ? "220px" : "0px", delay: "0.1s" },
                    { left: "230px", height: linesVisible ? "100px" : "0px", delay: "0.15s" },
                ].map((l, i) => (
                    <div
                        key={`ll-${i}`}
                        style={{
                            position: "absolute",
                            top: 0,
                            left: l.left,
                            width: "1px",
                            height: l.height,
                            background: "rgba(255,255,255,0.22)",
                            transition: `height 0.8s ${l.delay} ease`,
                        }}
                    />
                ))}

                {/* Decorative vertical lines — right */}
                {[
                    { right: "80px", height: linesVisible ? "160px" : "0px", delay: "0.05s" },
                    { right: "130px", height: linesVisible ? "100px" : "0px", delay: "0s" },
                    { right: "180px", height: linesVisible ? "210px" : "0px", delay: "0.1s" },
                ].map((l, i) => (
                    <div
                        key={`lr-${i}`}
                        style={{
                            position: "absolute",
                            top: 0,
                            right: l.right,
                            width: "1px",
                            height: l.height,
                            background: "rgba(255,255,255,0.22)",
                            transition: `height 0.8s ${l.delay} ease`,
                        }}
                    />
                ))}

                {/* Project images — alternate left/right, slide upward */}
                {projects.map((project, i) => {
                    const isRight = i % 2 === 0;
                    const { y, opacity } = imgStates[i];
                    return (
                        <div
                            key={project.id}
                            style={{
                                position: "absolute",
                                width: "260px",
                                height: "320px",
                                borderRadius: "4px",
                                overflow: "hidden",
                                zIndex: 5 + i,
                                ...(isRight ? { right: "80px" } : { left: "80px" }),
                                top: 0,
                                transform: `translateY(${y}vh)`,
                                opacity,
                                willChange: "transform, opacity",
                                transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                            }}
                        >
                            {/* Replace with your <Image /> component */}
                            <div
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    background: project.bgColor,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexDirection: "column",
                                    gap: "8px",
                                }}
                            >
                                <span
                                    style={{
                                        fontFamily: "Georgia, serif",
                                        fontSize: "11px",
                                        letterSpacing: "0.15em",
                                        color: "rgba(255,255,255,0.4)",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    Project {project.id}
                                </span>
                                <span
                                    style={{
                                        fontFamily: "Georgia, serif",
                                        fontSize: "20px",
                                        color: "#e84040",
                                        fontStyle: "italic",
                                    }}
                                >
                                    {project.name.charAt(0) + project.name.slice(1).toLowerCase()}
                                </span>
                            </div>
                        </div>
                    );
                })}

                {/* Fixed center content — never changes */}
                <div
                    style={{
                        position: "relative",
                        zIndex: 10,
                        textAlign: "center",
                        pointerEvents: "none",
                        userSelect: "none",
                        width: "100%",
                        maxWidth: "600px",
                    }}
                >
                    <p
                        style={{
                            fontFamily: "Arial, sans-serif",
                            fontSize: "11px",
                            letterSpacing: "0.18em",
                            color: "#cccccc",
                            textTransform: "uppercase",
                            marginBottom: "18px",
                        }}
                    >
                        WHAT SAYING{" "}
                        <span
                            style={{
                                color: "#e84040",
                                fontStyle: "italic",
                                fontFamily: "Georgia, serif",
                                fontSize: "13px",
                            }}
                        >
                            &quot;YES!&quot;
                        </span>{" "}
                        LOOKS LIKE
                    </p>

                    {/* Stacking container for the dynamic dynamic details */}
                    <div style={{ position: "relative", width: "100%" }}>
                        {projects.map((project, idx) => {
                            const isActive = idx === activeIdx;
                            return (
                                <div
                                    key={project.id}
                                    style={{
                                        position: idx === 0 ? "relative" : "absolute",
                                        top: idx === 0 ? "auto" : 0,
                                        left: idx === 0 ? "auto" : 0,
                                        right: idx === 0 ? "auto" : 0,
                                        width: "100%",
                                        opacity: isActive ? 1 : 0,
                                        transform: `translateY(${isActive ? 0 : 20}px)`,
                                        pointerEvents: isActive ? "all" : "none",
                                        transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                                    }}
                                >
                                    <div style={{ position: "relative", display: "inline-block" }}>
                                        <h2
                                            style={{
                                                fontFamily: "'Arial Black', Arial, sans-serif",
                                                fontSize: "clamp(60px, 12vw, 130px)",
                                                fontWeight: 900,
                                                color: "#ffffff",
                                                textTransform: "uppercase",
                                                lineHeight: 0.9,
                                                letterSpacing: "-2px",
                                                margin: 0,
                                            }}
                                        >
                                            {project.name}
                                        </h2>
                                        <span
                                            style={{
                                                position: "absolute",
                                                top: "-8px",
                                                right: "-52px",
                                                fontFamily: "Georgia, serif",
                                                fontSize: "22px",
                                                color: "#e84040",
                                                fontStyle: "italic",
                                                fontWeight: "normal",
                                            }}
                                        >
                                            ({project.id})
                                        </span>
                                    </div>

                                    <p
                                        style={{
                                            fontFamily: "Arial, sans-serif",
                                            fontSize: "11px",
                                            letterSpacing: "0.15em",
                                            color: "#cccccc",
                                            textTransform: "uppercase",
                                            maxWidth: "520px",
                                            margin: "22px auto 0",
                                            minHeight: "33px",
                                        }}
                                    >
                                        {project.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    <button
                        style={{
                            marginTop: "28px",
                            display: "inline-block",
                            border: "1.5px solid #ffffff",
                            color: "#ffffff",
                            fontFamily: "Arial, sans-serif",
                            fontSize: "11px",
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            padding: "14px 34px",
                            cursor: "pointer",
                            background: "transparent",
                            pointerEvents: "all",
                            transition: "background 0.2s, color 0.2s",
                        }}
                        onMouseEnter={(e) => {
                            (e.target as HTMLButtonElement).style.background = "#ffffff";
                            (e.target as HTMLButtonElement).style.color = "#1a1a1a";
                        }}
                        onMouseLeave={(e) => {
                            (e.target as HTMLButtonElement).style.background = "transparent";
                            (e.target as HTMLButtonElement).style.color = "#ffffff";
                        }}
                    >
                        SEE PROJECT
                    </button>
                </div>

                {/* Progress dots */}
                <div
                    style={{
                        position: "absolute",
                        right: "24px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        zIndex: 20,
                    }}
                >
                    {projects.map((_, i) => {
                        const active = imgStates[i].opacity > 0.5;
                        return (
                            <div
                                key={i}
                                style={{
                                    width: "6px",
                                    height: "6px",
                                    borderRadius: "50%",
                                    background: active ? "#ffffff" : "rgba(255,255,255,0.25)",
                                    transition: "background 0.3s",
                                }}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
