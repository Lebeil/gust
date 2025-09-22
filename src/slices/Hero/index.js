"use client";
import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import MainHeroMobile from "@/components/MainHeroMobile";
import SubHero from "@/components/SubHero";

const Scene = dynamic(() => import("../../components/R3F/Scene"), {
  ssr: false,
});

const Hero = ({ slice }) => {
  const [isSceneLoaded, setIsSceneLoaded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)'); // ✅ Tailwind lg breakpoint

    const handleResize = () => {
      setIsDesktop(mediaQuery.matches);
    };

    handleResize(); // ✅ Set initially
    mediaQuery.addEventListener('change', handleResize); // ✅ Listen to changes

    return () => {
      mediaQuery.removeEventListener('change', handleResize); // ✅ Cleanup
    };
  }, []);

  useEffect(() => {
    if (slice.variation === "default" && isDesktop) {
      if (isSceneLoaded) {
        document.body.style.overflow = "auto";
      } else {
        document.body.style.overflow = "hidden";
      }

      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [isSceneLoaded, isDesktop, slice.variation]);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {slice.variation === "default" ? (
        <>
          <div className="lg:hidden">
            <MainHeroMobile slice={slice} />
          </div>

          <div className="hidden lg:block lg:min-h-screen">
            <Scene
              variation={slice.variation}
              slice={slice}
              onLoaded={() => setIsSceneLoaded(true)}
            />
          </div>
        </>
      ) : (
        <div
          className="
            px-[var(--tw-4)] pb-[var(--tw-12)] 
            mb:px-[var(--tw-12)]
            lg:py-0
          "
        >
          <SubHero slice={slice} />
        </div>
      )}
    </section>
  );
};

export default Hero;
