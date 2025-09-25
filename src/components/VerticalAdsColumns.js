"use client";

import { useRef } from "react";

/**
 * VerticalAdsColumns
 * Page de fond "Agence Gust" vierge, puis apparition/animation des 3 colonnes
 * contrôlée par la prop progress (0 → 1) passée depuis le carrousel parent.
 */
export default function VerticalAdsColumns({ progress = 0 }) {
  const containerRef = useRef(null);

  // p: 0→3 pour séquencer 3 colonnes (We think -> We connect -> We produce)
  // Progression réglée pour enchaîner clairement les 3 colonnes
  // Accélère légèrement la seconde étape pour qu'elle suive mieux
  const p = Math.max(0, Math.min(3, progress * 3));
  const t1 = Math.max(0, Math.min(1, p - 0)); // 0→1
  const t2 = Math.max(0, Math.min(1, (p - 1) * 1.15)); // boost 15%
  // Accélère aussi la troisième étape pour garantir la montée complète
  const t3 = Math.max(0, Math.min(1, (p - 2) * 1.35)); // boost +35% pour remonter jusqu'au bout

  return (
    <section ref={containerRef} className="w-full h-[calc(100vh-5vh)] relative overflow-hidden">
      {/* Page de fond "Agence Gust" */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="text-center select-none">
          <div className="text-white/80 text-6xl md:text-7xl font-semibold tracking-wide" style={{fontFamily: 'Avenir Next, Avenir, sans-serif'}}>
            Agence Gust
          </div>
        </div>
      </div>

      {/* 3 colonnes — invisibles tant que progress < seuils */}
      <div className="relative z-[99] h-full grid grid-cols-3 divide-x divide-white/10 text-white/90">
        {/* Colonne 1 */}
        <Column
          number="1"
          title="We think"
          text="Accompagnement expert avec une stratégie reposant sur des objectifs tangibles."
          tags={["Influence", "Social Media", "UGC"]}
          layout="top-left"
          style={{ 
            transform: `translateY(${(1 - t1) * 100}%)`,
            opacity: t1,
            transition: "transform 0.08s linear, opacity 0.08s linear" 
          }}
        />
        {/* Colonne 2 */}
        <Column
          number="2"
          title="We connect"
          text="Trouver le carrefour d'audience le plus propice pour votre campagne."
          tags={["Influence", "Celebrity", "UGC"]}
          layout="center-left"
          style={{ 
            transform: `translateY(${(1 - t2) * 100}%)`,
            opacity: t2,
            transition: "transform 0.08s linear, opacity 0.08s linear" 
          }}
        />
        {/* Colonne 3 */}
        <Column
          number="3"
          title="We produce"
          text="Créer l'asset le plus efficace pour diffuser votre message tout en stimulant la mémorisation."
          tags={["Visual Creator", "Influence", "UGC"]}
          layout="top-right"
          style={{ 
            transform: `translateY(${(1 - t3) * 100}%)`,
            opacity: t3,
            transition: "transform 0.08s linear, opacity 0.08s linear" 
          }}
        />
      </div>
    </section>
  );
}

function Column({ number, title, text, tags, style, layout = "top-left" }) {
  // Positions précises suivant la maquette (offsets en pourcentage/px)
  const positions = {
    "top-left": { top: "32%", left: "6%", right: "auto", align: "left" },
    "center-left": { top: "60%", left: "6%", right: "auto", align: "left", translateY: "-50%" },
    "top-right": { top: "22%", left: "6%", right: "auto", align: "right" },
  };
  const pos = positions[layout] || positions["top-left"];
  return (
    <div className="relative h-full px-10" style={style}>
      {/* Fond plein pour la colonne (couleur du fond du site) */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #1b2a57 0%, #173172 45%, #0f245c 100%)"
        }}
      />
      {/* Numéro en haut */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-white/70" style={{ letterSpacing: "0.05em" }}>
        <span className="block text-[120px] leading-none font-light">{number}</span>
      </div>

      {/* Contenu positionné fidèlement */}
      <div className="relative h-full">
        <div className={`absolute max-w-xs ${pos.align === 'right' ? 'text-right' : 'text-left'}`}
          style={{ top: pos.top, left: pos.left, right: pos.right, transform: pos.translateY ? `translateY(${pos.translateY})` : undefined }}>
          <h3 className={`text-2xl font-semibold mb-3 text-white ${pos.align === 'right' ? 'text-right' : 'text-left'}`}>{title}</h3>
          <p className={`text-sm text-white/85 leading-relaxed ${pos.align === 'right' ? 'text-right' : 'text-left'}`}>{text}</p>
        </div>

        <div className="absolute bottom-20 right-10 space-y-1 text-xs text-white/80 text-right">
          {tags.map((t) => (
            <div key={t}>{t}</div>
          ))}
        </div>
      </div>
    </div>
  );
}


