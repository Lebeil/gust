"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { detectSafari } from "@/lib/browserUtils";
import Image from "next/image";

// Nouvelle maquette interactive "Nos expertises"
// - 1 carte centrale agrandie
// - 4 cartes périphériques sur un arc
// - Survol d'une carte: elle se déplace au centre, s'agrandit et lit la vidéo
export default function ExpertisesGrid({ forceActiveIndex }) {
  const router = useRouter();
  const pathname = usePathname();
  const langPrefix = useMemo(() => {
    const seg = pathname ? pathname.split("/")[1] : "fr-fr";
    return `/${seg}`;
  }, [pathname]);

  const cards = useMemo(
    () => [
      {
        id: "influence",
        title: "Influence",
        description:
          "Des créateurs de contenus avec une communauté engagée, utilisés pour leur créativité, leur image et leur expérience.",
        video: "/assets/media/offres/influence16_9.mp4",
        poster: "/assets/media/cases_studies/cover/Faustine_cover.png", // Utiliser une image existante comme aperçu
      },
      {
        id: "celebrity",
        title: "Celebrity",
        description:
          "Accès aux célébrités pour vos campagnes, RSE, B2C et B2B.",
        video: "/assets/media/offres/open16_9.mp4",
        poster: "/assets/media/cases_studies/cover/Geraldine_Cover.png",
      },
      {
        id: "ugc",
        title: "UGC",
        description:
          "Campagnes UGC à grande échelle avec des contenus authentiques.",
        video: "/assets/media/offres/ugc16_9.mp4",
        poster: "/assets/media/cases_studies/cover/Emma_cover.png",
      },
      {
        id: "social",
        title: "Social Media",
        description:
          "Stratégie éditoriale, création et performance sur les plateformes.",
        video: "/assets/media/offres/some16_9.mp4",
        poster: "/assets/media/cases_studies/cover/Orange_cover.png",
      },
      {
        id: "production",
        title: "Production",
        description:
          "3D, stop‑motion, sound design… des contenus à la frontière du réel.",
        video: "/assets/media/offres/production16_9.mp4",
        poster: "/assets/media/cases_studies/cover/LSL_cover.png",
      },
    ],
    []
  );

  const [activeId, setActiveId] = useState(cards[0].id);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [lockedId, setLockedId] = useState(null);
  const [isSafari, setIsSafari] = useState(false);
  const linkById = useMemo(
    () => ({
      production: "/production",
      celebrity: "/celebrity",
      influence: "/influence",
      social: "/social-media",
      ugc: "/ugc",
    }),
    []
  );
  const videoRef = useRef(null);

  // Détection Safari au montage
  useEffect(() => {
    setIsSafari(detectSafari());
  }, []);

  useEffect(() => {
    if (typeof forceActiveIndex !== "number") {
      return;
    }

    const boundedIndex = ((forceActiveIndex % cards.length) + cards.length) % cards.length;
    const targetCard = cards[boundedIndex];

    if (!targetCard || targetCard.id === activeId) {
      return;
    }

    // Safari : changement immédiat sans transition complexe
    if (isSafari) {
      setActiveId(targetCard.id);
    } else {
      setActiveId(targetCard.id);
    }
  }, [activeId, cards, forceActiveIndex, isSafari]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    // Recharge et lit la vidéo du centre à chaque changement d'activeId
    v.pause();
    v.load();
    const play = () => v.play().catch(() => {});
    const t = setTimeout(play, 50);
    return () => clearTimeout(t);
  }, [activeId]);

  // Positions fidèles à la maquette (gauche -> droite) - versions Safari et normale
  const slots = useMemo(() => {
    if (isSafari) {
      // Safari : positions Y minimales pour éviter les décalages
      return [
        { x: -480, y: 20, r: -8, scale: 0.75 }, // Réduction des rotations et décalages Y
        { x: -260, y: 10, r: -4, scale: 0.88 },
        { x: 0, y: 0, r: 0, scale: 1 }, // centre
        { x: 260, y: 10, r: 4, scale: 0.88 },
        { x: 480, y: 20, r: 8, scale: 0.75 },
      ];
    }
    
    // Navigateurs normaux : positions originales
    return [
      { x: -480, y: 60, r: -16, scale: 0.72 },
      { x: -260, y: 30, r: -8, scale: 0.86 },
      { x: 0, y: 0, r: 0, scale: 1 }, // centre
      { x: 260, y: 30, r: 8, scale: 0.86 },
      { x: 480, y: 60, r: 16, scale: 0.72 },
    ];
  }, [isSafari]);

  // Répartition initiale des cartes (index -> slot), conforme à la maquette
  // 0: centre, 1: droite proche, 2: droite loin, 3: gauche loin, 4: gauche proche
  const initialSlotByIndex = [2, 3, 4, 0, 1];

  // Renvoie l'index de slot (0..4) pour une carte selon l'activeId
  const getSlotIndex = (idx) => {
    const activeIdx = cards.findIndex((c) => c.id === activeId);
    const delta = (idx - activeIdx + cards.length) % cards.length; // 0..4 relatif à l'actif
    // delta: 0 -> centre(2), 1 -> droite proche(3), 2 -> droite loin(4), 3 -> gauche loin(0), 4 -> gauche proche(1)
    const map = [2, 3, 4, 0, 1];
    return map[delta];
  };

  return (
    <section className="relative flex w-full min-h-[92vh] select-none items-center justify-center px-4 sm:px-0">
      {/* Arc décoratif */}
      <svg className="absolute bottom-0 left-0 right-0 w-full" height="180" viewBox="0 0 1440 180" aria-hidden>
        <path d="M0 178 C 320 40, 1120 40, 1440 178" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
      </svg>

      <div
        className="relative"
        onMouseLeave={() => setLockedId(null)}
        style={{
          width: typeof window !== "undefined" && window.innerWidth < 768 ? "100%" : 1040,
          maxWidth: "min(100%, 1040px)",
          height: typeof window !== "undefined" && window.innerWidth < 768 ? 480 : 560,
          pointerEvents: "auto",
          // Assurer la stabilité du conteneur pendant les transitions
          overflow: "visible",
          // Correctifs Safari pour éviter les décalages - simplifiés
          ...(isSafari ? {
            transform: "translateZ(0)", // Force l'accélération matérielle
            WebkitTransform: "translateZ(0)",
          } : {}),
        }}
      >
        {cards.map((card, idx) => {
          // Éventail dynamique relatif à la carte active
          const slotIndex = getSlotIndex(idx); // 0..4
          const s = slots[slotIndex];
          const isActive = card.id === activeId; // carte au centre si slotIndex === 2
          const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
          const baseW = isMobile ? 300 : 360;
          const baseH = isMobile ? 440 : 520;
          // Pour Safari, on garde des dimensions fixes et on anime uniquement via transform scale()
          const visualScale = isActive ? 1 : Math.round((s.scale * (isMobile ? 0.9 : 1)) * 100) / 100;
          const w = isSafari ? baseW : (isActive ? baseW : Math.round(baseW * s.scale * (isMobile ? 0.88 : 1)));
          const h = isSafari ? baseH : (isActive ? baseH : Math.round(baseH * s.scale * (isMobile ? 0.9 : 1)));
          const z = isActive ? 30 : 10 + Math.abs(slotIndex - 2);

          return (
            <div
              key={card.id}
              onMouseEnter={() => {
                if (isTransitioning || activeId === card.id) return;
                // Verrou pendant l'animation puis déverrouillage auto pour permettre un nouveau survol sans sortir
                setLockedId(card.id);
                setActiveId(card.id);
                setIsTransitioning(true);
                setTimeout(() => {
                  setIsTransitioning(false);
                  setLockedId(null);
                }, isSafari ? 850 : 450); // Timeout beaucoup plus long pour Safari (synchronisé avec la transition 0.8s)
              }}
              onClick={() => {
                const path = linkById[card.id] || "/work";
                router.push(path);
              }}
              className="absolute rounded-2xl border border-white/50 bg-white/5 overflow-hidden cursor-pointer"
              style={{
                width: w,
                height: h,
                left: "50%",
                top: "50%",
                // Safari: n'animer que le transform avec translate3d + rotate + scale pour éviter tout reflow
                transform: isSafari
                  ? `translate3d(calc(-50% + ${s.x}px), calc(-50% + ${s.y}px), 0) rotate(${isActive ? 0 : s.r}deg) scale(${visualScale})`
                  : `translate(calc(-50% + ${s.x}px), calc(-50% + ${s.y}px)) rotate(${isActive ? 0 : s.r}deg)`,
                boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
                zIndex: z,
                transformOrigin: "50% 50%",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                // Styles complètement différents pour Safari vs autres navigateurs
                ...(isSafari ? {
                  // Safari : styles ultra-simplifiés et transition uniquement du transform
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  transition: "transform 0.6s ease-out, box-shadow 0.6s ease-out",
                  WebkitTransition: "-webkit-transform 0.6s ease-out, box-shadow 0.6s ease-out",
                  willChange: "transform",
                } : {
                  // Autres navigateurs : styles normaux
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  willChange: "transform, width, height",
                  transition: "all 400ms cubic-bezier(0.4, 0.0, 0.2, 1)",
                }),
              }}
            >
              {/* Contenu de la carte */}
              {isActive ? (
                <div className="w-full h-full flex flex-col">
                  <div className="p-5">
                    <h3 className="text-white text-xl font-semibold mb-3">{card.title}</h3>
                    <p className="text-white/85 text-sm leading-relaxed">{card.description}</p>
                  </div>
                  {/* Vidéo avec espace périphérique (padding interne) */}
                  <div className="mt-auto h-[56%] px-4 pb-5">
                    <div className="w-full h-full">
                      <video
                        key={card.id}
                        ref={videoRef}
                        className="w-full h-full object-cover rounded-xl"
                        autoPlay
                        muted
                        loop
                        playsInline
                      >
                        <source src={card.video} type="video/mp4" />
                      </video>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full p-4 flex flex-col">
                  <h4 className="text-white/90 text-sm font-semibold mb-2">{card.title}</h4>
                  <p className="text-white/70 text-[11px] leading-snug line-clamp-6">
                    {card.description}
                  </p>
                  {/* Image d'aperçu avec espace autour */}
                  <div className="mt-auto w-full px-3 pb-3">
                    <div className="relative w-full h-24 rounded-xl overflow-hidden">
                      {card.poster ? (
                        <Image
                          src={card.poster}
                          alt={`Aperçu ${card.title}`}
                          fill
                          sizes="(max-width: 768px) 50vw, 240px"
                          className="object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <video
                          className="w-full h-full object-cover"
                          src={card.video}
                          preload="metadata"
                          muted
                          playsInline
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}




