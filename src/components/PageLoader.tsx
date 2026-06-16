"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STEPS = [
  { value: 28, delay: 200 },
  { value: 52, delay: 450 },
  { value: 69, delay: 700 },
  { value: 84, delay: 950 },
  { value: 93, delay: 1200 },
  { value: 100, delay: 1550 },
];

export default function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    STEPS.forEach(({ value, delay }) => {
      timers.push(
        setTimeout(() => {
          setProgress(value);
          if (value === 100) {
            // Hide overlay 800ms after reaching 100%
            timers.push(
              setTimeout(() => {
                setVisible(false);
              }, 800)
            );
          }
        }, delay)
      );
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#111111",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Name */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 64,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.03em",
              margin: 0,
              lineHeight: 1,
            }}
          >
            Abhi.
          </motion.p>

          {/* Progress block */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            style={{ width: 320, marginTop: 32 }}
          >
            {/* Bar track */}
            <div
              style={{
                width: "100%",
                height: 1,
                background: "rgba(255,255,255,0.15)",
                borderRadius: 1,
                overflow: "hidden",
              }}
            >
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                style={{
                  height: "100%",
                  background: "#ffffff",
                  borderRadius: 1,
                }}
              />
            </div>

            {/* Labels */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 8,
                fontFamily: "Inter, sans-serif",
                fontSize: 10,
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.38)",
                letterSpacing: "0.08em",
              }}
            >
              <span>Loading Experience</span>
              <span>{progress}%</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
