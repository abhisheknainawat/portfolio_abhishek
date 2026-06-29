"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

const SPRING = {
    mass: 0.1,
    damping: 10,
    stiffness: 131,
};

const projects = [
    {
        id: "01",
        name: "DENTAL AMBER",
        category: "Web App",
        description: "A COMPREHENSIVE DENTAL CLINIC MANAGEMENT AND BOOKING PLATFORM.",
        link: "https://dental-web-amber.vercel.app/",
        image: "/projects/dental.png",
        bgColor: "#1a2421",
    },
    {
        id: "02",
        name: "LIVEBLOCKS COLLAB",
        category: "Real-time App",
        description: "A REAL-TIME COLLABORATIVE WORKSPACE USING LIVEBLOCKS FOR MULTI-USER EDITING.",
        link: "https://liveblock-abhi.vercel.app/",
        image: "/projects/liveblock.png",
        bgColor: "#1f1a30",
    },
    {
        id: "03",
        name: "ALL SERVICES",
        category: "Service Platform",
        description: "A MULTI-SERVICE BOOKING AND PROVIDER PLATFORM FOR ON-DEMAND UTILITIES.",
        link: "https://all-services1.vercel.app/",
        image: "/projects/servicehub.png",
        bgColor: "#24201a",
    },
    {
        id: "04",
        name: "3D PORTFOLIO",
        category: "3D Experience",
        description: "AN INTERACTIVE 3D WEB EXPERIENCE BUILT WITH THREE.JS AND MODERN WEB TECHNOLOGIES.",
        link: "https://abhishek-3d-website.netlify.app/",
        image: "/projects/iphone.png",
        bgColor: "#1a2530",
    },
];

