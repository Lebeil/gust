"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Hero from "@/components/Hero";
import ThreeColumnsAccordion from "@/components/ThreeColumnsAccordion";
import AutoScrollGallery from "@/components/AutoScrollGallery";
import ExpertisesGrid from "@/components/ExpertisesGrid";
import { homePageContent } from "@/data/content";

const HorizontalScroll = () => {
  const trackRef = useRef(null);
  const animationFrameRef = useRef(null);
  const maxOffsetRef = useRef(0);
  const offsetRef = useRef(0);
  const touchStartRef = useRef(null);
  const [trackWidth, setTrackWidth] = useState(0);

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
  const [isInHeroZone, setIsInHeroZone] = useState(true);
  const [transitionProgress, setTransitionProgress] = useState(0);
  
  const slides = useMemo(
    () => [
      {
        id: "hero",
        label: "Section introduction Gust",
        content: (
          <div className="flex h-full w-full items-start justify-start transition-all duration-700 ease-out">
            <Hero content={homePageContent.hero} scrollProgress={scrollProgress} />
          </div>
        ),
        className: "transition-opacity duration-700 ease-out",
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
    [projectsData, scrollProgress]
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

      if (offsetRef.current > heroExtendedZone) {
        const slidesAfterHero = Math.max(slides.length - 1, 0);
        magnetContext = getMagnetizedTransform({
          offsetValue: offsetRef.current,
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
        setIsInHeroZone(true);
        
        if (heroProgress >= 0.98) {
          // Transition progressive à partir de 98%
          const transitionProg = (heroProgress - 0.98) / 0.02;
          setTransitionProgress(transitionProg);
          // Animation fluide vers la section suivante
          transformValue = -transitionProg * viewportWidth;
        } else {
          setTransitionProgress(0);
          transformValue = 0;
        }
      } else {
        // Hors de la zone Hero - défilement magnétique
        setIsInHeroZone(false);

        const slidesAfterHero = Math.max(slides.length - 1, 0);
        const magnetDetails = magnetContext ?? getMagnetizedTransform({
          offsetValue: offsetRef.current,
          viewportWidth,
          slidesCount: slidesAfterHero,
        });

        setTransitionProgress(magnetDetails.localProgress);
        transformValue = magnetDetails.transformValue;
      }

      // Application de la transformation avec transitions fluides
      trackRef.current.style.transform = `translate3d(${transformValue}px, 0, 0)`;
    });
  }, [getMagnetizedTransform, isHeroAnimationComplete, slides.length, updateTrackTransition]);

  const measure = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }

    const viewportWidth = window.innerWidth;
    const heroExtendedZone = viewportWidth * 2; // Zone étendue pour Hero
    // Largeur totale = zone étendue Hero + autres sections normales
    const totalWidth = heroExtendedZone + viewportWidth * (slides.length - 1);
    const maxOffset = Math.max(totalWidth - viewportWidth, 0);

    maxOffsetRef.current = maxOffset;
    offsetRef.current = clampOffset(offsetRef.current);
    setTrackWidth(viewportWidth * slides.length); // Largeur visuelle normale pour le rendu
    applyTransform();
  }, [applyTransform, clampOffset, slides.length]);

  useEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleWheel = (event) => {
      event.preventDefault();

      const dominantDelta = Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
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
      const dominantDelta = Math.abs(deltaY) > Math.abs(deltaX) ? deltaY : -deltaX;

      if (Math.abs(dominantDelta) < 2) {
        return;
      }

      event.preventDefault();

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
  }, [applyTransform, clampOffset, measure]);

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
      
      {/* Indicateur de progression pour l'animation Hero */}
      {scrollProgress < 0.98 && !isHeroAnimationComplete && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2">
          <div className="text-white/70 text-sm font-medium">
            {scrollProgress < 0.95 ? "Continuez à défiler pour voir l'animation" : "Découvrez notre CTA ↓"}
          </div>
          <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-300"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
          <div className="text-white/50 text-xs">
            {Math.round(scrollProgress * 100)}%
          </div>
        </div>
      )}
      
      {/* Indicateur de transition en cours */}
      {scrollProgress >= 0.98 && scrollProgress < 1 && isInHeroZone && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2">
          <div className="text-white font-medium animate-pulse">
            Transition en cours... ✨
          </div>
          <div className="w-40 h-1 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-300"
              style={{ width: `${transitionProgress * 100}%` }}
            />
          </div>
        </div>
      )}
      
      {/* Message quand l'animation est terminée mais avant transition */}
      {isHeroAnimationComplete && isInHeroZone && scrollProgress < 0.98 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 animate-pulse">
          <div className="text-white font-medium">
            Profitez du CTA ! Continuez à défiler pour la suite →
          </div>
        </div>
      )}
    </div>
  );
};

const ProjectsSection = ({ projectsData }) => {
  const [galleryApi, setGalleryApi] = useState(null);

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
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-colors durée-200 hover:border-white/60 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
          scrollable
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

  const expertises = useMemo(
    () => ["production", "social", "ugc", "celebrity", "influence"],
    []
  );

  const handlePrevious = useCallback(() => {
    setCurrentExpertise((previous) => (previous === 0 ? expertises.length - 1 : previous - 1));
  }, [expertises.length]);

  const handleNext = useCallback(() => {
    setCurrentExpertise((previous) => (previous === expertises.length - 1 ? 0 : previous + 1));
  }, [expertises.length]);

  return (
    <div className="relative #+# flex h-full w-full items-center justify-center">
      <button
        type="button"
        onClick={handlePrevious}
        className="absolute left-6 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-white transition-colors duration-200 hover:border-white/80 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-10 lg:left-16"
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
      <div className="flex h-full w-full items-center justify-center">
        <ExpertisesGridWithControl currentIndex={currentExpertise} />
      </div>
      <button
        type="button"
        onClick={handleNext}
        className="absolute right-6 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justifier-center rounded-full border border-white/30 text-white transition-colors durée-200 hover:border-white/80 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-10 lg:right-16"
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
    </div>
  );
};

const ExpertisesGridWithControl = ({ currentIndex }) => {
  return <ExpertisesGrid forceActiveIndex={currentIndex} />;
};

export default HorizontalScroll;

