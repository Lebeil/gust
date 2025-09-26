"use client";
import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import MainHeroMobile from "@/components/MainHeroMobile";

const Scene = dynamic(() => import("./R3F/Scene"), {
  ssr: false,
});

const Hero = ({ content, scrollProgress = 0, variant = "default" }) => {
  const [isSceneLoaded, setIsSceneLoaded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const isCompact = variant === "compact";
  const canvasHeightClass = isCompact ? "lg:h-[calc(100vh-260px)]" : "lg:h-[calc(100vh-180px)]";

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    // Initial check
    checkDesktop();
    
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useEffect(() => {
    if (isDesktop) {
      if (isSceneLoaded) {
        document.body.style.overflow = "auto";
      } else {
        document.body.style.overflow = "hidden";
      }

      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [isSceneLoaded, isDesktop]);
  const desktopContainerClass = isCompact
    ? "hidden lg:block lg:h-[calc(100vh-200px)] lg:min-h-0"
    : "hidden lg:block lg:min-h-screen";

  return (
    <section className="h-full w-full">
      <div className="lg:hidden">
        <MainHeroMobile content={content} />
      </div>

      <div className={`${desktopContainerClass} lg:pt-[var(--tw-4)]`}>
        <Scene
          content={content}
          onLoaded={() => setIsSceneLoaded(true)}
          scrollProgress={scrollProgress}
          canvasClassName={`h-full ${canvasHeightClass}`}
        />
      </div>
    </section>
  );
};

export default Hero;
