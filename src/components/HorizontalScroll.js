"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Hero from "@/components/Hero";
import ThreeColumnsAccordion from "@/components/ThreeColumnsAccordion";
import AutoScrollGallery from "@/components/AutoScrollGallery";
import ExpertisesGrid from "@/components/ExpertisesGrid";
import LogoBanner from "@/components/LogoBanner";
import FaqOverlay from "@/components/FaqOverlay";
import { homePageContent } from "@/data/content";

const HorizontalScroll = () => {
  const trackRef = useRef(null);
  const animationFrameRef = useRef(null);
  const maxOffsetRef = useRef(0);
  const offsetRef = useRef(0);
  const touchStartRef = useRef(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const MOBILE_BREAKPOINT = 1024;

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const handleMediaChange = (event) => {
      setIsMobile(event.matches);
    };

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  const projectsData = useMemo(
    () => [
      {
        title: "Les secrets de Loly",
        client: "OPI",
        video: "/assets/media/cases_studies/Les%20secrets%20de%20loly.mp4",
        poster: "/assets/media/cases_studies/cover/LSL_cover%202.png",
        tags: ["Production"],
        textColor: "text-white",
      },
      {
        title: "La Biche-Renard",
        client: "LA BICHE-RENARD",
        video: "/assets/media/cases_studies/La%20biche%20Renard.mov",
        poster: "/assets/media/cases_studies/cover/LA%20BICHEv.png",
        tags: ["Influence", "Production"],
        textColor: "text-white",
      },
      {
        title: "Vertbaudet",
        client: "VERTBAUDET",
        video: "/assets/media/cases_studies/Verbaudet-cartable.mp4",
        poster: "/assets/media/cases_studies/cover/VERTBAUDET_cover%202.png",
        tags: ["Production", "Social média"],
        textColor: "text-white",
      },
      {
        title: "Vestiaire Collective",
        client: "VESTIAIRE COLLECTIVE",
        video: "/assets/media/cases_studies/Vestiaire_Collective.mp4",
        poster: "/assets/media/cases_studies/cover/VestiaireCo_cover%202.png",
        tags: ["Influence"],
        textColor: "text-white",
      },
      {
        title: "Showroom Privé",
        client: "SHOWROOM PRIVÉ",
        video: "/assets/media/cases_studies/ShowroomBy-Faustine.mp4",
        poster: "/assets/media/cases_studies/cover/Faustine_cover%202.png",
        tags: ["Célébrité", "Production"],
        textColor: "text-white",
      },
      {
        title: "Service Civique Solidarité Seniors",
        client: "WĀJ",
        video: "/assets/media/cases_studies/Service%20civique%20solidarit%C3%A9.mp4",
        poster: "/assets/media/cases_studies/cover/SC2S_cover%202.png",
        tags: ["Influence", "Social média"],
        textColor: "text-white",
      },
    ],
    []
  );

  // Calculer le progress de scroll pour l'animation iPhone
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHeroAnimationComplete, setIsHeroAnimationComplete] = useState(false);
  const [overlayProgress, setOverlayProgress] = useState(0);
  const overlayProgressRef = useRef(0);
  const overlayContainerRef = useRef(null);
  const overlayZoneRef = useRef(0);
  const overlayStartRef = useRef(0);

  const handleOverlayContainerReady = useCallback((node) => {
    overlayContainerRef.current = node;
  }, []);
  
  const slides = useMemo(
    () => [
      {
        id: "hero",
        label: "Section introduction Gust",
        content: isMobile ? (
          <Hero content={homePageContent.hero} scrollProgress={scrollProgress} />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-start gap-[var(--tw-6)] pt-[var(--tw-2)] pb-[var(--tw-32)] transition-all duration-700 ease-out">
            <div className="flex w-full max-w-[1200px] flex-1 items-start justify-center">
              <Hero
                content={homePageContent.hero}
                scrollProgress={scrollProgress}
                variant="compact"
              />
            </div>
            <div className="w-full px-[var(--tw-16)]">
              <LogoBanner />
            </div>
          </div>
        ),
        className: isMobile
          ? "gap-0"
          : "transition-opacity duration-700 ease-out justify-start pt-[var(--tw-12)] lg:pt-[var(--tw-16)] pb-[var(--tw-48)] lg:pb-[var(--tw-64)] gap-[var(--tw-12)]",
      },
      {
        id: "expertises-accordion",
        label: "Expertises Gust",
        content: (
          <div className="w-full h-full">
            <ThreeColumnsAccordion />
          </div>
        ),
        className: "transition-opacity duration-700 ease-in-out",
      },
      {
        id: "projects",
        label: "Nos projets",
        content: <ProjectsSection projectsData={projectsData} />,
        className: " text-white",
      },
      {
        id: "expertises-grid",
        label: "Expertises en détail",
        content: <ExpertisesSection />,
        className: " text-white",
      },
    ],
    [homePageContent.hero, isMobile, projectsData, scrollProgress]
  );

  const clampOffset = useCallback((value) => {
    if (value < 0) {
      return 0;
    }

    if (value > maxOffsetRef.current) {
      return maxOffsetRef.current;
    }

    // Zone de scroll étendue pour la section Hero (2x la largeur d'écran)
    const viewportWidth = window.innerWidth;
    const heroExtendedZone = viewportWidth * 2; // 2x pour l'animation complète
    
    // Si on essaie de passer à la section suivante mais que l'animation n'est pas terminée
    if (value > heroExtendedZone && !isHeroAnimationComplete) {
      return heroExtendedZone; // Rester bloqué à la fin de la zone Hero
    }

    // Sinon, permettre le scroll normal (que l'animation soit terminée ou non)
    return value;
  }, [isHeroAnimationComplete]);

  const getMagnetizedTransform = useCallback(({ offsetValue, viewportWidth, slidesCount }) => {
    if (slidesCount <= 0) {
      return {
        activeSlideIndex: 0,
        localProgress: 0,
        transformValue: -viewportWidth,
      };
    }

    const heroExtendedZone = viewportWidth * 2;
    const beyondOffset = offsetValue - heroExtendedZone;

    if (beyondOffset <= 0) {
      return {
        activeSlideIndex: 0,
        localProgress: 0,
        transformValue: -viewportWidth,
      };
    }

    const clampedBeyondOffset = Math.min(beyondOffset, viewportWidth * slidesCount);
    const rawSlideIndex = Math.floor(clampedBeyondOffset / viewportWidth);
    const activeSlideIndex = Math.min(rawSlideIndex, slidesCount - 1);
    const offsetWithinSlide = clampedBeyondOffset - activeSlideIndex * viewportWidth;
    const magnetThreshold = viewportWidth * 0.35;

    if (offsetWithinSlide <= magnetThreshold) {
      return {
        activeSlideIndex,
        localProgress: 0,
        transformValue: -viewportWidth - activeSlideIndex * viewportWidth,
      };
    }

    const remainingWidth = viewportWidth - magnetThreshold;
    const rawProgress = (offsetWithinSlide - magnetThreshold) / remainingWidth;
    const clampedProgress = Math.min(Math.max(rawProgress, 0), 1);
    const easedProgress = Math.pow(clampedProgress, 0.85);
    const easedOffset = easedProgress * viewportWidth;

    return {
      activeSlideIndex,
      localProgress: clampedProgress,
      transformValue: -viewportWidth - activeSlideIndex * viewportWidth - easedOffset,
    };
  }, []);

  const updateTrackTransition = useCallback((heroProgress, heroExtendedZone, viewportWidth, magnetProgress) => {
    if (!trackRef.current) {
      return;
    }

    const isWithinHeroExtendedZone = offsetRef.current <= heroExtendedZone;
    const shouldEaseIntoAccordion = isWithinHeroExtendedZone && heroProgress >= 0.97;

    if (!shouldEaseIntoAccordion) {
      if (typeof magnetProgress !== "number") {
        trackRef.current.style.transition = "transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        return;
      }

      if (magnetProgress < 0.05) {
        trackRef.current.style.transition = "transform 0.32s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        return;
      }

      if (magnetProgress < 0.6) {
        trackRef.current.style.transition = "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)";
        return;
      }

      trackRef.current.style.transition = "transform 0.36s cubic-bezier(0.22, 1, 0.36, 1)";
      return;
    }

    const progressIntoReveal = (heroProgress - 0.97) / 0.03;
    const clampedProgress = Math.min(Math.max(progressIntoReveal, 0), 1);

    if (clampedProgress < 0.5) {
      trackRef.current.style.transition = "transform 0.42s cubic-bezier(0.22, 1, 0.36, 1)";
      return;
    }

    const easedProgress = Math.pow(clampedProgress, 1.5);
    const duration = 0.4 + easedProgress * 0.4;

    trackRef.current.style.transition = `transform ${duration}s cubic-bezier(0.22, 1, 0.36, 1)`;
  }, []);

  const applyTransform = useCallback(() => {
    if (isMobile) {
      if (trackRef.current) {
        trackRef.current.style.transform = "translate3d(0, 0, 0)";
        trackRef.current.style.transition = "";
      }
      return;
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      if (!trackRef.current) {
        return;
      }

      const viewportWidth = window.innerWidth;
      const heroExtendedZone = viewportWidth * 2;

      // Calcul simple du progress
      const heroProgress = Math.min(offsetRef.current / heroExtendedZone, 1);
      setScrollProgress(heroProgress);

      let magnetContext = null;

      const clampedOffsetForTrack = Math.min(offsetRef.current, overlayStartRef.current || offsetRef.current);

      if (clampedOffsetForTrack > heroExtendedZone) {
        const slidesAfterHero = Math.max(slides.length - 1, 0);
        magnetContext = getMagnetizedTransform({
          offsetValue: clampedOffsetForTrack,
          viewportWidth,
          slidesCount: slidesAfterHero,
        });
      }

      updateTrackTransition(heroProgress, heroExtendedZone, viewportWidth, magnetContext ? magnetContext.localProgress : undefined);

      if (heroProgress >= 0.95 && !isHeroAnimationComplete) {
        setIsHeroAnimationComplete(true);
      }

      // Logique de transformation propre
      let transformValue = 0;

      if (offsetRef.current <= heroExtendedZone) {
        if (heroProgress >= 0.98) {
          const transitionProg = (heroProgress - 0.98) / 0.02;
          transformValue = -transitionProg * viewportWidth;
        } else {
          transformValue = 0;
        }
      } else {
        const slidesAfterHero = Math.max(slides.length - 1, 0);
        const magnetDetails = magnetContext ?? getMagnetizedTransform({
          offsetValue: clampedOffsetForTrack,
          viewportWidth,
          slidesCount: slidesAfterHero,
        });
        transformValue = magnetDetails.transformValue;
      }

      // Application de la transformation avec transitions fluides
      trackRef.current.style.transform = `translate3d(${transformValue}px, 0, 0)`;

      const overlayStart = overlayStartRef.current;
      const overlayZone = overlayZoneRef.current || 1;
      const overlayDelta = Math.max(offsetRef.current - overlayStart, 0);
      const rawOverlayProgress = Math.min(overlayDelta / overlayZone, 1);

      if (Math.abs(rawOverlayProgress - overlayProgressRef.current) > 0.001) {
        overlayProgressRef.current = rawOverlayProgress;
        setOverlayProgress(rawOverlayProgress);
      }
    });
  }, [getMagnetizedTransform, isHeroAnimationComplete, isMobile, slides.length, updateTrackTransition]);

  const measure = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (isMobile) {
      setTrackWidth(0);
      return;
    }

    const viewportWidth = window.innerWidth;
    const heroExtendedZone = viewportWidth * 2; // Zone étendue pour Hero
    // Largeur totale = zone étendue Hero + autres sections normales
    const slidesAfterHero = Math.max(slides.length - 1, 0);
    const overlayZone = viewportWidth;
    const baseTotalWidth = heroExtendedZone + viewportWidth * slidesAfterHero;
    const baseMaxOffset = Math.max(baseTotalWidth - viewportWidth, 0);
    const totalWidth = baseTotalWidth + overlayZone;
    const maxOffset = Math.max(totalWidth - viewportWidth, 0);

    overlayZoneRef.current = overlayZone;
    overlayStartRef.current = baseMaxOffset;
    maxOffsetRef.current = maxOffset;
    offsetRef.current = clampOffset(offsetRef.current);
    setTrackWidth(viewportWidth * slides.length); // Largeur visuelle normale pour le rendu
    applyTransform();
  }, [applyTransform, clampOffset, isMobile, slides.length]);

  useEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    if (typeof window === "undefined" || isMobile) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleWheel = (event) => {
      const isVertical = Math.abs(event.deltaY) >= Math.abs(event.deltaX);
      const overlayFullyVisible = overlayProgressRef.current >= 0.999;
      const overlayContainer = overlayContainerRef.current;

      if (overlayFullyVisible && isVertical) {
        if (event.deltaY > 0 && overlayContainer) {
          return;
        }

        if (event.deltaY < 0 && overlayContainer && overlayContainer.scrollTop > 0) {
          return;
        }
      }

      event.preventDefault();

      const dominantDelta = isVertical ? event.deltaY : event.deltaX;
      offsetRef.current = clampOffset(offsetRef.current + dominantDelta);
      applyTransform();
    };

    const handleResize = () => {
      measure();
    };

    const handleKeyDown = (event) => {
      if (!["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(event.key)) {
        return;
      }

      const overlayFullyVisible = overlayProgressRef.current >= 0.999;
      const overlayContainer = overlayContainerRef.current;

      if (overlayFullyVisible) {
        if (event.key === "ArrowDown") {
          return;
        }

        if (event.key === "ArrowUp" && overlayContainer && overlayContainer.scrollTop > 0) {
          return;
        }
      }

      event.preventDefault();

      const viewportWidth = window.innerWidth;

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        offsetRef.current = clampOffset(offsetRef.current + viewportWidth);
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        offsetRef.current = clampOffset(offsetRef.current - viewportWidth);
      }

      applyTransform();
    };

    const handleTouchStart = (event) => {
      if (event.touches.length !== 1) {
        touchStartRef.current = null;
        return;
      }

      const touch = event.touches[0];
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        offset: offsetRef.current,
      };
    };

    const handleTouchMove = (event) => {
      if (!touchStartRef.current || event.touches.length !== 1) {
        return;
      }

      const touch = event.touches[0];
      const deltaY = touchStartRef.current.y - touch.clientY;
      const deltaX = touchStartRef.current.x - touch.clientX;

      if (Math.abs(deltaX) < 2 && Math.abs(deltaY) < 2) {
        return;
      }

      const isVertical = Math.abs(deltaY) >= Math.abs(deltaX);
      const overlayFullyVisible = overlayProgressRef.current >= 0.999;
      const overlayContainer = overlayContainerRef.current;

      if (overlayFullyVisible && isVertical) {
        if (deltaY > 0 && overlayContainer) {
          return;
        }

        if (deltaY < 0 && overlayContainer && overlayContainer.scrollTop > 0) {
          return;
        }
      }

      event.preventDefault();

      const dominantDelta = isVertical ? deltaY : -deltaX;
      offsetRef.current = clampOffset(touchStartRef.current.offset + dominantDelta);
      applyTransform();
    };

    const handleTouchEnd = () => {
      touchStartRef.current = null;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("touchcancel", handleTouchEnd, { passive: true });

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchEnd);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [applyTransform, clampOffset, isMobile, measure]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    if (isMobile) {
      document.body.style.overflow = "";
    }
  }, [isMobile]);

  if (isMobile) {
    return (
      <div className="flex min-h-screen w-screen flex-col overflow-x-hidden">
        {slides.map((slide) => {
          const baseClasses = "flex min-h-screen w-screen max-w-full flex-col items-stretch justify-center outline-none focus-visible:ring-2 focus-visible:ring-white/50";
          const heroSpecificClasses = "px-0 py-0";
          const defaultSectionClasses = "px-6 py-8 gap-6";
          const sectionClasses = [baseClasses];

          if (slide.id === "hero") {
            sectionClasses.push(heroSpecificClasses);
          } else {
            sectionClasses.push(defaultSectionClasses);
          }

          return (
            <section
              key={slide.id}
              id={slide.id}
              tabIndex={0}
              aria-label={slide.label}
              className={`${sectionClasses.join(" ")} ${slide.className || ""}`}
            >
              {slide.content}
            </section>
          );
        })}
      </div>
    );
  }

  return (
    <div className="relative flex h-screen w-screen overflow-hidden ">
      
      <div
        ref={trackRef}
        className="flex h-full items-stretch"
        style={{ width: trackWidth ? `${trackWidth}px` : "100vw" }}
        role="group"
        aria-label="Défilement horizontal des sections"
      >
    {slides.map((slide, index) => {
      // Toutes les sections sont visibles - la transformation du track contrôle l'affichage
      const sectionOpacity = 1;
      const sectionTransform = 'translateX(0)';
      
      return (
        <section
          key={slide.id}
          id={slide.id}
          tabIndex={0}
          aria-label={slide.label}
          className={`flex h-screen w-screen flex-col items-stretch justify-center gap-6 px-6 py-8 outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:px-10 sm:py-12 lg:px-16 ${slide.className || ""}`}
          style={{
            opacity: sectionOpacity,
            transform: sectionTransform,
            // Assurer que chaque section prend exactement 100vw
            minWidth: '100vw',
            maxWidth: '100vw',
            flexShrink: 0,
          }}
        >
          {slide.content}
        </section>
      );
    })}
  </div>
  <FaqOverlay progress={overlayProgress} onContainerReady={handleOverlayContainerReady} />
</div>
);
};

