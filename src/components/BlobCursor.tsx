'use client';

import { useEffect, useState } from 'react';

export default function BlobCursor() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      // Disable cursor on touchscreens or narrow mobile layouts
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isWide = window.innerWidth >= 768;
      setEnabled(!isTouch && isWide);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const small = document.getElementById('cursor-small');
    const blob = document.getElementById('cursor-blob');
    if (!small || !blob) return;

    let mouseX = 0, mouseY = 0;
    let smallX = 0, smallY = 0;
    let blobX = 0, blobY = 0;
    let raf: number;
    let isInitialized = false;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isInitialized) {
        smallX = mouseX;
        smallY = mouseY;
        blobX = mouseX;
        blobY = mouseY;
        isInitialized = true;
      }
    };

    const animate = () => {
      if (isInitialized) {
        // Small dot follows mouse with LERP 0.3
        smallX += (mouseX - smallX) * 0.3;
        smallY += (mouseY - smallY) * 0.3;

        // Big blob follows small dot with LERP 0.12
        blobX += (smallX - blobX) * 0.12;
        blobY += (smallY - blobY) * 0.12;

        small.style.left = smallX + 'px';
        small.style.top = smallY + 'px';
        blob.style.left = blobX + 'px';
        blob.style.top = blobY + 'px';

        // Swallowing visual: hide small dot when big blob catches up within 24px and add glow
        const dist = Math.hypot(smallX - blobX, smallY - blobY);
        const isHidden = dist < 24;
        small.style.opacity = isHidden ? '0' : '1';
        
        if (isHidden) {
          blob.classList.add('glow');
        } else {
          blob.classList.remove('glow');
        }
      }

      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div id="cursor-small" />
      <div id="cursor-blob" />
    </>
  );
}
