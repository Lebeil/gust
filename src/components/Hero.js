"use client";
import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import MainHeroMobile from "@/components/MainHeroMobile";

const Scene = dynamic(() => import("./R3F/Scene"), {
  ssr: false,
});

const Hero = ({ content }) => {
  const [isSceneLoaded, setIsSceneLoaded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

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

  return (
    <section>
      <div className="lg:hidden">
        <MainHeroMobile content={content} />
      </div>

      <div className="hidden lg:block lg:min-h-screen">
        <Scene
          content={content}
          onLoaded={() => setIsSceneLoaded(true)}
        />
      </div>
    </section>
  );
};

export default Hero;
