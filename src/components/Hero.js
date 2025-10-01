"use client";
import React, { useState, useEffect, useMemo } from "react";
import dynamic from 'next/dynamic';
import MainHeroMobile from "@/components/MainHeroMobile";
import { useHeroState } from "@/context/HeroStateContext";

const Scene = dynamic(() => import("./R3F/Scene"), {
  ssr: false,
});

const Hero = ({ content, scrollProgress, variant = "default" }) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const {
    isSceneLoaded,
    setIsSceneLoaded,
    isWebGLSupported,
    setIsWebGLSupported,
    scrollProgress: persistedScrollProgress,
  } = useHeroState();

  const effectiveScrollProgress = useMemo(() => {
    if (typeof scrollProgress === "number") {
      return scrollProgress;
    }

    return persistedScrollProgress;
  }, [persistedScrollProgress, scrollProgress]);
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
    if (typeof window === "undefined" || isWebGLSupported !== null) {
      return;
    }

    const supportsWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        return !!gl && typeof gl.getShaderPrecisionFormat === "function";
      } catch (error) {
        return false;
      }
    };

    setIsWebGLSupported(supportsWebGL());
  }, [isWebGLSupported, setIsWebGLSupported]);

  const shouldRenderScene = isDesktop && isWebGLSupported === true;

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    if (!shouldRenderScene) {
      document.body.style.overflow = "auto";
      return;
    }

    document.body.style.overflow = isSceneLoaded ? "auto" : "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSceneLoaded, shouldRenderScene]);

  const desktopContainerClass = isCompact
    ? "hidden lg:block lg:h-[calc(100vh-200px)] lg:min-h-0"
    : "hidden lg:block lg:min-h-screen";

  return (
    <section className="h-full w-full">
      <div className="lg:hidden">
        <MainHeroMobile content={content} />
      </div>

      {shouldRenderScene ? (
        <div className={`${desktopContainerClass} lg:pt-[var(--tw-4)]`}>
          <Scene
            content={content}
            onLoaded={() => setIsSceneLoaded(true)}
            scrollProgress={effectiveScrollProgress}
            canvasClassName={`h-full ${canvasHeightClass}`}
          />
        </div>
      ) : (
        <div className="hidden lg:block">
          <MainHeroMobile content={content} />
        </div>
      )}
    </section>
  );
};

export default Hero;
