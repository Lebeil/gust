"use client";

import { useMemo } from 'react';
import Faq from './Faq';
import CinematicFooter from './CinematicFooter';

export default function FaqOverlay({ progress = 0 }) {
  const clamped = useMemo(() => Math.max(0, Math.min(1, progress || 0)), [progress]);

  const ease = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
  const eased = ease(clamped);
  const translateY = 100 - (eased * 100); // 100vh -> 0vh

  return (
    <div
      className="fixed inset-0 z-[1050] pointer-events-none"
      style={{
        transform: `translateY(${translateY}vh)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      <div
        id="faq-scroll-container"
        className="w-full h-full overflow-y-auto pointer-events-auto"
        style={{
          opacity: clamped > 0 ? 1 : 0,
          backgroundImage: "url('/images/GRADIANT.png')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      >
        <Faq />
        <CinematicFooter />
      </div>
    </div>
  );
}


