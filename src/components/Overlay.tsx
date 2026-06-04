"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
  const [hasDisappeared, setHasDisappeared] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest > 0.2 && !hasDisappeared) {
        setHasDisappeared(true);
      }
    });
    return unsubscribe;
  }, [scrollYProgress, hasDisappeared]);

  // Section 1: starts fading out immediately from 0% to 20%, but stays hidden once disappeared
  const opacity1 = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  // Section 2: fades in at 20%, peaks at 30%, out at 45%
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.5], [100, -100]);

  // Section 3: fades in at 50%, peaks at 60%, out at 75%
  // Starts at y=0 so it does not "pop up" from the bottom, just drifts up slightly
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.5, 0.8], [0, -50]);

  return (
    <div className="w-full h-full relative pointer-events-none">
      {/* Section 1 - Center */}
      <motion.div
        style={{ opacity: hasDisappeared ? 0 : opacity1, y: y1 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
      >
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white/40 drop-shadow-2xl mb-3">
          Abhi.
        </h1>
        <p className="text-xs md:text-lg text-white/70 font-bold tracking-[0.25em] uppercase drop-shadow-md">
          Creative Engineer
        </p>
      </motion.div>

      {/* Section 2 - Left */}
      <motion.div
        style={{ opacity: opacity2, y: y2 }}
        className="absolute inset-y-0 left-0 flex items-center p-8 md:p-24 w-full md:w-1/2"
      >
        <h2 className="text-4xl md:text-6xl font-bold leading-tight text-white drop-shadow-xl">
          I build <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            web and app based solutions.
          </span>
        </h2>
      </motion.div>

      {/* Section 3 - Right */}
      <motion.div
        style={{ opacity: opacity3, y: y3 }}
        className="absolute inset-y-0 right-0 flex items-center justify-end p-8 md:p-24 w-full md:w-1/2 text-right"
      >
        <h2 className="text-4xl md:text-6xl font-bold leading-tight text-white drop-shadow-xl">
          Based in <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Indore, India.
          </span>
        </h2>
      </motion.div>
    </div>
  );
}
