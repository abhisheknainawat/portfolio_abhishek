"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
  // Section 1: 0% to 20% fade out
  const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.25], [0, -100]);

  // Section 2: fades in at 25%, peaks at 35%, out at 45%
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.5], [100, -100]);

  // Section 3: fades in at 55%, peaks at 65%, out at 75%
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.5, 0.8], [100, -100]);

  return (
    <div className="w-full h-full relative pointer-events-none">
      {/* Section 1 - Center */}
      <motion.div
        style={{ opacity: opacity1, y: y1 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white drop-shadow-2xl mb-4">
          Abhishek Nainawat
        </h1>
        <p className="text-xl md:text-3xl text-gray-200 font-light tracking-wide drop-shadow-md">
          Full Stack Developer.
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
