"use client";

import { useState } from "react";
import { MoreIcon } from "@/components/icons/MoreIcon";

export default function FaqOffers() {
  const items = [
    {
      q: "Combien de temps pour recevoir une recommandation ?",
      a: "À réception du brief votre recommandation est garantie en 10 jours.",
    },
    {
      q: "Êtes‑vous présent dans d'autres pays ?",
      a: "Nous travaillons sur l'ensemble de la zone EMEA, USA et Canada.",
    },
    {
      q: "Quelles sont les célébrités accessibles ?",
      a: "Nous travaillons avec l'ensemble des agents de célébrités cinéma, TV, radio, théâtre ou encore stand‑up.",
    },
    {
      q: "Avez‑vous des talents en interne ?",
      a: "Nous sommes une agence conseil, nous bénéficions du vaste réseau de nos partenaires. De ce fait nous n'avons aucun talent en interne.",
    },
    {
      q: "Quel est le temps de livraison en production ?",
      a: "Nous réalisons nos projets de la conception à la livraison entre 10 et 20 jours sur du brand content.",
    },
  ];

  const [open, setOpen] = useState(null);
  const toggle = (idx) => setOpen((prev) => (prev === idx ? null : idx));

  return (
    <section className="w-full flex items-center justify-center px-6 md:px-10 pt-0 pb-20">
      <div className="w-full max-w-7xl">
        <h2 className="text-white text-xl tracking-wide mb-3 font-bold">FAQ</h2>

        <div className="faq-wrapper">
          {items.map((item, idx) => {
            const isOpen = open === idx;
            return (
              <div key={idx} className="faq-item">
                <button
                  type="button"
                  className={`faq-row ${isOpen ? "" : "faq-row--hover"}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${idx}`}
                  onClick={() => toggle(idx)}
                >
                  <div className="faq-index">{idx + 1}</div>
                  <div className="faq-title">
                    <span className="faq-q">{item.q}</span>
                    <span className="ml-auto"><MoreIcon size={18} strokeWidth={2} isOpen={isOpen} /></span>
                  </div>
                </button>
                <div
                  id={`faq-panel-${idx}`}
                  className={`faq-panel ${isOpen ? "faq-panel--open" : ""}`}
                >
                  <div className="faq-a-wrap">
                    <p className="faq-a">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .faq-wrapper { border-top: 1px solid rgba(255,255,255,0.18); border-bottom: 1px solid rgba(255,255,255,0.18);} 
        .faq-item { }
        .faq-row { width:100%; text-align:left; display:flex; align-items:center; gap:16px; padding:10px 16px; margin-left:-16px; margin-right:-16px; border-radius:12px; transition: background-color .2s ease; }
        .faq-row--hover:hover { background: rgba(255,255,255,0.05); }
        .faq-index { flex:0 0 auto; width:36px; height:36px; border-radius:9999px; border:1px solid rgba(255,255,255,0.4); color:rgba(255,255,255,0.85); display:grid; place-items:center; font-size:14px; }
        .faq-title { flex:1 1 auto; min-width:0; display:flex; align-items:center; gap:12px; }
        .faq-q { color:#fff; font-weight:600; font-size:14px; line-height:16px; font-family:'Avenir Next', Avenir, system-ui, -apple-system, sans-serif; }
        .faq-panel { overflow:hidden; max-height:0; opacity:.7; transition:max-height .3s ease, opacity .3s ease, padding .3s ease; }
        .faq-panel--open { max-height:200px; opacity:1; padding-top:2px; padding-bottom:4px; }
        .faq-a-wrap { padding-left:64px; padding-right:24px; }
        .faq-a { color:rgba(255,255,255,0.75); font-size:13px; line-height:18px; font-family:'Avenir Next', Avenir, system-ui, -apple-system, sans-serif; }
        .faq-item:not(:last-child) { border-bottom: 1px solid rgba(255,255,255,0.18); }
      `}</style>
    </section>
  );
}


