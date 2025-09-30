/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import AutoScrollGallery from "@/components/AutoScrollGallery";
import LogoBanner from "@/components/LogoBanner";
import { MoreIcon } from "@/components/icons/MoreIcon";
import caseStudies from "@/data/caseStudies";
import CinematicFooter from "@/components/CinematicFooter";

export default function SocialMediaClient() {
  const [isVisible, setIsVisible] = useState({});
  const [galleryApi, setGalleryApi] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [faqOpen, setFaqOpen] = useState(null);
  const heroRef = useRef(null);

  const handleGalleryApi = useCallback((api) => {
    setGalleryApi(api);
  }, []);

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
        name: "Pourquoi externaliser votre Social Media ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Parce que nous apportons expertise, créativité et gain de temps, tout en maximisant vos résultats."
        }
      },
      {
        "@type": "Question",
        name: "Quel budget prévoir pour la gestion des réseaux sociaux ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Le budget varie selon le nombre de plateformes, le volume de contenus et l'intensité de la gestion. Nous adaptons nos offres à vos objectifs."
        }
      },
      {
        "@type": "Question",
        name: "Quels réseaux sociaux gérez-vous ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Instagram, TikTok, Facebook, LinkedIn, YouTube et toute autre plateforme pertinente pour votre marque."
        }
      }
    ]
  };

  const caseItems = caseStudies
    .filter(cs => cs.tags.includes("Social média"))
    .map(cs => ({
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
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Video Background avec overlay gradient */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute w-full h-full object-cover"
            poster="/assets/media/cases_studies/cover/ParionsSport.png"
          >
            <source src="/assets/media/offres/some16_9.mp4" type="video/webm" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />
        </div>

        {/* Floating elements avec parallaxe */}
        <div 
          className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-sky-400/20 to-cyan-400/20 rounded-full blur-3xl"
          style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
        />
        <div 
          className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-tr from-cyan-400/20 to-sky-400/20 rounded-full blur-3xl"
          style={{ transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)` }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16 text-center">
          <div 
            id="hero-title" 
            data-animate
            className={`transition-all duration-1000 ${isVisible['hero-title'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
              <span className="text-white">
                Des stratégies et contenus pensés pour vos réseaux
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-8">
            Nous gérons vos réseaux sociaux de A à Z : stratégie éditoriale, création de contenus et gestion quotidienne pour maximiser visibilité et engagement.
            </p>
            

            {/* Trust indicators (pills) */}
            <div className="trust-pills">
              {[
                '+1000 contenus/mois',
                'Engagement x3 garanti',
                '50+ marques actives'
              ].map((label, i) => (
                <div key={i} className="trust-pill">
                  <span className="trust-check">✓</span>
                  <span className="trust-label">{label}</span>
                </div>
              ))}
            </div>
          </div>
            
             {/* CTA principal (espaces renforcés comme maquette) */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-16 md:mt-20 lg:mt-24 mb-8 md:mb-12 lg:mb-16">
              <a
                href="#contact"
                className="inline-flex items-center gap-4 text-white text-lg md:text-xl font-medium tracking-normal hover:opacity-95 focus:outline-none"
              >
              <span>Obtenir ma recommandation</span>
                <span aria-hidden className="text-white">→</span>
              </a>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
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
          backgroundImage: 'url(/images/gradiant_some.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
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
            className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-1000 delay-200 ${isVisible['stats-grid'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            {[
              { value: '+30', unit: '', label: 'comptes gérés par nos équipes chaque année', color: 'from-sky-500 to-cyan-500' },
              { value: '+10', unit: 'M', label: 'd\'utilisateurs touchés via nos campagnes social media', color: 'from-cyan-500 to-sky-500' },
              { value: '+20', unit: '%', label: 'd\'engagement moyen sur les comptes accompagnés', color: 'from-green-500 to-emerald-500' }
            ].map((stat, idx) => (
              <div 
                key={idx} 
                className="group relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-10 hover:scale-105 transition-all duration-300 overflow-hidden text-center"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                <div className="relative z-10">
                  <div className="mb-4">
                    <span className="text-4xl md:text-5xl font-bold text-white">{stat.value}</span>
                    <span className="text-2xl text-white/70">{stat.unit}</span>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES CARDS AVEC GLASSMORPHISM */}
      <section id="packs" className="relative py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="bg-white bg-clip-text text-transparent">
                Votre Pack
              </span>
            </h2>
          </div>

          <div 
            id="packs-grid" 
            data-animate
            className={`grid md:grid-cols-3 gap-8 transition-all duration-1000 delay-300 ${isVisible['packs-grid'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            {/* Pack Light */}
            <div className="relative group rounded-3xl border border-white/20 bg-white/5 backdrop-blur-xl p-8 hover:scale-105 transition-all duration-300">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Social Light</h3>
                <p className="text-white/60">Pour démarrer votre présence</p>
              </div>
              <ul className="space-y-3 mb-8 text-white/80">
                <li>✓ 6 contenus originaux, +</li>
                <li>✓ Stratégie éditoriale</li>
                <li>✓ Modération basique</li>
                <li>✓ Reporting mensuel</li>
              </ul>
            </div>

            {/* Pack Start - Featured */}
            <div className="relative group rounded-3xl border border-white/20 bg-white/5 backdrop-blur-xl p-8 hover:scale-105 transition-all duration-300">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              
              </div>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Social Start</h3>
                <p className="text-white/60">Pour engager votre communauté</p>
              </div>
              <ul className="space-y-3 mb-8 text-white/90">
                <li>✓ 8 contenus originaux, +</li>
                <li>✓ Stratégie éditoriale</li>
                <li>✓ Modération standard</li>
                <li>✓ Reporting mensuel</li>
                <li>✓ 50% tournés en interne avec notre équipe de production</li>
                <li>✓ 50% incarnés, via des créateurs scriptés, castés et briefés</li>
              </ul>
            </div>

            {/* Pack Reboot */}
            <div className="relative group rounded-3xl border border-white/20 bg-white/5 backdrop-blur-xl p-8 hover:scale-105 transition-all duration-300">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Pack Reboot</h3>
              </div>
              <ul className="space-y-3 mb-8 text-white/80">
                <li>✓ 12 contenus originaux, +</li>
                <li>✓ Stratégie éditoriale</li>
                <li>✓ Modération renforcée</li>
                <li>✓ Reporting avancé mensuel</li>
                <li>✓ 50% tournés en interne avec notre équipe de production</li>
                <li>✓ 50% incarnés, via des créateurs scriptés, castés et briefés</li>
              </ul>
            </div>
          </div>
          
          {/* CTA sous la grille */}
          <div className="mt-16 flex justify-center">
            <a href="#contact" className="inline-flex items-center gap-4 text-white text-lg font-medium tracking-normal hover:opacity-95 focus:outline-none">
              <span>Obtenir ma recommandation</span>
              <span aria-hidden className="text-white">→</span>
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
                { step: '01', title: 'Audit & Recommandation', desc: 'Analyse de vos réseaux actuels et définition d\'une stratégie adaptée.', side: 'right' },
                { step: '02', title: 'Éditorial & Planning', desc: 'Création du calendrier éditorial et des lignes directrices.', side: 'left' },
                { step: '03', title: 'Création & Publication', desc: 'Production de contenus (posts, stories, vidéos) et diffusion programmée.', side: 'right' },
                { step: '04', title: 'Reporting & Optimisation', desc: 'Analyse des performances et ajustements continus.', side: 'left' }
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

      {/* STRATEGY / CONNECTION / PRODUCTION SECTION */}
      <section id="approach" className="relative py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* We think */}
          <div className="w-full mx-auto mb-16">
            <h2 className="text-white text-2xl font-bold mb-4" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>We think.</h2>
            <p className="text-white/90 text-base mb-6 leading-relaxed" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
              Le contenu ne se produit pas au hasard. Il se pense, se prédit et s'optimise.<br />
              Chez GUST, chaque vidéo, chaque asset social, chaque shoot repose sur une stratégie claire : capter l'attention, incarner la marque, délivrer un résultat.
            </p>
            <p className="text-white font-medium text-base mb-8" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
              Nos piliers de réflexion :
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Éditorialisation */}
              <div className="relative rounded-2xl border border-white/30 bg-white/10 backdrop-blur-md p-6">
                <div className="absolute top-4 right-4">
                  <span className="text-white/50 text-sm">+</span>
                </div>
                <h3 className="text-white font-semibold text-lg mb-3" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
                  Éditorialisation :
                </h3>
                <p className="text-white/80 text-sm leading-relaxed" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
                  un contenu = un message, une accroche, un angle de tir clair
                        </p>
                      </div>

              {/* Insights plateformes */}
              <div className="relative rounded-2xl border border-white/30 bg-white/10 backdrop-blur-md p-6">
                <div className="absolute top-4 right-4">
                  <span className="text-white/50 text-sm">+</span>
                    </div>
                <h3 className="text-white font-semibold text-lg mb-3" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
                  Insights plateformes :
                </h3>
                <p className="text-white/80 text-sm leading-relaxed" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
                  tendance, formats natifs, codes de l'algorithme, durée optimale
                </p>
                  </div>
            </div>
          </div>

          {/* We connect */}
          <div className="w-full mx-auto mb-16">
            <h2 className="text-white text-2xl font-bold mb-4" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>We connect.</h2>
            <p className="text-white/90 text-base mb-6 leading-relaxed" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
              Un bon contenu, c'est aussi une bonne incarnation. Et un bon casting.<br />
              GUST active un réseau créatif étendu — influenceurs, créateurs UGC, performeurs social-first, talents visuels — pour produire à la vitesse des tendances et à la hauteur de vos exigences.
            </p>
            <p className="text-white font-medium text-base mb-6" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
              Notre méthode :
            </p>
            
            <div className="space-y-0">
              
              {/* Item 1 */}
              <div className="py-6">
                <div className="flex items-start gap-4">
                  <span className="text-white font-bold text-base ml-10 mr-5" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>1</span>
                  <div className="flex-1">
                    <p className="text-white/90 text-base leading-relaxed" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
                      <span className="text-white font-medium">Casting créateurs & UGC :</span> profils scriptés, testés, sélectionnés pour leur pouvoir d'adhésion & d'attention
                        </p>
                      </div>
                    </div>
              </div>
              
              {/* Ligne séparatrice */}
              <div className="w-full h-[1px] bg-white/30"></div>
              
              {/* Item 2 */}
              <div className="py-6">
                <div className="flex items-start gap-4">
                  <span className="text-white font-bold text-base ml-10 mr-5" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>2</span>
                  <div className="flex-1">
                    <p className="text-white/90 text-base leading-relaxed" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
                      <span className="text-white font-medium">Mutualisation :</span> un tournage = X formats = multi-usages (reels, stories, ads, cut vertical, clips paid)
                    </p>
                  </div>
                </div>
              </div>
              
            </div>
            
            <p className="text-white/80 text-sm mt-6 leading-relaxed" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
              Un contenu incarné par les bons codes, sur les bons canaux, face aux bonnes audiences.
            </p>
          </div>

          {/* We produce */}
          <div className="w-full mx-auto">
            <h2 className="text-white text-2xl font-bold mb-4" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>We produce.</h2>
            <p className="text-white/90 text-base mb-6 leading-relaxed" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
              Chez GUST, on ne livre pas des vidéos. On conçoit des assets calibrés pour faire réagir, aimer, partager et convertir.
            </p>
            <p className="text-white font-medium text-base mb-8" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
              Notre savoir-faire :
            </p>
            
            <div className="space-y-6">
              {[
                { num: '1', title: 'Visual Creators Studio', desc: 'direction artistique, tournage, shooting, montage, sound design' },
                { num: '2', title: 'Content Social-first', desc: 'reels, UGC, TikTok, carrousels, formats ads, templates animés' },
                { num: '3', title: 'Content Factory as a service', desc: 'production à la chaîne, mutualisée, pensée pour les volumes' },
                { num: '4', title: 'SoMe Management', desc: 'stratégie éditoriale, calendrier, publication, modération, reporting' },
                { num: '5', title: 'Optimisation paid & organique', desc: 'hook stratégique, rythme de publication, amplis média' }
              ].map((item, idx, array) => (
                <div key={idx}>
                  <div className="flex items-start gap-4 py-4">
                    <span className="text-white font-bold text-base ml-10 mr-5" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>{item.num}</span>
                    <div className="flex-1">
                      <p className="text-white/90 text-base leading-relaxed" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
                        <span className="text-white font-medium">{item.title} :</span> {item.desc}
                      </p>
                    </div>
                  </div>
                  {idx !== array.length - 1 && <div className="w-full h-[1px] bg-white/30"></div>}
                </div>
              ))}
            </div>
            
            <p className="text-white/80 text-sm mt-8 leading-relaxed" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
              <span className="text-white font-medium">Vous pensez contenu. Nous pensons :</span> stratégie créative, opération fluide, diffusion à impact.
            </p>
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
        <AutoScrollGallery images={caseItems} visibleImages={4} enableAutoScroll={false} scrollable={false} duplicate={false} onApiReady={handleGalleryApi} />
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="relative pt-4 pb-6">
        <div className="w-full flex items-center justify-center px-6 md:px-10 pt-0 pb-20">
          <div className="w-full max-w-7xl">
            <h2 className="text-white text-xl tracking-wide mb-3 font-bold">FAQ</h2>

            <div className="border-t border-b border-white/18">
              {[
                {
                  q: "Pourquoi externaliser votre Social Media ?",
                  a: "Parce que nous apportons expertise, créativité et gain de temps, tout en maximisant vos résultats.",
                },
                {
                  q: "Quel budget prévoir pour la gestion des réseaux sociaux ?",
                  a: "Le budget varie selon le nombre de plateformes, le volume de contenus et l'intensité de la gestion. Nous adaptons nos offres à vos objectifs.",
                },
                {
                  q: "Quels réseaux sociaux gérez-vous ?",
                  a: "Instagram, TikTok, Facebook, LinkedIn, YouTube et toute autre plateforme pertinente pour votre marque.",
                },
              ].map((item, idx, array) => {
                const isOpen = faqOpen === idx;
                return (
                  <div key={idx} className={`${idx !== array.length - 1 ? 'border-b border-white/18' : ''}`}>
                    <button
                      type="button"
                      className="w-full flex items-center gap-4 py-4 text-left focus:outline-none hover:bg-white/5 transition-colors"
                      onClick={() => setFaqOpen(prev => prev === idx ? null : idx)}
                      aria-expanded={isOpen}
                    >
                      <div className="flex-shrink-0 w-9 h-9 rounded-full border border-white/40 flex items-center justify-center text-white/85 text-sm">
                        {idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-sm" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>{item.q}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <MoreIcon size={18} strokeWidth={2} isOpen={isOpen} />
                      </div>
                    </button>
                    <div className={`overflow-hidden transition-[max-height,opacity] duration-300 ${isOpen ? 'opacity-100 max-h-32 pb-4' : 'opacity-0 max-h-0'}`}>
                      <div className="ml-14">
                        <p className="text-white/75 text-sm" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>{item.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
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
                  <option className="bg-black" value="1-5k">1-5k€</option>
                  <option className="bg-black" value="5-15k">5-15k€</option>
                  <option className="bg-black" value="15-30k">15-30k€</option>
                  <option className="bg-black" value="30k+">30k€+</option>
                    </select>
                  </div>
                </div>

                <div>
              <label className="block text-white/70 text-[12px] mb-1">Message *</label>
              <textarea rows={5} placeholder="Décrivez nous votre projet..." className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/60 transition-colors resize-none" />
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
          className="block text-center px-6 py-4 bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-semibold rounded-full shadow-xl"
        >
          Démarrer mon pack social →
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
      `}</style>
        
        <CinematicFooter />
      </div>
    </>
  );
}