const ProjectsSection = ({ projectsData }) => {
  const [galleryApi, setGalleryApi] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Détection mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handlePrevious = useCallback(() => {
    galleryApi?.prev();
  }, [galleryApi]);

  const handleNext = useCallback(() => {
    galleryApi?.next();
  }, [galleryApi]);

  return (
    <div className="flex h-full w-full flex-col justify-center gap-12">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold uppercase tracking-[0.3em] text-white/80 md:text-3xl">
          Nos projets
        </h2>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handlePrevious}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-200 hover:border-white/60 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label="Projet précédent"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-200 hover:border-white/60 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label="Projet suivant"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
      <div className="w-full">
        <AutoScrollGallery
          images={projectsData}
          enableAutoScroll
          scrollable={isMobile} // Activer le scrollable uniquement sur mobile
          visibleImages={4}
          onApiReady={setGalleryApi}
          duplicate
          autoScrollSpeed={0.02}
        />
      </div>
    </div>
  );
};

const ExpertisesSection = () => {
  const [currentExpertise, setCurrentExpertise] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const touchStateRef = useRef(null);

  const expertises = useMemo(
    () => ["production", "social", "ugc", "celebrity", "influence"],
    []
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrevious = useCallback(() => {
    setCurrentExpertise((previous) => (previous === 0 ? expertises.length - 1 : previous - 1));
  }, [expertises.length]);

  const handleNext = useCallback(() => {
    setCurrentExpertise((previous) => (previous === expertises.length - 1 ? 0 : previous + 1));
  }, [expertises.length]);

  useEffect(() => {
    if (!isMobile) {
      return;
    }

    const sectionElement = sectionRef.current;
    if (!sectionElement) {
      return;
    }

    const handleTouchStart = (event) => {
      if (event.touches.length !== 1) {
        touchStateRef.current = null;
        return;
      }

      const touch = event.touches[0];
      touchStateRef.current = {
        startX: touch.clientX,
        startY: touch.clientY,
        direction: null,
      };
    };

    const handleTouchMove = (event) => {
      if (!touchStateRef.current || event.touches.length !== 1) {
        return;
      }

      const touch = event.touches[0];
      const deltaX = touchStateRef.current.startX - touch.clientX;
      const deltaY = touchStateRef.current.startY - touch.clientY;

      if (Math.abs(deltaX) <= Math.abs(deltaY) || Math.abs(deltaX) < 18) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      touchStateRef.current.direction = deltaX > 0 ? "next" : "previous";
    };

    const handleTouchEnd = () => {
      const direction = touchStateRef.current?.direction;

      if (direction === "next") {
        handleNext();
      }

      if (direction === "previous") {
        handlePrevious();
      }

      touchStateRef.current = null;
    };

    sectionElement.addEventListener("touchstart", handleTouchStart, { passive: true });
    sectionElement.addEventListener("touchmove", handleTouchMove, { passive: false });
    sectionElement.addEventListener("touchend", handleTouchEnd, { passive: true });
    sectionElement.addEventListener("touchcancel", handleTouchEnd, { passive: true });

    return () => {
      sectionElement.removeEventListener("touchstart", handleTouchStart);
      sectionElement.removeEventListener("touchmove", handleTouchMove);
      sectionElement.removeEventListener("touchend", handleTouchEnd);
      sectionElement.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, [handleNext, handlePrevious, isMobile]);

  return (
    <div
      ref={sectionRef}
      className="relative flex h-full w-full items-center justify-center"
    >
      {!isMobile && (
        <button
          type="button"
          onClick={handlePrevious}
          className="absolute left-6 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-white transition-colors duration-200 hover:border-white/80 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:flex md:left-10 lg:left-16"
          aria-label="Expertise précédente"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}
      <div className="flex h-full w-full items-center justify-center">
        <ExpertisesGridWithControl currentIndex={currentExpertise} />
      </div>
      {!isMobile && (
        <button
          type="button"
          onClick={handleNext}
          className="absolute right-6 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-white transition-colors duration-200 hover:border-white/80 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:right-10 md:flex lg:right-16"
          aria-label="Expertise suivante"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}
    </div>
  );
};

const ExpertisesGridWithControl = ({ currentIndex }) => {
  return <ExpertisesGrid forceActiveIndex={currentIndex} />;
};

export default HorizontalScroll;

