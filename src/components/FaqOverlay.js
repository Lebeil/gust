"use client";

import { useEffect, useMemo, useRef } from 'react';
import Faq, { FaqContent } from './Faq';
import CinematicFooter from './CinematicFooter';

export default function FaqOverlay({ progress = 0, onContainerReady }) {
  const clamped = useMemo(() => Math.max(0, Math.min(1, progress || 0)), [progress]);
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof onContainerReady !== 'function') {
      return;
    }

    onContainerReady(containerRef.current);

    return () => {
      onContainerReady(null);
    };
  }, [onContainerReady]);

  const ease = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
  const eased = ease(clamped);
  const translateY = 100 - (eased * 100); // 100vh -> 0vh

  return (
    <div
      className="fixed inset-0 z-[1050]"
      style={{
        transform: `translateY(${translateY}vh)`,
        transition: 'transform 0.1s ease-out',
        pointerEvents: clamped > 0 ? 'auto' : 'none'
      }}
    >
      <div
        id="faq-scroll-container"
        ref={containerRef}
        className="flex h-full w-full flex-col overflow-y-auto"
        style={{
          opacity: clamped > 0 ? 1 : 0,
          backgroundImage: "url('/images/GRADIANT.png')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      >
        <div className="flex flex-1 flex-col">
          <FaqContent />
        </div>
        <div className="px-6 pt-6 md:px-10 md:pt-10">
          <CinematicFooter />
        </div>
      </div>
    </div>
  );
}


