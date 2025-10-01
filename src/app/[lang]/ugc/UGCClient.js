/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import AutoScrollGallery from "@/components/AutoScrollGallery";
import LogoBanner from "@/components/LogoBanner";
import { MoreIcon } from "@/components/icons/MoreIcon";
import caseStudies from "@/data/caseStudies";
import CinematicFooter from "@/components/CinematicFooter";

export default function UGCClient() {
  const [isVisible, setIsVisible] = useState({});
  const heroRef = useRef(null);
  const [galleryApi, setGalleryApi] = useState(null);
  const handleGalleryApi = useCallback((api) => {
    setGalleryApi(api);
  }, []);
  
  // État pour la FAQ UGC
  const [faqOpen, setFaqOpen] = useState(null);

  // Animation d'apparition au scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);


  // Questions FAQ UGC
  const faqItems = [
    {
      q: "Pourquoi utiliser l'UGC ?",
      a: "Parce que ce contenu authentique renforce la confiance et améliore les performances média."
    },
    {
      q: "Quel budget prévoir pour un pack UGC ?",
      a: "Le budget dépend du volume de vidéos et de la durée de l'accompagnement. Nous proposons des formules flexibles et transparentes."
    },
    {
      q: "Quels types de formats sont produits ?",
      a: "Des vidéos natives pour TikTok, Instagram Reels, YouTube Shorts, stories et formats sponsorisés."
    }
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map(item => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a
      }
    }))
  };

  const caseItems = caseStudies.map(cs => ({
    title: cs.title,
    client: cs.client || cs.title,
    poster: cs.posterSrc,
    video: cs.href,
    tags: cs.tags,
    textColor: 'text-white'
  }));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      
      {/* HERO SECTION AVEC VIDEO BACKGROUND */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Video Background avec overlay gradient */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute w-full h-full object-cover"
            poster="/assets/media/cases_studies/cover/Emma_cover.png"
          >
            <source src="/assets/media/offres/ugc16_9.mp4" type="video/webm" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />
        </div>


        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-32 text-center">
          <div 
            id="hero-title" 
            data-animate
            className={`transition-all duration-1000 ${isVisible['hero-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight max-w-4xl mx-auto">
              <span className="text-white">
                Des contenus authentiques,
              </span>
              <br />
              <span className="text-white font-semibold" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
                créés par vos consommateurs
              </span>
            </h1>
            <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed">
              Nous activons des créateurs UGC (User Generated Content) pour produire des vidéos natives, crédibles et engageantes, qui parlent directement à votre audience.
            </p>
            

            {/* Trust indicators (pills) */}
            <div className="flex flex-wrap justify-center gap-2 mt-1">
              {[
                '5000+ créateurs UGC vérifiés',
                '2.4x plus d\'engagement',
                'ROAS moyen 4.2x'
              ].map((label, i) => (
                <div key={i} className="relative inline-flex items-center gap-2 h-6 px-3 rounded-full text-white border border-white/45 bg-white/8 shadow-inner">
                  <span className="inline-grid place-items-center w-3.5 h-3.5 rounded-full border border-white/60 text-[10px] text-white/95">✓</span>
                  <span className="text-[11px] text-white/95" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA principal (espaces réduits pour meilleure proportion) */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 md:mt-16 lg:mt-20 mb-20 md:mb-28 lg:mb-32">
            <a
              href="#contact"
              className="inline-flex items-center gap-3 text-white text-base md:text-lg font-medium tracking-normal hover:opacity-95 focus:outline-none transition-opacity duration-200"
            >
              <span>Obtenir ma recommandation</span>
              <span aria-hidden className="text-white">→</span>
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* FOND DÉGRADÉ POUR LE RESTE DE LA PAGE */}
      <div 
        className="relative"
        style={{
          backgroundImage: 'url(/images/gradiant_ugc.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* LOGOS BANNER */}
        <section className="relative py-12 overflow-hidden">
          <div className="text-center mb-8">
            <p className="text-white/60 text-sm uppercase tracking-wider">Ils nous font confiance</p>
          </div>
          <LogoBanner />
        </section>

        {/* STATS SECTION AVEC ANIMATION */}
        <section className="relative py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div 
            id="stats-grid" 
            data-animate
            className={`grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto transition-all duration-1000 delay-200 ${isVisible['stats-grid'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            {[
              { value: '+1000', unit: '', label: 'UGC produites chaque année', color: 'from-violet-500 to-indigo-500' },
              { value: '+200', unit: '', label: 'créateurs dans notre réseau UGC', color: 'from-indigo-500 to-violet-500' },
              { value: '+70', unit: '%', label: 'de taux de complétion grâce à nos formats', color: 'from-green-500 to-emerald-500' }
            ].map((stat, idx) => (
              <div 
                key={idx} 
                className="group relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                <div className="relative z-10">
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-5xl font-bold text-white">{stat.value}</span>
                    <span className="text-2xl text-white/70">{stat.unit}</span>
                  </div>
                  <p className="text-white/60 text-sm">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES CARDS - DESIGN EXACT MAQUETTE */}
      <section id="packs" className="relative py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
              Votre Pack
            </h2>
          </div>

          <div 
            id="packs-grid" 
            data-animate
            className={`grid md:grid-cols-2 gap-8 max-w-4xl mx-auto transition-all duration-1000 delay-300 ${isVisible['packs-grid'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            {/* Pack Standard */}
            <div className="relative rounded-2xl border border-white/30 bg-white/10 backdrop-blur-sm p-8 text-left">
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>Pack Standard</h3>
                <div className="mb-4">
                  <p className="text-white font-medium mb-1">UGC Factory</p>
                  <p className="text-white font-medium">(abonnement MRR)</p>
                </div>
              </div>
              
              <ul className="space-y-3 text-white/90 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-white/70 mt-0.5">✓</span>
                  <span>(10 assets / mois - engagement 6 mois)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/70 mt-0.5">✓</span>
                  <span>Casting, brief & gestion inclus</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/70 mt-0.5">✓</span>
                  <span>Contenus prêts à diffuser (paid & organique)</span>
                </li>
              </ul>
            </div>

            {/* Pack Premium */}
            <div className="relative rounded-2xl border border-white/30 bg-white/10 backdrop-blur-sm p-8 text-left">
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-3" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>Pack Premium</h3>
                <div className="mb-4">
                  <p className="text-white font-medium mb-1">Pack "Creative Lab"</p>
                </div>
              </div>
              
              <ul className="space-y-3 text-white/90 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-white/70 mt-0.5">✓</span>
                  <span>Créateurs experts (15-100K+ abonnés)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/70 mt-0.5">✓</span>
                  <span>Concepts & scripts validés + 2 allers-retours</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/70 mt-0.5">✓</span>
                  <span>Formats optimisés & droits étendus (paid, B2B, PR...)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/70 mt-0.5"></span>
                  <span>Option tournage studio GUST</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white/70 mt-0.5">✓</span>
                  <span>Idéal pour campagnes brand & lancements produit</span>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA en bas */}
          <div className="text-center mt-12">
            <a 
              href="#contact" 
              className="inline-flex items-center gap-3 text-white text-lg font-medium hover:opacity-90 transition-opacity duration-200"
              style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}
            >
              <span>Obtenir ma recommandation</span>
              <span aria-hidden className="text-white">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* PROCESS TIMELINE - DESIGN MAQUETTE */}
      <section id="method" className="relative py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-2" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>Notre méthode éprouvée</h2>
          </div>

          <div 
            id="timeline" 
            data-animate
            className={`relative transition-all duration-1000 delay-400 ${isVisible['timeline'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-white/40 hidden md:block" />

            <div className="space-y-8 md:space-y-16">
              {[
                { step: '01', title: 'Brief & Cadrage', desc: 'Identification de vos besoins, de la cible et du message à tester.', side: 'right' },
                { step: '02', title: 'Sélection des créateurs', desc: 'Choix des profils UGC adaptés à votre marque et à votre secteur.', side: 'left' },
                { step: '03', title: 'Production', desc: 'Les créateurs filment et montent des vidéos natives optimisées pour les réseaux.', side: 'right' },
                { step: '04', title: 'Suivi & Reporting', desc: 'Déclinaison des contenus, test A/B et suivi des performances.', side: 'left' }
              ].map((item, idx) => (
                <div key={idx} className={`relative flex items-center ${item.side === 'right' ? 'md:flex-row-reverse' : ''}`}>
                  <div className={`w-full md:w-1/2 ${item.side === 'right' ? 'md:pl-16' : 'md:pr-16'}`}>
                    <div className="relative rounded-2xl border border-white/30 bg-white/10 backdrop-blur-sm p-6 md:p-8">
                      <div className="absolute top-4 right-4 md:top-6 md:right-6">
                        <span className="text-white/70 text-sm font-medium">{item.step}</span>
                      </div>
                      <div className="pr-8">
                        <h3 className="text-xl md:text-2xl font-semibold text-white mb-4" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>{item.title}</h3>
                        <p className="text-white/80 text-sm md:text-base leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rounded-full hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STRATEGY / CONNECTION / PRODUCTION SECTION - NOUVEAU DESIGN */}
      <section id="approach" className="relative py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto space-y-16">
          
          {/* We think */}
          <div>
            <h2 className="text-white text-2xl md:text-3xl font-semibold mb-6" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>We think.</h2>
            <p className="text-white text-base md:text-lg leading-relaxed mb-4">
              L'UGC n'est plus une tendance. C'est un levier ROI à piloter.
            </p>
            <p className="text-white/90 text-sm md:text-base leading-relaxed mb-8">
              Chez GUST, l'UGC est un asset stratégique, pensé comme un levier de performance marketing. Notre méthodologie repose 
              sur une vision data-driven, une lecture fine des audiences, et une capacité à prédire les formats qui convertissent.
            </p>
            
            <h3 className="text-white font-medium text-base md:text-lg mb-6">Ce que nous analysons avant chaque activation :</h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="relative rounded-2xl border border-white/30 bg-white/10 p-6">
                <div className="absolute top-4 right-4">
                  <span className="text-white/70 text-xl font-light">+</span>
                </div>
                <h4 className="text-white font-medium mb-3">Scoring des créateurs :</h4>
                <p className="text-white/80 text-sm leading-relaxed">
                  matching affinité produit, taux de conversion estimé, crédibilité perçue.
                </p>
              </div>
              
              <div className="relative rounded-2xl border border-white/30 bg-white/10 p-6">
                <div className="absolute top-4 right-4">
                  <span className="text-white/70 text-xl font-light">+</span>
                </div>
                <h4 className="text-white font-medium mb-3">Tracking full-funnel : analyse</h4>
                <p className="text-white/80 text-sm leading-relaxed">
                  post-campagne du poids réel de l'UGC dans vos conversions (vs brand content / paid ads).
                </p>
              </div>
            </div>
            
            <p className="text-white/90 text-sm md:text-base leading-relaxed">
              <strong className="text-white">85 % des consommateurs font plus confiance à un UGC qu'à une publicité de marque</strong>, 
              et <strong className="text-white">+58 % de visibilité sur les produits UGC-driven</strong>
            </p>
          </div>

          {/* We connect */}
          <div>
            <h2 className="text-white text-2xl md:text-3xl font-semibold mb-6" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>We connect.</h2>
            
            <h3 className="text-white font-medium text-base md:text-lg mb-4">Des visages crédibles, pas des vitrines surutilisées.</h3>
            <p className="text-white/90 text-sm md:text-base leading-relaxed mb-4">
              Nous recrutons pour vous les bons créateurs dans notre base de +400 000 profils (consommateurs, nano, micro).
            </p>
            <p className="text-white/90 text-sm md:text-base leading-relaxed">
              Chaque profil est sélectionné selon des critères avancés : audience, personnalité, style visuel, historique de collaboration, 
              affinité sectorielle...
            </p>
          </div>

          {/* We produce */}
          <div>
            <h2 className="text-white text-2xl md:text-3xl font-semibold mb-6" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>We produce.</h2>
            <p className="text-white text-base md:text-lg leading-relaxed mb-4">
              <strong>L'UGC sans friction. Industrialisé. Clé en main.</strong> Gust est votre content factory UGC intégrée. 
              Nous ne vous livrons pas des fichiers nous orchestrons des contenus prêts à scaler.
            </p>
            
            <h3 className="text-white font-medium text-base md:text-lg mb-6">Ce que nous prenons en charge :</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4 py-3 border-b border-white/20">
                <span className="text-white text-lg font-medium">1</span>
                <span className="text-white/90 text-sm md:text-base">Casting & onboarding des créateurs (france & international)</span>
              </div>
              <div className="flex items-start gap-4 py-3 border-b border-white/20">
                <span className="text-white text-lg font-medium">2</span>
                <span className="text-white/90 text-sm md:text-base">Production des contenus : vidéos courtes, témoignages, stories, TikTok trends, unboxing, etc.</span>
              </div>
              <div className="flex items-start gap-4 py-3 border-b border-white/20">
                <span className="text-white text-lg font-medium">3</span>
                <span className="text-white/90 text-sm md:text-base">Déclinaison pour ads (15s/30s optimisés pour Meta / TikTok)</span>
              </div>
              <div className="flex items-start gap-4 py-3 border-b border-white/20">
                <span className="text-white text-lg font-medium">4</span>
                <span className="text-white/90 text-sm md:text-base">Livraison sur plateforme dédiée</span>
              </div>
            </div>
            
            <p className="text-white/90 text-sm md:text-base leading-relaxed">
              L'UGC n'est plus artisanal. GUST en fait un outil de conversion scalable. Vous pilotez votre marque. On s'occupe du reste.
            </p>
          </div>
        </div>
      </section>

      {/* CASES GALLERY */}
      <section id="cases" className="relative py-20 px-6 md:px-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-lg font-semibold tracking-wide">Nos case studies</h2>
          <div className="flex items-center gap-3">
            <button type="button" aria-label="Précédent" className="w-8 h-8 rounded-full border border-white/60 text-white grid place-items-center hover:bg-white/10" onClick={() => galleryApi?.prev?.()}>⟵</button>
            <button type="button" aria-label="Suivant" className="w-8 h-8 rounded-full border border-white/60 text-white grid place-items-center hover:bg-white/10" onClick={() => galleryApi?.next?.()}>⟶</button>
          </div>
        </div>
        <AutoScrollGallery images={caseItems.filter(ci => (ci.tags||[]).includes('Ugc'))} visibleImages={4} enableAutoScroll={false} scrollable={false} duplicate={false} onApiReady={handleGalleryApi} />
      </section>

      {/* FAQ SECTION UGC */}
      <section id="faq" className="relative pt-4 pb-6">
        <div className="w-full flex items-center justify-center px-6 md:px-10 pt-0 pb-20">
          <div className="w-full max-w-7xl">
            <h2 className="text-white text-xl tracking-wide mb-3 font-bold">FAQ</h2>

            <div className="border-t border-b border-white/20">
              {faqItems.map((item, idx) => {
                
                const isOpen = faqOpen === idx;
                return (
                  <div key={idx} className={`${idx !== faqItems.length - 1 ? 'border-b border-white/20' : ''}`}>
                    <button
                      type="button"
                      className={`w-full text-left flex items-center gap-4 px-4 py-3 rounded-xl transition-colors ${isOpen ? '' : 'hover:bg-white/5'}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${idx}`}
                      onClick={() => setFaqOpen(prev => prev === idx ? null : idx)}
                    >
                      <div className="flex-shrink-0 w-9 h-9 rounded-full border border-white/40 text-white/85 flex items-center justify-center text-sm">
                        {idx + 1}
                      </div>
                      <div className="flex-1 flex items-center gap-3">
                        <span className="text-white font-semibold text-sm" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
                          {item.q}
                        </span>
                        <span className="ml-auto">
                          <MoreIcon size={18} strokeWidth={2} isOpen={isOpen} />
                        </span>
                      </div>
                    </button>
                    <div
                      id={`faq-panel-${idx}`}
                      className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-32 opacity-100 py-2' : 'max-h-0 opacity-70'}`}
                    >
                      <div className="pl-16 pr-6">
                        <p className="text-white/75 text-sm leading-relaxed" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT FORM - DESIGN MAQUETTE */}
      <section id="contact" className="relative pt-12 pb-24 px-6 md:px-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2" style={{fontFamily:'Avenir Next, Avenir, system-ui, sans-serif'}}>Prêt à faire décoller votre marque ?</h2>
            <p className="text-white/70 text-sm" style={{fontFamily:'Avenir Next, Avenir, system-ui, sans-serif'}}>Recevez votre recommandation personnalisée en 10 jours</p>
          </div>

          <form className="space-y-5">
            <div className="grid md:grid-cols-1 gap-4">
              <div>
                <label className="block text-white/70 text-[12px] mb-1">Nom *</label>
                <input type="text" placeholder="Votre nom" className="w-full h-11 px-5 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/60 transition-colors" />
              </div>
              <div>
                <label className="block text-white/70 text-[12px] mb-1">Email *</label>
                <input type="email" placeholder="Votre@email.com" className="w-full h-11 px-5 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/60 transition-colors" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/70 text-[12px] mb-1">Votre Entreprise</label>
                <input type="text" placeholder="Votre entreprise" className="w-full h-11 px-5 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/60 transition-colors" />
              </div>
              <div>
                <label className="block text-white/70 text-[12px] mb-1">Votre budget</label>
                <select className="w-full h-11 px-5 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/60 transition-colors">
                  <option className="bg-black" value="">Selectionnez votre budget</option>
                  <option className="bg-black" value="5-10k">5-10k€</option>
                  <option className="bg-black" value="10-25k">10-25k€</option>
                  <option className="bg-black" value="25-50k">25-50k€</option>
                  <option className="bg-black" value="50k+">50k€+</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-white/70 text-[12px] mb-1">Message *</label>
              <textarea rows={5} placeholder="Décrivez nous votre projet..." className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/60 transition-colors resize-none" />
            </div>

            <div className="flex items-center gap-3">
              <input type="checkbox" id="consent" className="w-4 h-4" />
              <label htmlFor="consent" className="text-white/60 text-[12px]">J'accepte de recevoir des communications de Gust Agency</label>
            </div>

            <div className="text-center pt-2">
              <button type="button" className="text-white/90 hover:text-white text-sm tracking-wide">
                <span className="inline-block border-b border-white/40 pb-1">Envoyer mon message →</span>
              </button>
            </div>
          </form>
        </div>
      </section>
        <CinematicFooter />
      </div>
    </>
  );
}
