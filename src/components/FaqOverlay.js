"use client";

import { useEffect, useRef, useState } from 'react';
import Faq from './Faq';
import CinematicFooter from './CinematicFooter';

export default function FaqOverlay({ progress = 0, onContainerReady }) {
  const containerRef = useRef(null);
  const [hasInnerScroll, setHasInnerScroll] = useState(false);

  useEffect(() => {
    if (typeof onContainerReady === 'function' && containerRef.current) {
      onContainerReady(containerRef.current);
    }
  }, [onContainerReady]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const handleScroll = () => {
      setHasInnerScroll(node.scrollTop > 0);
    };

    handleScroll();
    node.addEventListener('scroll', handleScroll, { passive: true });
    return () => node.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      id="faq-scroll-container"
      className="w-full min-h-screen"
    >
      <Faq />
      <CinematicFooter />
    </div>
  );
}