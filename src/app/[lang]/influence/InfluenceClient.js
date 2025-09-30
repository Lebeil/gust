/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import AutoScrollGallery from "@/components/AutoScrollGallery";
import LogoBanner from "@/components/LogoBanner";
import FaqOffers from "@/components/FaqOffers";
import { MoreIcon } from "@/components/icons/MoreIcon";
import caseStudies from "@/data/caseStudies";
import CinematicFooter from "@/components/CinematicFooter";

export default function InfluenceClient() {
  const [isVisible, setIsVisible] = useState({});
  const [galleryApi, setGalleryApi] = useState(null);
  // Stabilise la callback passée à AutoScrollGallery pour éviter une boucle de rendus
  const handleGalleryApi = useCallback((api) => {
    setGalleryApi(api);
  }, []);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

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

  // Effet parallaxe souris
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePosition({ x: x * 20, y: y * 20 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Combien de temps pour recevoir une recommandation ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "À réception du brief votre recommandation est garantie en 10 jours."
        }
      },
      {
        "@type": "Question",
        name: "Êtes-vous présent dans d'autres pays ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nous travaillons sur l'ensemble de la zone EMEA, USA et Canada."
        }
      }
    ]
  };

  const caseItems = caseStudies.map(cs => ({
    title: cs.title,
    client: cs.client || cs.title,
    poster: cs.posterSrc,
    video: cs.href,
    tags: cs.tags,
    textColor: 'text-white'
  }));

  // Données et états pour les accordéons "approach"
  const thinkItems = [
    { title: 'Overlap.', desc: "Lors d’une campagne, certains créateurs de contenu peuvent avoir une part commune du public ciblé. Déterminez le pourcentage d'audience similaire entre différents profils, c'est-à-dire combien de followers identiques partagent des profils. En calculant l'overlap, vous pouvez faire une analyse complète de votre reach" },
    { title: "Étude d’impact.", desc: "Ajustez vos stratégies et augmentez l’efficacité de vos formats, audiences et créateurs de contenus dans vos campagnes. Comprenez quel type d’influenceur est le plus ROIste pour votre marque. Identifiez les leviers d’acquisitions/ventes réels pour votre marque. Une analyse approfondie de vos campagnes influence pour des résultats quantifiés & qualifiés reposant sur la data." },
    { title: 'Xplain.Ai.', desc: "Mesurer et optimiser l’attention portée à une campagne via un panel de consommateurs en pré‑lancement. Multipliez par deux le taux de mémorisation de vos campagnes avec une étude XPLN.AI. Heat map dans le contexte média, % mémorisation (Ad‑recall), vues, durée effective, corrélations ad‑centric x attention, calcul prédictif du taux d’attention." }
  ];
  const connectItems = [
    { title: 'Casting.', desc: "Nous sélectionnons des profils alignés avec vos valeurs et affinités produits, sans transformer les influenceurs en panneaux publicitaires ni saturer les audiences. Talents fiables, vérifiés pour leur image et leurs précédentes collaborations. KPIs au cœur pour garantir un ROI optimal et un engagement minimum. Castings mêlant influenceurs, célébrités, artistes 3D et push UGC pour une campagne unique." },
    { title: 'UGC.', desc: "Parce que les consommateurs recherchent des avis authentiques et sincères, une campagne UGC est votre allié pour améliorer la notoriété et la visibilité. Obtenez de 100 à 350 assets (IG ou TT) et augmentez la discussion autour de vos produits. Amplifiez vos concepts influence avec des micro‑créateurs pour conquérir votre secteur." },
    { title: 'Ad‑fluence.', desc: "Les algorithmes rendent l’obtention de vues imprévisible. Nous puisons dans la créativité des créateurs, sans exploiter nécessairement leur audience directe: contenus publiés hors feed organique, focus sur le message et l’exécution pour des performances maîtrisées." },
    { title: 'Media.', desc: "Les activations Gust sont pensées pour optimiser le social ads et scaler votre contenu sur l’ensemble de la plateforme de marque. AD‑fluence incarnée pour un ciblage précis et des performances décuplées. Notoriété, communauté, leads: nous set‑up et gérons vos campagnes média." }
  ];
  const produceItems = [
    { title: 'Social Media.', desc: "Stop‑Scroll Specialists: nous captons l’attention dans un flux saturé avec des contenus pensés pour performer. Hook stratégique, éditorial pertinent, approche entertainment. Amplifiez votre visibilité avec l’influence pour faire grandir votre communauté et incarner vos messages." },
    { title: 'UGC.', desc: "Campagnes UGC pour une notoriété authentique. 100 à 350 assets sur la plateforme de votre choix, amplification via micro‑créateurs, et continuité avec vos mécaniques d’influence." }
  ];

  const [thinkOpen, setThinkOpen] = useState(null);
  const [connectOpen, setConnectOpen] = useState(null);
  const [produceOpen, setProduceOpen] = useState(null);

  return (
    <div className="influence-wrapper relative min-h-screen">
      {/* Fond dégradé étendu pour couvrir le footer */}
      <div 
        className="footer-background-wrapper"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundImage: 'url(/images/gradiant_open.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          zIndex: 1
        }}
      />
      <div 
        className="influence-content relative"
        style={{
          zIndex: 10
        }}
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      
      {/* HERO SECTION AVEC VIDEO BACKGROUND */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background avec overlay gradient */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute w-full h-full object-cover opacity-60"
            poster="/assets/media/cases_studies/cover/Quick_cover%202.png"
          >
            <source src="/assets/media/offres/influence16_9.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/60" />
        </div>

        {/* Floating elements avec parallaxe */}
        <div 
          className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
          style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
        />
        <div 
          className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
          style={{ transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)` }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-32 text-center">
          <div 
            id="hero-title" 
            data-animate
            className={`transition-all duration-1000 ${isVisible['hero-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
              <span className="text-white">
                Des campagnes qui
              </span>
              <br />
              <span className="text-white font-semibold" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
                arrêtent le scroll
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-10">
            Nous connectons votre marque aux créateurs de contenu les plus engageants pour générer une notoriété authentique et des résultats mesurables. Arrêtez le scroll, déclenchez l'action.
              <span className="text-white font-semibold"> Recommandation garantie en 10 jours.</span>
            </p>
            

            {/* Trust indicators (pills) */}
            <div className="trust-pills">
              {[
                '+500 campagnes réussies',
                'ROI moyen x2.3',
                '2000+ créateurs vérifiés'
              ].map((label, i) => (
                <div key={i} className="trust-pill">
                  <span className="trust-check">✓</span>
                  <span className="trust-label">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA principal (espaces renforcés comme maquette) */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-64 md:mt-80 lg:mt-[22vh] mb-20 md:mb-28 lg:mb-32">
            <a
              href="#contact"
              className="inline-flex items-center gap-4 text-white text-lg md:text-xl font-medium tracking-normal hover:opacity-95 focus:outline-none"
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

      

      {/* LOGOS BANNER */}
      <section className="relative py-12 overflow-hidden">
        <LogoBanner />
      </section>

      {/* STATS SECTION AVEC ANIMATION */}
      <section className="relative py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div 
            id="stats-grid" 
            data-animate
            className={`grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 delay-200 ${isVisible['stats-grid'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            {[
              { value: '10', unit: 'jours', label: 'Recommandation garantie', color: 'from-purple-500 to-pink-500' },
              { value: '2.3', unit: 'x', label: 'ROI moyen observé', color: 'from-blue-500 to-cyan-500' },
              { value: '35', unit: '%', label: 'Réduction CPA', color: 'from-green-500 to-emerald-500' },
              { value: '15', unit: '+', label: 'Créateurs par campagne', color: 'from-orange-500 to-red-500' }
            ].map((stat, idx) => (
              <div 
                key={idx} 
                className="group relative rounded-2xl border border-white/40 bg-white/20 p-8 hover:scale-105 transition-all duration-300 overflow-hidden"
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

      {/* SECTION PROBLÈME & AGITATION */}
      <section className="relative py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Titre principal */}
          <div className="mb-3">
            <h2 className="text-3xl md:text-4xl font-medium text-white">
              Le marketing d'influence à changé.
            </h2>
          </div>
          <p className="text-white/90 mb-16 text-base md:text-lg font-light">
            Votre stratégie a-t-elle suivi ? Voici les défis que nous aidons nos clients à surmonter chaque jour.
          </p>

          {/* Les 3 défis avec numéros et lignes */}
          <div className="space-y-0">
            {/* Ligne supérieure */}
            <div className="w-full h-[1px] bg-white/40"></div>
            
            {/* Défi 1 */}
            <div className="py-10">
              <div className="flex items-start gap-6 md:gap-12">
                <span className="text-5xl md:text-7xl font-light text-white leading-none" style={{ fontFamily: 'Avenir Next, system-ui, sans-serif' }}>01</span>
                <div className="flex-1 pt-2">
                  <h3 className="text-xl md:text-2xl font-medium text-white mb-4" style={{ fontFamily: 'Avenir Next, system-ui, sans-serif' }}>
                    Le manque de ROI
                  </h3>
                  <p className="text-white/85 leading-relaxed text-base font-light" style={{ fontFamily: 'Avenir Next, system-ui, sans-serif' }}>
                    Vous investissez, mais les résultats peinent à se matérialiser. Les 'likes' ne paient pas les factures et le retour sur investissement est difficile à prouver à votre direction.
                  </p>
                </div>
              </div>
            </div>

            {/* Ligne séparatrice */}
            <div className="w-full h-[1px] bg-white/40"></div>

            {/* Défi 2 */}
            <div className="py-10">
              <div className="flex items-start gap-6 md:gap-12">
                <span className="text-5xl md:text-7xl font-light text-white leading-none" style={{ fontFamily: 'Avenir Next, system-ui, sans-serif' }}>02</span>
                <div className="flex-1 pt-2">
                  <h3 className="text-xl md:text-2xl font-medium text-white mb-4" style={{ fontFamily: 'Avenir Next, system-ui, sans-serif' }}>
                    La Quête d'Authenticité
                  </h3>
                  <p className="text-white/85 leading-relaxed text-base font-light" style={{ fontFamily: 'Avenir Next, system-ui, sans-serif' }}>
                    Trouver des créateurs alignés avec vos valeurs est un parcours du combattant. Le risque d'un partenariat perçu comme 'fake' peut nuire durablement à votre image.
                  </p>
                </div>
              </div>
            </div>

            {/* Ligne séparatrice */}
            <div className="w-full h-[1px] bg-white/40"></div>

            {/* Défi 3 */}
            <div className="py-10">
              <div className="flex items-start gap-6 md:gap-12">
                <span className="text-5xl md:text-7xl font-light text-white leading-none" style={{ fontFamily: 'Avenir Next, system-ui, sans-serif' }}>03</span>
                <div className="flex-1 pt-2">
                  <h3 className="text-xl md:text-2xl font-medium text-white mb-4" style={{ fontFamily: 'Avenir Next, system-ui, sans-serif' }}>
                    La Saturation des Contenus
                  </h3>
                  <p className="text-white/85 leading-relaxed text-base font-light" style={{ fontFamily: 'Avenir Next, system-ui, sans-serif' }}>
                    Votre audience est bombardée de messages. Capter l'attention est un défi constant. Comment émerger au lieu d'être un post de plus, oublié en quelques secondes ?
                  </p>
                </div>
              </div>
            </div>

            {/* Ligne inférieure */}
            <div className="w-full h-[1px] bg-white/40"></div>
          </div>

          {/* Statistique 75% */}
          <div className="mt-20 text-center md:text-left max-w-5xl">
            <p className="text-white text-base md:text-lg leading-relaxed font-light" style={{ fontFamily: 'Avenir Next, system-ui, sans-serif' }}>
              <span className="font-medium">75 % des consommateurs français</span> ont déjà acheté un produit suite à une recommandation d'influenceur. Votre marque saisit-elle cette opportunité ou la laisse-t-elle à vos concurrents ?
            </p>
          </div>
        </div>
      </section>



      {/* SERVICES CARDS AVEC GLASSMORPHISM */}
      <section id="packs" className="relative py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Titre de section */}
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-semibold text-white">Votre Pack</h2>
          </div>

          {/* Grille des cartes */}
          <div 
            id="packs-grid" 
            data-animate
            className={`grid grid-cols-1 md:grid-cols-[repeat(3,max-content)] gap-8 md:gap-16 items-start justify-center transition-all duration-1000 delay-300 ${isVisible['packs-grid'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            {/* Pack Start */}
            <div className="relative rounded-lg border border-white/60 bg-white/10 p-8 w-[280px] md:w-[320px] min-h-[280px] md:min-h-[320px]">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-semibold text-white">Pack Start</h3>
              </div>
              <p className="text-white/80 mb-4">Format One Shot</p>
              <ul className="space-y-2 text-white/85 text-sm">
                <li className="flex gap-2"><span className="text-green-400">✓</span> 3–5 profils</li>
                <li className="flex gap-2"><span className="text-green-400">✓</span> Objectif de visibilité & notoriété ciblée</li>
                <li className="flex gap-2"><span className="text-green-400">✓</span> Prod sous 15 jours</li>
              </ul>
            </div>

            {/* Pack Scale */}
            <div className="relative rounded-lg border border-white/60 bg-white/10 p-8 w-[280px] md:w-[320px] min-h-[280px] md:min-h-[340px]">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-semibold text-white">Pack Scale</h3>
              </div>
              <p className="text-white/80 mb-4">Format One Shot</p>
              <ul className="space-y-2 text-white/85 text-sm">
                <li className="flex gap-2"><span className="text-green-400">✓</span> 10+ profils – contenu optimisé</li>
                <li className="flex gap-2"><span className="text-green-400">✓</span> Visibilité & notoriété ciblée</li>
                <li className="flex gap-2"><span className="text-green-400">+</span> Génération de leads ou trafic web</li>
                <li className="flex gap-2"><span className="text-green-400">✓</span> Prod sous 3 semaines</li>
              </ul>
            </div>

            {/* Pack MMR */}
            <div className="relative rounded-lg border border-white/60 bg-white/10 p-8 w-[280px] md:w-[320px] min-h-[280px] md:min-h-[320px]">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-semibold text-white">Pack MMR</h3>
              </div>
              <p className="text-white/80 mb-4">Abonnement 6 mois</p>
              <ul className="space-y-2 text-white/85 text-sm">
                <li className="flex gap-2"><span className="text-green-400">✓</span> 2 vagues / mois + reporting & coordination</li>
                <li className="flex gap-2"><span className="text-green-400">✓</span> Influence récurrente / CRM social</li>
                <li className="flex gap-2"><span className="text-green-400">✓</span> Prod continue</li>
              </ul>
            </div>
          </div>

          {/* CTA sous la grille */}
          <div className="mt-10 flex justify-center">
            <a href="#contact" className="text-white/90 hover:text-white transition-colors text-base">
              Obtenir ma recommandation 
              <span className="inline-block align-middle ml-2">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* PROCESS TIMELINE */}
      <section id="method" className="relative py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2">Notre méthode éprouvée</h2>
          </div>

          <div 
            id="timeline" 
            data-animate
            className={`relative transition-all duration-1000 delay-400 ${isVisible['timeline'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            {/* Ligne verticale */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-white/60" />

            <div className="space-y-14 md:space-y-28">
              {[
                { step: '01', title: 'Brief & Stratégie', desc: 'Nous analysons vos KPIs, votre audience et votre marché pour construire une stratégie sur-mesure et délivrer le bon message, à la bonne communauté, pour un impact maximal.', side: 'right' },
                { step: '02', title: 'Casting créateurs', desc: 'Accédez à notre réseau privilégié de créateurs. Nous identifions les profils les plus pertinents et authentiques pour incarner votre marque avec passion et crédibilité.', side: 'left' },
                { step: '03', title: 'Production créative', desc: 'Notre studio intégré produit des contenus viraux, esthétiques et ROIstes.', side: 'right' },
                { step: '04', title: 'Amplification', desc: 'Boost paid media et optimisation des performances', side: 'left' },
                { step: '05', title: 'Mesure & Insights', desc: 'Analyse des KPIs et recommandations pour la suite', side: 'right' }
              ].map((item, idx) => (
                <div key={idx} className={`relative flex items-center ${item.side === 'right' ? 'md:flex-row-reverse' : ''}`}>
                  <div className={`w-full md:w-1/2 ${item.side === 'right' ? 'md:pl-12' : 'md:pr-12'}`}>
                    <div className="relative rounded-lg border border-white/30 bg-white/10 backdrop-blur-md p-6">
                      <span className="absolute top-3 right-4 text-white/60 text-xs font-semibold">{item.step}</span>
                      <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{item.title}</h3>
                      <p className="text-white/75 text-sm md:text-base leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rounded-full ring-4 ring-white/20" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
                {/* STRATEGY / CONNECTION / PRODUCTION SECTION (après Timeline) */}
                <section id="approach" className="relative py-20 px-6 md:px-12">
                  <div className="max-w-7xl mx-auto">
                    {/* We think */}
                    <div className="w-full max-w-5xl mx-auto mb-12">
                      <h2 className="text-white text-xl tracking-wide mb-4 font-bold">We think.</h2>
                      <div className="divide-y divide-white/15 border-t border-white/15 border-b">
                        {thinkItems.map((item, idx) => {
                          const isOpen = thinkOpen === idx;
                          return (
                            <div key={`think-${idx}`} className="py-0">
                              <button
                                type="button"
                                className={`w-full text-left flex items-center gap-4 md:gap-6 px-4 -mx-4 pt-3 pb-5 md:pt-3 md:pb-6 rounded-xl focus:outline-none transition-colors ${isOpen ? '' : 'hover:bg-white/5 focus:ring-2 focus:ring-white/20'}`}
                                aria-expanded={isOpen}
                                aria-controls={`think-panel-${idx}`}
                                onClick={() => setThinkOpen(prev => prev === idx ? null : idx)}
                              >
                                <span className="text-white font-normal text-sm md:text-base leading-none">
                                  {item.title}
                                </span>
                                <span className="ml-auto">
                                  <MoreIcon size={18} strokeWidth={2} isOpen={isOpen} />
                                </span>
                              </button>
                              <div
                                id={`think-panel-${idx}`}
                                className={`overflow-hidden transition-[max-height,opacity] duration-300 ${isOpen ? 'opacity-100 max-h-48 md:max-h-56 py-0 md:py-1' : 'opacity-70 max-h-0 py-0'}`}
                              >
                                <div className="pr-8 md:pr-16">
                                  <p className="text-white/75 text-sm md:text-base leading-tight">
                                    {item.desc}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* We connect */}
                    <div className="w-full max-w-5xl mx-auto mb-12">
                      <h2 className="text-white text-xl tracking-wide mb-4 font-bold">We connect.</h2>
                      <div className="divide-y divide-white/15 border-t border-white/15 border-b">
                        {connectItems.map((item, idx) => {
                          const isOpen = connectOpen === idx;
                          return (
                            <div key={`connect-${idx}`} className="py-0">
                              <button
                                type="button"
                                className={`w-full text-left flex items-center gap-4 md:gap-6 px-4 -mx-4 pt-3 pb-5 md:pt-3 md:pb-6 rounded-xl focus:outline-none transition-colors ${isOpen ? '' : 'hover:bg-white/5 focus:ring-2 focus:ring-white/20'}`}
                                aria-expanded={isOpen}
                                aria-controls={`connect-panel-${idx}`}
                                onClick={() => setConnectOpen(prev => prev === idx ? null : idx)}
                              >
                                <span className="text-white font-normal text-sm md:text-base leading-none">
                                  {item.title}
                                </span>
                                <span className="ml-auto">
                                  <MoreIcon size={18} strokeWidth={2} isOpen={isOpen} />
                                </span>
                              </button>
                              <div
                                id={`connect-panel-${idx}`}
                                className={`overflow-hidden transition-[max-height,opacity] duration-300 ${isOpen ? 'opacity-100 max-h-48 md:max-h-56 py-0 md:py-1' : 'opacity-70 max-h-0 py-0'}`}
                              >
                                <div className="pr-8 md:pr-16">
                                  <p className="text-white/75 text-sm md:text-base leading-tight">
                                    {item.desc}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* We produce */}
                    <div className="w-full max-w-5xl mx-auto">
                      <h2 className="text-white text-xl tracking-wide mb-4 font-bold">We produce.</h2>
                      <div className="divide-y divide-white/15 border-t border-white/15 border-b">
                        {produceItems.map((item, idx) => {
                          const isOpen = produceOpen === idx;
                          return (
                            <div key={`produce-${idx}`} className="py-0">
                              <button
                                type="button"
                                className={`w-full text-left flex items-center gap-4 md:gap-6 px-4 -mx-4 pt-3 pb-5 md:pt-3 md:pb-6 rounded-xl focus:outline-none transition-colors ${isOpen ? '' : 'hover:bg-white/5 focus:ring-2 focus:ring-white/20'}`}
                                aria-expanded={isOpen}
                                aria-controls={`produce-panel-${idx}`}
                                onClick={() => setProduceOpen(prev => prev === idx ? null : idx)}
                              >
                                <span className="text-white font-normal text-sm md:text-base leading-none">
                                  {item.title}
                                </span>
                                <span className="ml-auto">
                                  <MoreIcon size={18} strokeWidth={2} isOpen={isOpen} />
                                </span>
                              </button>
                              <div
                                id={`produce-panel-${idx}`}
                                className={`overflow-hidden transition-[max-height,opacity] duration-300 ${isOpen ? 'opacity-100 max-h-48 md:max-h-56 py-0 md:py-1' : 'opacity-70 max-h-0 py-0'}`}
                              >
                                <div className="pr-8 md:pr-16">
                                  <p className="text-white/75 text-sm md:text-base leading-tight">
                                    {item.desc}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </section>

      {/* SECTION PREUVE - RÉSULTATS */}
      <section className="relative py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-white">Les résultats parlent d'eux-mêmes</h2>
            <p className="text-white/70 text-sm md:text-base mt-2">Nous ne promettons pas seulement, nous livrons. Découvrez l'impact de nos campagnes.</p>
          </div>

          {/* Étude de cas + Témoignage (alignés en bas) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-[auto,auto] gap-6 items-stretch mb-10">
            {/* Bloc gauche: étude de cas (s'étend sur 2 lignes) */}
            <div className="rounded-lg border border-white/30 bg-white/10 p-6 lg:row-span-2 h-full">
              <p className="text-white/70 text-sm mb-2">Étude de cas : Emma Matelas</p>
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">Conquête de la Gen Z sur TikTok</h3>
              <p className="text-white/75 text-sm md:text-base mb-3"><span className="text-white font-medium">Défi :</span> Accroître la notoriété et la considération d'achat auprès d'un public sceptique face à la publicité traditionnelle.</p>
              <p className="text-white/75 text-sm md:text-base"> <span className="text-white font-medium">Solution Gust :</span> Déploiement d'une campagne multi‑créateurs axée sur l'humour et des challenges viraux (#MonMeilleurDodo) avec des influenceurs natifs de la plateforme.</p>
            </div>

            {/* Bloc droite: témoignage + jauge (ligne 1) */}
            <div className="rounded-lg border border-white/30 bg-white/10 p-6 relative lg:col-start-2 lg:row-start-1">
              <span className="absolute top-3 right-4 text-white/60 text-xs font-semibold">4,25/5</span>
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-flex h-7 w-7 rounded-full bg-orange-400 text-xs font-semibold items-center justify-center">Emma</span>
                <div>
                  <p className="text-white font-semibold leading-none">Juliette Lapauw</p>
                  <p className="text-white/60 text-xs leading-none">Emma Sleep</p>
                </div>
              </div>
              <p className="text-white/75 text-sm md:text-base pr-6">Nous avons toujours collaboré dans une vision long terme et win‑win avec Gust, ils ont très bien compris nos objectifs en tant que marque et ont tout mis en place pour les atteindre. Ils font preuve de flexibilité et réactivité.</p>
              {/* Jauge verticale */}
              <div className="absolute top-10 right-3 h-[100px] w-1 rounded bg-white/15 overflow-hidden">
                <div className="h-[70%] w-full bg-white/60" />
              </div>
            </div>

            {/* Pastilles KPI (ligne 2) */}
            <div className="kpi-grid lg:col-start-2 lg:row-start-2">
              {[{v:'+5M',l:'Vues organiques'},{v:'+25%',l:"Taux d'engagement"},{v:'+15%',l:'Trafic référent'}].map((kpi, i)=> (
                <div key={i} className="kpi-card">
                  <div className="kpi-inner">
                    <p className="kpi-value">{kpi.v}</p>
                    <p className="kpi-label">{kpi.l}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Statistiques */}
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-[repeat(4,max-content)] gap-6 md:gap-10 justify-center justify-items-center">
            {[
              { value: '8500', label: 'Collaborations en 2023' },
              { value: '150', label: 'Clients accompagnés' },
              { value: '700M', label: "d'audience cumulée" },
              { value: '95%', label: 'de satisfaction client' }
            ].map((stat, idx) => (
              <div key={idx} className="relative rounded-xl border border-white/35 bg-white/20 p-6 w-[180px] md:w-[200px] h-[200px] md:h-[220px] text-left flex flex-col justify-center">
                <p className="text-3xl md:text-4xl font-semibold text-white leading-none mb-0">{stat.value}</p>
                <p className="text-white/70 text-base leading-tight whitespace-pre-line">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASES GALLERY */}
      <section id="cases" className="relative py-20 px-6 md:px-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-lg font-semibold tracking-wide">Nos derniers succès</h2>
          <div className="flex items-center gap-3">
            <button type="button" aria-label="Précédent" className="w-8 h-8 rounded-full border border-white/60 text-white grid place-items-center hover:bg-white/10" onClick={() => galleryApi?.prev?.()}>⟵</button>
            <button type="button" aria-label="Suivant" className="w-8 h-8 rounded-full border border-white/60 text-white grid place-items-center hover:bg-white/10" onClick={() => galleryApi?.next?.()}>⟶</button>
          </div>
        </div>
        <AutoScrollGallery images={caseItems.filter(ci => (ci.tags||[]).includes('Influence'))} visibleImages={4} enableAutoScroll={false} scrollable={false} duplicate={false} onApiReady={handleGalleryApi} />
      </section>

      {/* FAQ SECTION (spécifique page Influence) */}
      <section id="faq" className="relative pt-4 pb-6">
        <FaqOffers />
      </section>

      {/* CONTACT FORM (maquette dédiée) */}
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

      {/* FLOATING CTA MOBILE */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-[999]">
        <a 
          href="#contact" 
          className="block text-center px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-xl"
        >
          Lancer ma campagne d'influence →
        </a>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        /* Trust pills */
        .trust-pills{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin:6px 0 0 0}
        .trust-pill{position:relative;display:inline-flex;align-items:center;gap:10px;height:28px;padding:0 14px;border-radius:9999px;color:#fff;border:1px solid rgba(255,255,255,0.45);background:rgba(255,255,255,0.06);box-shadow: inset 0 0 0 1px rgba(255,255,255,0.18)}
        .trust-check{display:inline-grid;place-items:center;width:16px;height:16px;border-radius:9999px;border:1px solid rgba(255,255,255,0.6);font-size:11px;line-height:1;color:#fff;opacity:.95}
        .trust-label{font-size:12px;line-height:1;color:rgba(255,255,255,0.95);font-family:'Avenir Next', Avenir, system-ui, -apple-system, sans-serif}

        /* KPI pills (fidélité maquette) */
        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px; /* ~3 * 4px */
        }
        .kpi-card {
          position: relative;
          height: 56px; /* proche de la maquette */
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.10); /* bg-white/10 */
          border: 1px solid rgba(255, 255, 255, 0.52); /* unique contour */
          box-shadow: none; /* pas de second trait */
          padding: 0; /* pas d'espace de contour interne */
          
        }
        .kpi-inner {
          width: 100%;
          height: 100%;
          border-radius: 10px;
          border: none; /* pas de contour interne */
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0; /* aucun espace entre les deux lignes */
          text-align: center;
        }
        .kpi-value {
          margin: 0;
          color: #fff;
          font-weight: 600; /* Semi-Bold */
          font-size: 14px;
          line-height: 14px; /* collé au label */
          letter-spacing: 0.2px;
          font-family: 'Avenir Next', Avenir, system-ui, -apple-system, sans-serif;
        }
        .kpi-label {
          margin: 0;
          margin-top: -2px; /* force aucun espace visuel */
          color: rgba(255,255,255,0.7);
          font-weight: 400; /* Regular */
          font-size: 11px;
          line-height: 11px; /* collé à la valeur */
          letter-spacing: 0.2px;
          font-family: 'Avenir Next', Avenir, system-ui, -apple-system, sans-serif;
        }
        @media (min-width: 1024px) {
          .kpi-card { height: 60px; border-radius: 14px; }
          .kpi-inner { border-radius: 12px; }
          .kpi-value { font-size: 15px; line-height: 15px; }
          .kpi-label { font-size: 12px; line-height: 12px; }
        }
      `}</style>
      <CinematicFooter />
      </div>
    </div>
  );
}
