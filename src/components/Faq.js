"use client";

import { useState } from "react";
import { MoreIcon } from "@/components/icons/MoreIcon";
import ClientTestimonials from "@/components/ClientTestimonials";

export const FaqContent = () => {
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
      <ClientTestimonials />
      <section className="flex w-full items-center justify-center px-6 pb-20 pt-0 md:px-10">
        <div className="w-full max-w-7xl">
          <h2 className="mb-2 text-xl font-bold tracking-wide text-white">FAQ</h2>

          <div className="divide-y divide-white/15 border-b border-t border-white/15">
            {items.map((item, idx) => {
              const isOpen = open === idx;
              return (
                <div key={idx} className="py-0">
                  <button
                    type="button"
                    className={`-mx-4 flex w-full items-center gap-4 px-4 py-2 text-left transition-colors focus:outline-none md:gap-6 md:py-3 ${
                      isOpen ? '' : 'hover:bg-white/5 focus:ring-2 focus:ring-white/20'
                    }`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${idx}`}
                    onClick={() => toggle(idx)}
                  >
                    <div className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full border border-white/30 text-sm text-white/80">
                      {idx + 1}
                    </div>
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <span className="text-base font-semibold leading-none text-white md:text-lg">
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
                      isOpen ? 'max-h-48 opacity-100 md:max-h-56 md:py-1' : 'max-h-0 opacity-70'
                    }`}
                  >
                    <div className="pl-16 pr-8 pb-4 md:pl-20 md:pr-16">
                      <p className="text-sm leading-tight text-white/75 md:text-base">
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
};

export default function Faq() {
  return <FaqContent />;
}


