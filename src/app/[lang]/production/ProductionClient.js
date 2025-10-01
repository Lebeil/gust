/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import AutoScrollGallery from "@/components/AutoScrollGallery";
import LogoBanner from "@/components/LogoBanner";
import FaqOffers from "@/components/FaqOffers";
import { MoreIcon } from "@/components/icons/MoreIcon";
import caseStudies from "@/data/caseStudies";
import CinematicFooter from "@/components/CinematicFooter";

export default function ProductionClient() {
  const [isVisible, setIsVisible] = useState({});
  const [galleryApi, setGalleryApi] = useState(null);
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
        name: "Combien de temps pour recevoir mes contenus ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pack Reboot : 7 jours ouvrés. Pack Studio : 14 jours ouvrés incluant le tournage. Pack Craft : 5 jours ouvrés pour la post-production."
        }
      },
      {
        "@type": "Question",
        name: "Puis-je utiliser les contenus sans limite ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, tous nos contenus sont livrés avec une cession de droits complète. Vous pouvez les utiliser à l'infini sur toutes vos plateformes sans coût supplémentaire."
        }
      }
    ]
  };

  // Filtrer les case studies pour Production et créer caseItems
  const caseItems = caseStudies
    .filter(cs => cs.tags.includes("Production"))
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
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Video Background avec overlay gradient */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute w-full h-full object-cover"
            poster="/assets/media/cases_studies/cover/Orange_cover.png"
          >
            <source src="/assets/media/offres/production16_9.mp4" type="video/webm" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />
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
              <span className="bg-white bg-clip-text text-transparent">
              Des contenus taillés pour vos ambitions
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-10">
            Nous produisons vos contenus de A à Z : conception, tournage, post-production et déclinaisons multi-formats pour tous vos canaux digitaux et offline.
            </p>
            

            {/* Trust indicators (pills) */}
            <div className="trust-pills">
              {[
                '+1000 contenus créés',
                'Livraison en 7 jours',
                'Droits illimités'
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
          <div className="absolute bottom-16 md:bottom-20 left-1/2 transform -translate-x-1/2 animate-bounce">
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
          backgroundImage: 'url(/images/gradiant_production.png)',
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
              { value: '+200', unit: '', label: 'productions réalisées\nchaque année', color: 'from-blue-500 to-indigo-500' },
              { value: 'Équipes', unit: '', label: '100% dédiées\n(réalisateurs, DA,\nmonteurs, techniciens)', color: 'from-blue-500 to-indigo-500' },
              { value: 'Formats premium', unit: '', label: 'adaptés aux réseaux, TV\net campagnes 360°', color: 'from-blue-500 to-indigo-500' }
            ].map((stat, idx) => (
              <div 
                key={idx} 
                className="group relative rounded-2xl border border-white/40 bg-white/20 p-8 hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                <div className="relative z-10 text-center">
                  <div className="mb-3">
                    <span className="text-2xl md:text-3xl font-semibold text-white">{stat.value}</span>
                    <span className="text-xl text-white/70 ml-1">{stat.unit}</span>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed whitespace-pre-line">{stat.label}</p>
                </div>
              </div>
            ))}
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
            className={`grid grid-cols-1 lg:grid-cols-3 gap-8 items-start justify-center transition-all duration-1000 delay-300 ${isVisible['packs-grid'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            {/* Pack Reboot */}
            <div className="relative rounded-lg border border-white/60 bg-white/10 p-8 w-full max-w-[380px] mx-auto min-h-[380px] md:min-h-[420px]">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-semibold text-white">Pack Reboot</h3>
              </div>
              <p className="text-white/80 mb-6 text-sm leading-relaxed">
                À partir de vos contenus déjà disponibles (shootings, vidéos, archives, UGC...), nous imaginons de nouvelles productions fortes.
              </p>
              
              <div className="mb-6">
                <p className="text-white font-medium text-sm mb-3">Disponible en :</p>
                <ul className="space-y-2 text-white/85 text-xs">
                  <li className="flex gap-2"><span className="text-green-400">✓</span> PACK ESSENTIEL (05 ASSETS)</li>
                  <li className="flex gap-2"><span className="text-green-400">✓</span> PACK PREMIUM (10 ASSETS)</li>
                  <li className="flex gap-2"><span className="text-green-400">✓</span> PACK CRÉA (20 ASSETS)</li>
              </ul>
              </div>
              
              <div>
                <p className="text-white font-medium text-sm mb-3">Chaque pack inclut :</p>
                <p className="text-white/80 text-xs leading-relaxed">
                  concept créatif, sound design, resizing multi-formats
                </p>
              </div>
            </div>

            {/* Pack Reboot */}
            <div className="relative rounded-lg border border-white/60 bg-white/10 p-8 w-full max-w-[380px] mx-auto min-h-[480px] md:min-h-[520px]">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-semibold text-white">Pack Reboot</h3>
              </div>
              <p className="text-white/80 mb-6 text-sm leading-relaxed">
                Du storytelling au tournage, nous concevons des campagnes et des expériences de contenu pensées pour engager, en misant sur des récits émotionnels et puissants qui renforcent la notoriété de votre marque.
              </p>
              
              <div className="mb-6">
                <p className="text-white font-medium text-sm mb-3">Disponible en :</p>
                <ul className="space-y-2 text-white/85 text-xs">
                  <li className="flex gap-2"><span className="text-green-400">✓</span> PACK ESSENTIEL (05 ASSETS)</li>
                  <li className="flex gap-2"><span className="text-green-400">✓</span> PACK PREMIUM (10 ASSETS)</li>
                  <li className="flex gap-2"><span className="text-green-400">✓</span> PACK CRÉA (20 ASSETS)</li>
              </ul>
              </div>
              
              <div>
                <p className="text-white font-medium text-sm mb-3">Chaque pack inclut :</p>
                <p className="text-white/80 text-xs leading-relaxed">
                  Shootings, Models/actors, concept créatif, Sound design, resizing x3 max
                </p>
              </div>
            </div>

            {/* Pack Reboot */}
            <div className="relative rounded-lg border border-white/60 bg-white/10 p-8 w-full max-w-[380px] mx-auto min-h-[380px] md:min-h-[420px]">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-semibold text-white">Pack Reboot</h3>
              </div>
              <p className="text-white/80 mb-6 text-sm leading-relaxed">
                Avec notre offre Craft, on sublime chaque détail. Nos équipes prennent en main la post-production de vos contenus pour en tirer le meilleur.
              </p>
              
              <div className="mb-6">
                <p className="text-white font-medium text-sm mb-3">Disponible en :</p>
                <ul className="space-y-2 text-white/85 text-xs">
                  <li className="flex gap-2"><span className="text-green-400">✓</span> PACK ONE-SHOT (DIGITAL CONTENT)</li>
                  <li className="flex gap-2"><span className="text-green-400">✓</span> PACK SUR-MESURE (HERO CONTENT)</li>
              </ul>
              </div>
              
              <div>
                <p className="text-white font-medium text-sm mb-3">Chaque pack inclut :</p>
                <p className="text-white/80 text-xs leading-relaxed">
                  concept créatif, sound design, resizing multi-formats
                </p>
              </div>
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
                { step: '01', title: 'Brief & Recommandation', desc: 'Analyse des besoins et définition de la vision créative.', side: 'right' },
                { step: '02', title: 'Pré-Production', desc: 'Écriture du script, storyboard, casting, repérages.', side: 'left' },
                { step: '03', title: 'Tournage', desc: 'Mise en place du plateau, captation par nos équipes techniques.', side: 'right' },
                { step: '04', title: 'Post-Production & Livraison', desc: 'Montage, étalonnage, mixage sonore et déclinaisons multi-format.', side: 'left' }
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

      {/* APPROACH SECTION SELON NOUVELLE STRUCTURE */}
      <section id="approach" className="relative py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          
          {/* We think */}
          <div className="w-full mx-auto mb-16">
            <h2 className="text-white text-2xl font-bold mb-4" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>We think.</h2>
            <p className="text-white/90 text-base mb-6 leading-relaxed" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
              Stratégie créative pilotée par l'attention : Avant d'écrire, on observe. Avant de filmer, on met en place une stratégie créative. Objectif : produire mieux avec des contenus pensés pour générer un impact mesurable.
            </p>
            <p className="text-white font-medium text-base mb-8" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
              Nos outils stratégiques :
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* XPLAIN.AI */}
              <div className="relative rounded-2xl border border-white/30 bg-white/10 backdrop-blur-md p-6">
                <div className="absolute top-4 right-4">
                  <span className="text-white/50 text-sm">+</span>
              </div>
                <h3 className="text-white font-semibold text-lg mb-3" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
                  XPLAIN.AI →
                </h3>
                <p className="text-white/80 text-sm leading-relaxed" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
                  Mesure prédictive d'attention : heatmaps, mémorisation, durée de visionnage, ad recall.
                        </p>
                      </div>

              {/* Performance design */}
              <div className="relative rounded-2xl border border-white/30 bg-white/10 backdrop-blur-md p-6">
                <div className="absolute top-4 right-4">
                  <span className="text-white/50 text-sm">+</span>
                    </div>
                <h3 className="text-white font-semibold text-lg mb-3" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
                  Performance design →
                </h3>
                <p className="text-white/80 text-sm leading-relaxed" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
                  Nous intégrons les logiques paid dès la conception : hooks, loops, formats courts, A/B testabilité.
                </p>
                  </div>
            </div>
          </div>

          {/* We connect */}
          <div className="w-full mx-auto mb-16">
            <h2 className="text-white text-2xl font-bold mb-4" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>We connect.</h2>
            <p className="text-white/90 text-base mb-6 leading-relaxed" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
              Vous avez besoin de vidéo TikTok ? D'un film premium 16/9 ? De 250 assets pour nourrir vos ads ou votre CRM ? GUST connecte votre stratégie à une armée de talents interne ou externe activables à la demande.
            </p>
            <p className="text-white font-medium text-base mb-6" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
              Nos formats clés :
            </p>
            
            <div className="space-y-0">
              
              {/* Item 1 */}
              <div className="py-6">
                <div className="flex items-start gap-4">
                  <span className="text-white font-bold text-base ml-10 mr-5" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>1</span>
                  <div className="flex-1">
                    <p className="text-white/90 text-base leading-relaxed" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
                      <span className="font-semibold">UGC Factory →</span> Créateurs authentiques pour générer des contenus natifs, incarnés, et organiques (100 à 350 assets/mois).
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
                      <span className="font-semibold">Visual Creators →</span> Plus de 200 réalisateurs, illustrateurs, motion designers, 3D artists, photographes, castés selon vos enjeux.
                    </p>
                  </div>
                </div>
                </div>

              {/* Ligne séparatrice */}
              <div className="w-full h-[1px] bg-white/30"></div>
              
              {/* Item 3 */}
              <div className="py-6">
                <div className="flex items-start gap-4">
                  <span className="text-white font-bold text-base ml-10 mr-5" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>3</span>
                  <div className="flex-1">
                    <p className="text-white/90 text-base leading-relaxed" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
                      <span className="font-semibold">IA Creator Studio →</span> Génération de visuels et vidéos à partir de prompts, pour une production ultra-optimisée (produits, modèles, vidéos dynamiques).
                    </p>
                            </div>
            </div>
          </div>

              {/* Ligne séparatrice */}
              <div className="w-full h-[1px] bg-white/30"></div>
              
              {/* Item 4 */}
              <div className="py-6">
                <div className="flex items-start gap-4">
                  <span className="text-white font-bold text-base ml-10 mr-5" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>4</span>
                  <div className="flex-1">
                    <p className="text-white/90 text-base leading-relaxed" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
                      <span className="font-semibold">Directeur Artistique & Réalisateur →</span> Pour des formats hero, shooting photo, ou campagnes visuelles fortes.
                        </p>
                      </div>
                    </div>
                  </div>
              
            </div>
            
            <p className="text-white/80 text-sm mt-6 leading-relaxed" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
              Un vivier d'expertises créatives combiné à un réseau de talents internationaux.
            </p>
                </div>

                {/* We produce */}
          <div className="w-full mx-auto">
            <h2 className="text-white text-2xl font-bold mb-4" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>We produce.</h2>
            <p className="text-white/90 text-base mb-6 leading-relaxed" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
              Stop-Scroll Specialists : nous maîtrisons l'art de capter l'attention dans un flux saturé, avec des contenus pensés et taillés pour performer : trouvez votre hook stratégique avec un éditorial pertinent, des contenus engageants et une approche entertainment. Développez des contenus créatifs afin d'intéresser vos audiences.
            </p>
            <p className="text-white/90 text-base mb-6 leading-relaxed" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
              Vous avez besoin de recycler vos assets ? De produire un pack photo/vidéo complet ? Ou d'un film signature premium ?
            </p>
            <p className="text-white/90 text-base mb-6 leading-relaxed" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
              GUST connecte vos besoins à une production agile, structurée et activable à tous les étages.
            </p>
            <p className="text-white/90 text-base mb-8 leading-relaxed" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
              Une content factory hybride, stratégique comme un cabinet de conseil, créative comme un studio d'artistes, réactive comme une régie intégrée.
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
        <AutoScrollGallery images={caseItems} visibleImages={4} enableAutoScroll={false} scrollable={false} duplicate={false} onApiReady={handleGalleryApi} />
        </section>

      {/* FAQ SECTION PRODUCTION */}
      <section id="faq" className="relative pt-4 pb-6">
          <div className="w-full flex items-center justify-center px-6 md:px-10 pt-0 pb-20">
            <div className="w-full max-w-7xl">
              <h2 className="text-white text-xl tracking-wide mb-3 font-bold">FAQ</h2>

              <div className="border-t border-b border-white/18">
                 {[
                   {
                     q: "Pourquoi travailler avec nous pour votre production ?",
                     a: "Parce que nous gérons l'ensemble de la chaîne, du concept au rendu final, avec des standards de qualité premium.",
                   },
                   {
                     q: "Quel budget prévoir pour une production ?",
                     a: "Il dépend du format (vidéo, photo, film publicitaire) et de l'ampleur du projet. Nous construisons un devis sur-mesure et transparent.",
                   },
                   {
                     q: "Quels types de productions réalisez-vous ?",
                     a: "Des vidéos réseaux sociaux, publicités TV, films institutionnels, captations événementielles, photos de campagne et plus encore.",
                   },
                 ].map((item, idx, array) => (
                  <div key={idx} className={`${idx !== array.length - 1 ? 'border-b border-white/18' : ''}`}>
                    <div className="flex items-center gap-4 py-4">
                      <div className="flex-shrink-0 w-9 h-9 rounded-full border border-white/40 flex items-center justify-center text-white/85 text-sm">
                        {idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-sm mb-1" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>{item.q}</p>
                        <p className="text-white/75 text-sm" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>{item.a}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <MoreIcon size={18} strokeWidth={2} isOpen={false} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
                <label className="block text-white/70 text-[12px] mb-1">Pack souhaité</label>
                <select className="w-full h-11 px-5 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/60 transition-colors">
                  <option className="bg-black" value="">Selectionnez votre pack</option>
                  <option className="bg-black" value="reboot">Pack Reboot</option>
                  <option className="bg-black" value="studio">Pack Studio</option>
                  <option className="bg-black" value="craft">Pack Craft</option>
                  <option className="bg-black" value="custom">Sur-mesure</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-white/70 text-[12px] mb-1">Message *</label>
              <textarea rows={5} placeholder="Décrivez nous votre projet de production..." className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/60 transition-colors resize-none" />
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
    </>
  );
}