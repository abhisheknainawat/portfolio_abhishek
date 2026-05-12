"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useTransform, useSpring, motion } from "framer-motion";
import Overlay from "@/components/Overlay";

const FRAME_COUNT = 120; // 0 to 119

const currentFrame = (index: number) =>
  `/sequence/frame_${index.toString().padStart(3, "0")}_delay-0.066s.png`;

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const lastRenderedFrame = useRef<number>(-1);

  // Cache rendering metrics to prevent layout thrashing
  const renderMetrics = useRef({
    drawWidth: 0,
    drawHeight: 0,
    offsetX: 0,
    offsetY: 0,
    width: 0,
    height: 0,
  });

  // Calculate and store canvas scaling data without re-triggering layouts per frame
  const setupCanvasMetrics = useCallback((canvas: HTMLCanvasElement, img: HTMLImageElement) => {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    // Only update canvas buffer if dimensions actually changed
    if (
      renderMetrics.current.width !== rect.width ||
      renderMetrics.current.height !== rect.height
    ) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      // { alpha: false } highly optimizes rendering when background is fully opaque
      const ctx = canvas.getContext("2d", { alpha: false });
      if (ctx) {
        ctx.scale(dpr, dpr);
      }

      const canvasRatio = rect.width / rect.height;
      const imgRatio = img.width / img.height;

      let drawWidth = rect.width;
      let drawHeight = rect.height;
      let offsetX = 0;
      let offsetY = 0;

      if (imgRatio > canvasRatio) {
        drawWidth = rect.height * imgRatio;
        offsetX = (rect.width - drawWidth) / 2;
      } else {
        drawHeight = rect.width / imgRatio;
        offsetY = (rect.height - drawHeight) / 2;
      }

      renderMetrics.current = {
        drawWidth,
        drawHeight,
        offsetX,
        offsetY,
        width: rect.width,
        height: rect.height,
      };

      // Force a redraw on resize
      lastRenderedFrame.current = -1;
    }
  }, []);

  const renderFrame = useCallback(
    (frameIndex: number, img?: HTMLImageElement) => {
      if (frameIndex === lastRenderedFrame.current) return; // Prevent duplicate paints

      const canvas = canvasRef.current;
      const targetImg = img || images[frameIndex];
      if (canvas && targetImg) {
        const ctx = canvas.getContext("2d", { alpha: false });
        if (ctx) {
          const { drawWidth, drawHeight, offsetX, offsetY } = renderMetrics.current;
          ctx.drawImage(targetImg, offsetX, offsetY, drawWidth, drawHeight);
          lastRenderedFrame.current = frameIndex;
        }
      }
    },
    [images]
  );

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          // Initial setup
          if (canvasRef.current && loadedImages[0]) {
            setupCanvasMetrics(canvasRef.current, loadedImages[0]);
          }
          setImages(loadedImages);
        }
      };
      loadedImages.push(img);
    }
  }, [setupCanvasMetrics]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 50,
    stiffness: 400,
    mass: 0.1,
  });

  const rawFrameIndex = useTransform(smoothProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useEffect(() => {
    // If images are loaded but nothing is rendered yet (e.g. state caught up), force a render
    if (images.length === FRAME_COUNT && lastRenderedFrame.current === -1) {
      renderFrame(Math.round(rawFrameIndex.get()));
    }

    return rawFrameIndex.on("change", (latest) => {
      if (images.length === FRAME_COUNT) {
        renderFrame(Math.round(latest));
      }
    });
  }, [rawFrameIndex, images, renderFrame]);

  // Handle Resize with Debouncing and Passive Listeners
  useEffect(() => {
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (canvasRef.current && images.length > 0) {
          const frame = Math.round(rawFrameIndex.get());
          setupCanvasMetrics(canvasRef.current, images[frame]);
          renderFrame(frame);
        }
      }, 150); // Debounce resize events
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, [images, rawFrameIndex, setupCanvasMetrics, renderFrame]);

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-[#121212] w-full transform-gpu">
      <div className="sticky top-0 h-screen w-full overflow-hidden transform-gpu">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
        />
        <div className="absolute inset-0 z-10 will-change-transform">
          <Overlay scrollYProgress={scrollYProgress} />
        </div>
      </div>
    </div>
  );
}