export default function Projects() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [linesVisible, setLinesVisible] = useState(false);
    const [activeIdx, setActiveIdx] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    // Mouse spring motion values
    const xSpring = useSpring(0, SPRING);
    const ySpring = useSpring(0, SPRING);
    const opacitySpring = useSpring(0, SPRING);
    const scaleSpring = useSpring(0, SPRING);

    // Each image has its own translateY driven by scroll
    const [imgStates, setImgStates] = useState(
        projects.map(() => ({ y: 100, opacity: 0 }))
    );

    // Screen resizing responsive handler
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

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
                    return { y: isMobile ? 50 : 100, opacity: 0 };
                }

                // Ease in — slide up from bottom, fade out completely off the screen
                const eased = 1 - Math.pow(1 - clamped, 3); // ease-out cubic
                const y = isMobile
                    ? (50 - eased * 75) // Slides from 50vh to -25vh in upper half
                    : (100 - eased * 160); // 100vh → -60vh (desktop)
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
    }, [isMobile]);

    return (
        <section
            id="work"
            ref={sectionRef}
            className="premium-projects-section"
            style={{ position: "relative", height: `${100 + projects.length * 50}vh`, background: "#000000" }}
        >
            {/* Sticky viewport */}
            <div
                onPointerMove={(e) => {
                    if (isMobile) return;
                    const bounds = e.currentTarget.getBoundingClientRect();
                    xSpring.set(e.clientX - bounds.left);
                    ySpring.set(e.clientY - bounds.top);
                }}
                onPointerEnter={() => {
                    if (isMobile) return;
                    opacitySpring.set(1);
                    scaleSpring.set(1);
                }}
                onPointerLeave={() => {
                    if (isMobile) return;
                    opacitySpring.set(0);
                    scaleSpring.set(0);
                }}
                style={{
                    position: "sticky",
                    top: 0,
                    height: "100vh",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: "center",
                    justifyContent: isMobile ? "space-between" : "center",
                    cursor: isMobile ? "auto" : "none", // Default cursor on mobile, hidden on desktop
                }}
            >
                {/* Custom Spring Mouse Follow cursor (Desktop only) */}
                {!isMobile && (
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
                            zIndex: 4,
                        }}
                    />
                )}
                
                {/* Decorative vertical lines — left (Desktop only) */}
                {!isMobile && [
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

                {/* Decorative vertical lines — right (Desktop only) */}
                {!isMobile && [
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

                {/* Project images — alternate left/right on desktop, centered slide-up in top half on mobile */}
                {projects.map((project, i) => {
                    const isRight = i % 2 === 0;
                    const { y, opacity } = imgStates[i];
                    return (
                        <div
                            key={project.id}
                            style={{
                                position: "absolute",
                                width: isMobile ? "200px" : "260px",
                                height: isMobile ? "240px" : "320px",
                                borderRadius: "4px",
                                overflow: "hidden",
                                zIndex: 5 + i,
                                ...(isMobile
                                    ? { left: "50%", marginLeft: "-100px", top: "10vh" }
                                    : (isRight ? { right: "80px", top: 0 } : { left: "80px", top: 0 })
                                ),
                                transform: `translateY(${y}vh)`,
                                opacity,
                                willChange: "transform, opacity",
                                transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                            }}
                        >
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block w-full h-full relative"
                                style={{ cursor: isMobile ? "pointer" : "none" }}
                            >
                                <img
                                    src={project.image}
                                    alt={project.name}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        filter: "grayscale(20%) contrast(110%) brightness(80%)",
                                        transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s ease",
                                    }}
                                    className="group-hover:scale-105 group-hover:brightness-100 group-hover:grayscale-0"
                                />
                                <div
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "flex-end",
                                        padding: "16px",
                                        boxSizing: "border-box",
                                    }}
                                >
                                    <span
                                        style={{
                                            fontFamily: "Georgia, serif",
                                            fontSize: "10px",
                                            letterSpacing: "0.15em",
                                            color: "rgba(255,255,255,0.5)",
                                            textTransform: "uppercase",
                                            marginBottom: "4px",
                                        }}
                                    >
                                        Project {project.id}
                                    </span>
                                    <span
                                        style={{
                                            fontFamily: "Georgia, serif",
                                            fontSize: "16px",
                                            color: "#ffffff",
                                            fontWeight: "bold",
                                            letterSpacing: "0.05em",
                                        }}
                                    >
                                        {project.name}
                                    </span>
                                </div>
                            </a>
                        </div>
                    );
                })}

                {/* Center details content — positioned below cards on mobile */}
                <div
                    style={{
                        position: isMobile ? "absolute" : "relative",
                        bottom: isMobile ? "12vh" : "auto",
                        zIndex: 10,
                        textAlign: "center",
                        pointerEvents: "none",
                        userSelect: "none",
                        width: "100%",
                        maxWidth: "600px",
                        padding: "0 20px",
                        boxSizing: "border-box",
                    }}
                >
                    <p
                        style={{
                            fontFamily: "Arial, sans-serif",
                            fontSize: "11px",
                            letterSpacing: "0.18em",
                            color: "#cccccc",
                            textTransform: "uppercase",
                            marginBottom: "12px",
                        }}
                    >
                        SELECTED{" "}
                        <span
                            style={{
                                color: "#e84040",
                                fontStyle: "italic",
                                fontFamily: "Georgia, serif",
                                fontSize: "13px",
                            }}
                        >
                            &quot;WORK&quot;
                        </span>{" "}
                        SHOWCASE
                    </p>

                    {/* Stacking container for the dynamic details */}
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
                                                fontSize: isMobile ? "32px" : "clamp(48px, 8vw, 90px)",
                                                fontWeight: 900,
                                                color: "#ffffff",
                                                textTransform: "uppercase",
                                                lineHeight: isMobile ? 1.1 : 0.9,
                                                letterSpacing: "-1px",
                                                margin: 0,
                                            }}
                                        >
                                            {project.name}
                                        </h2>
                                        <span
                                            style={{
                                                position: "absolute",
                                                top: isMobile ? "-14px" : "-8px",
                                                right: isMobile ? "-36px" : "-52px",
                                                fontFamily: "Georgia, serif",
                                                fontSize: isMobile ? "14px" : "22px",
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
                                            margin: isMobile ? "12px auto 0" : "22px auto 0",
                                            minHeight: isMobile ? "auto" : "33px",
                                        }}
                                    >
                                        {project.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    <a
                        href={projects[activeIdx].link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            marginTop: "20px",
                            display: "inline-block",
                            border: "1.5px solid #ffffff",
                            color: "#ffffff",
                            fontFamily: "Arial, sans-serif",
                            fontSize: "11px",
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            padding: isMobile ? "10px 24px" : "14px 34px",
                            cursor: isMobile ? "pointer" : "none",
                            background: "transparent",
                            pointerEvents: "all",
                            transition: "background 0.2s, color 0.2s",
                            textDecoration: "none",
                        }}
                        onMouseEnter={(e) => {
                            if (isMobile) return;
                            (e.target as HTMLAnchorElement).style.background = "#ffffff";
                            (e.target as HTMLAnchorElement).style.color = "#1a1a1a";
                        }}
                        onMouseLeave={(e) => {
                            if (isMobile) return;
                            (e.target as HTMLAnchorElement).style.background = "transparent";
                            (e.target as HTMLAnchorElement).style.color = "#ffffff";
                        }}
                    >
                        SEE PROJECT
                    </a>
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