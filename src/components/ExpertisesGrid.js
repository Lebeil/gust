"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

// Nouvelle maquette interactive "Nos expertises"
// - 1 carte centrale agrandie
// - 4 cartes périphériques sur un arc
// - Survol d'une carte: elle se déplace au centre, s'agrandit et lit la vidéo
export default function ExpertisesGrid() {
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
      },
      {
        id: "celebrity",
        title: "Celebrity",
        description:
          "Accès aux célébrités pour vos campagnes, RSE, B2C et B2B.",
        video: "/assets/media/offres/open16_9.mp4",
      },
      {
        id: "ugc",
        title: "UGC",
        description:
          "Campagnes UGC à grande échelle avec des contenus authentiques.",
        video: "/assets/media/offres/ugc16_9.mp4",
      },
      {
        id: "social",
        title: "Social Media",
        description:
          "Stratégie éditoriale, création et performance sur les plateformes.",
        video: "/assets/media/offres/some16_9.mp4",
      },
      {
        id: "production",
        title: "Production",
        description:
          "3D, stop‑motion, sound design… des contenus à la frontière du réel.",
        video: "/assets/media/offres/production16_9.mp4",
      },
    ],
    []
  );

  const [activeId, setActiveId] = useState(cards[0].id);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [lockedId, setLockedId] = useState(null);
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

  // Positions fidèles à la maquette (gauche -> droite)
  const slots = [
    { x: -480, y: 140, r: -16, scale: 0.72 },
    { x: -260, y: 80, r: -8, scale: 0.86 },
    { x: 0, y: 0, r: 0, scale: 1 }, // centre
    { x: 260, y: 80, r: 8, scale: 0.86 },
    { x: 480, y: 140, r: 16, scale: 0.72 },
  ];

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
    <section className="w-full min-h-[92vh] relative flex items-center justify-center select-none">
      {/* Arc décoratif */}
      <svg className="absolute bottom-0 left-0 right-0 w-full" height="180" viewBox="0 0 1440 180" aria-hidden>
        <path d="M0 178 C 320 40, 1120 40, 1440 178" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
      </svg>

      <div
        className="relative"
        onMouseLeave={() => setLockedId(null)}
        style={{ width: 1040, height: 560, pointerEvents: "auto" }}
      >
        {cards.map((card, idx) => {
          // Éventail dynamique relatif à la carte active
          const slotIndex = getSlotIndex(idx); // 0..4
          const s = slots[slotIndex];
          const isActive = card.id === activeId; // carte au centre si slotIndex === 2
          const baseW = 360;
          const baseH = 520;
          const w = isActive ? baseW : Math.round(baseW * s.scale);
          const h = isActive ? baseH : Math.round(baseH * s.scale);
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
                }, 550);
              }}
              onClick={() => {
                const path = linkById[card.id] || "/work";
                router.push(path);
              }}
              className="absolute rounded-2xl border border-white/50 bg-white/5 backdrop-blur-sm overflow-hidden transition-all duration-300 ease-out will-change-transform cursor-pointer"
              style={{
                width: w,
                height: h,
                left: "50%",
                top: "50%",
                transform: `translate(calc(-50% + ${s.x}px), calc(-50% + ${s.y}px)) rotate(${isActive ? 0 : s.r}deg)`,
                boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
                zIndex: z,
                willChange: "transform, width, height",
                transition: "transform 550ms cubic-bezier(0.25,0.8,0.25,1), width 550ms cubic-bezier(0.25,0.8,0.25,1), height 550ms cubic-bezier(0.25,0.8,0.25,1), box-shadow 550ms ease",
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
                  {/* Aperçu vidéo (image du flux) avec espace autour */}
                  <div className="mt-auto w-full px-3 pb-3">
                    <video
                      className="w-full h-24 object-cover rounded-xl"
                      src={card.video}
                      preload="metadata"
                      muted
                      playsInline
                    />
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




