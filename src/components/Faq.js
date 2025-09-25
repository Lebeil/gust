"use client";

import { useState } from "react";
import { MoreIcon } from "@/components/icons/MoreIcon";
import ClientTestimonials from "@/components/ClientTestimonials";

export default function Faq() {
  const items = [
    {
      q: "Combien de temps pour recevoir une recommandation ?",
      a: "À réception du brief votre recommandation est garantie en 10 jours.",
    },
    {
      q: "Êtes-vous présent dans d’autres pays ?",
      a: "Nous travaillons sur l’ensemble de la zone EMEA, USA et Canada.",
    },
    {
      q: "Quelles sont les célébrités accessibles ?",
      a: "Nous travaillons avec l’ensemble des agents de célébrités cinéma, TV, radio, théâtre ou encore stand-up.",
    },
    {
      q: "Avez-vous des talents en interne ?",
      a: "Nous sommes une agence conseil, nous bénéficions du vaste réseau de nos partenaires. De ce fait nous n’avons aucun talent en interne.",
    },
    {
      q: "Quel est le temps de livraison en production ?",
      a: "Nous réalisons nos projets de la conception à la livraison entre 10 et 20 jours sur du brand content.",
    },
  ];

  // Un seul item ouvert à la fois
  const [open, setOpen] = useState(null);

  const toggle = (idx) => {
    setOpen((prev) => (prev === idx ? null : idx));
  };

  return (
    <>
      {/* Section Témoignages */}
      <ClientTestimonials />
      
      {/* Section FAQ */}
      <section className="w-full flex items-center justify-center px-6 md:px-10 pt-0 pb-20">
        <div className="w-full max-w-7xl">
          <h2 className="text-white text-xl tracking-wide mb-2 font-bold">FAQ</h2>

        <div className="divide-y divide-white/15 border-t border-white/15 border-b">
          {items.map((item, idx) => {
            const isOpen = open === idx;
            return (
              <div key={idx} className="py-0">
                <button
                  type="button"
                  className={`w-full text-left flex items-center gap-4 md:gap-6 px-4 -mx-4 py-2 md:py-3 rounded-xl focus:outline-none transition-colors ${
                    isOpen ? '' : 'hover:bg-white/5 focus:ring-2 focus:ring-white/20'
                  }`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${idx}`}
                  onClick={() => toggle(idx)}
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-full border border-white/30 text-white/80 grid place-items-center text-sm">
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0 flex items-center gap-3">
                    <span className="text-white font-semibold text-base md:text-lg leading-none">
                      {item.q}
                    </span>
                    <span className="ml-auto">
                      <MoreIcon size={18} strokeWidth={2} isOpen={isOpen} />
                    </span>
                  </div>
                </button>
                <div
                  id={`faq-panel-${idx}`}
                  className={`overflow-hidden transition-[max-height,opacity] duration-300 ${
                    isOpen ? 'opacity-100 max-h-48 md:max-h-56 py-0 md:py-1' : 'opacity-70 max-h-0 py-0'
                  }`}
                >
                  <div className="pl-16 md:pl-20 pr-8 md:pr-16">
                    <p className="text-white/75 text-sm md:text-base leading-tight">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </section>
    </>
  );
}


