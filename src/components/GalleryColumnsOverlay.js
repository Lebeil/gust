"use client";

import { useEffect, useRef, useState } from "react";

/**
 * GalleryColumnsOverlay
 * Affiche les 3 colonnes (We think → We connect → We produce) par dessus
 * la section "Case studies" quand elle est en plein écran.
 * Animation séquentielle robuste via IntersectionObserver + RAF.
 * Indépendant de VerticalAdsColumns pour éviter tout fond/overlay non désiré.
 */
export default function GalleryColumnsOverlay({
  threshold = 0.6,
  replayOnReenter = true,
  sensitivity = 0.04,
  externalProgress = null, // Progression contrôlée depuis l'extérieur (0 à 1)
}) {
  const hostRef = useRef(null);
  const [internalProgress, setInternalProgress] = useState(0); // 0 → 3
  const [activeIdx, setActiveIdx] = useState(null); // colonne survolée
  
  // Si externalProgress est fourni, l'utiliser, sinon utiliser l'état interne
  const progress = externalProgress !== null ? externalProgress * 3 : internalProgress;

  // Capture wheel global et activation conditionnelle par la position de la section
  // Désactiver si externalProgress est fourni
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (externalProgress !== null) return; // Ne pas gérer le wheel si contrôlé depuis l'extérieur

    const isHostInView = () => {
      const el = hostRef.current;
      if (!el) return false;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight || 0;
      const visibleH = Math.min(vh, Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0)));
      const ratio = visibleH / Math.max(1, Math.min(vh, r.height));
      return ratio >= threshold;
    };

    const onWheelCapture = (e) => {
      try {
        if (typeof e.deltaY !== 'number') return;
        if (!isHostInView()) return; // n'intercepte que quand la galerie est bien visible

        const goingForward = e.deltaY > 0;
        const prev = internalProgress;
        const next = Math.max(0, Math.min(3, prev + e.deltaY * sensitivity));
        const isAnimating = next > 0 + 1e-6 && next < 3 - 1e-6;

        if (next !== prev) setInternalProgress(next);

        if (isAnimating || (prev === 0 && goingForward) || (prev === 3 && !goingForward)) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation?.();
        }
      } catch (_) {}
    };

    window.addEventListener('wheel', onWheelCapture, { passive: false, capture: true });
    return () => window.removeEventListener('wheel', onWheelCapture, true);
  }, [internalProgress, threshold, sensitivity, externalProgress]);

  // Calculs de progression séquentielle 3 colonnes
  const p = Math.max(0, Math.min(3, progress));
  // p de 0 à 3; faire monter les colonnes séquentiellement avec easing
  const ease = (x) => x <= 0 ? 0 : x >= 1 ? 1 : (1 - Math.pow(1 - x, 3));
  const t1 = ease(clamp01(p - 0));
  // Colonnes séquentielles avec délais et accélérations adaptées
  const t2 = ease(clamp01((p - 1) * 1.35));
  const t3 = ease(clamp01((p - 2) * 1.6));

  return (
    <div ref={hostRef} className="absolute inset-0 z-40" style={{ pointerEvents: "auto" }}>
      <div className="relative h-full flex text-white divide-x divide-white divide-x-[3px]">
        <AnimColumn
          index={0}
          activeIdx={activeIdx}
          onHover={setActiveIdx}
          number={null}
          title="We think"
          text="Accompagnement expert avec une stratégie reposant sur des objectifs tangibles."
          tags={["Influence", "Social Media", "UGC"]}
          align="left"
          bottomAlign="right"
          style={{ transform: `translateY(${(1 - t1) * 100}%)`, opacity: t1 }}
        />
        <AnimColumn
          index={1}
          activeIdx={activeIdx}
          onHover={setActiveIdx}
          number={null}
          title="We connect"
          text="Trouver le carrefour d'audience le plus propice pour votre campagne."
          tags={["Influence", "Celebrity", "UGC"]}
          align="left"
          bottomAlign="right"
          style={{ transform: `translateY(${(1 - t2) * 100}%)`, opacity: t2 }}
        />
        <AnimColumn
          index={2}
          activeIdx={activeIdx}
          onHover={setActiveIdx}
          number={null}
          title="We produce"
          text="Créer l'asset le plus efficace pour diffuser votre message tout en stimulant la mémorisation."
          tags={["Visual Creator", "Influence", "UGC"]}
          align="left"
          bottomAlign="right"
          style={{ transform: `translateY(${(1 - t3) * 100}%)`, opacity: t3 }}
        />
      </div>
    </div>
  );
}

function clamp01(x) {
  return Math.max(0, Math.min(1, x));
}

function AnimColumn({ index = 0, activeIdx = null, onHover = () => {}, number, title, text, tags, align = "left", bottomAlign = "right", style }) {
  const GRADIENT_BG = 'linear-gradient(to bottom, #0E152A, #13204A, #1739D0)';
  // Largeur animée façon "onglets" – élargir la colonne survolée
  const isActive = activeIdx === index;
  const basis = isActive ? '72%' : activeIdx === null ? '33.3333%' : '14%';
  return (
    <div
      className="relative h-full px-6 md:px-10"
      style={{
        ...style,
        flexBasis: basis,
        minWidth: 0,
        transition: 'flex-basis 300ms ease, opacity 300ms ease, transform 300ms ease'
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Fond opaque pour masquer le contenu derrière */}
      <div className="absolute inset-0" style={{ background: GRADIENT_BG }} />
      {/* Séparateur vertical blanc net (non transparent) */}
      {index > 0 && <div className="absolute left-0 top-0 h-full w-[1px] bg-white z-20" />}
      {/* Contenu selon état: titre vertical pour les onglets repliés, bloc complet pour l'actif */}
      <div className="relative h-full z-10">
        {isActive ? (
          <div
            className="absolute left-6 md:left-10 max-w-[260px] md:max-w-[540px]"
            style={{ top: '33%', transform: 'translateY(-33%)', transition: 'top 300ms ease, transform 300ms ease' }}
          >
            <h3 className="text-white text-5xl md:text-5xl font-bold tracking-wide mb-5">
              {title}
            </h3>
            <ul className="text-white/90 text-base md:text-xl space-y-2 mb-6">
              {tags.map((t, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="opacity-90">→</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <p className="text-white/90 text-base md:text-lg leading-relaxed pr-6" style={{ lineHeight: '1.5' }}>{text}</p>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-white/85 font-bold tracking-wide select-none text-5xl"
              style={{ transform: 'rotate(-90deg)', whiteSpace: 'nowrap' }}
            >
              {title}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}



