"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import AutoScrollGallery from "@/components/AutoScrollGallery";
import LogoBanner from "@/components/LogoBanner";
import { MoreIcon } from "@/components/icons/MoreIcon";
import CinematicFooter from "@/components/CinematicFooter";
import caseStudies from "@/data/caseStudies";

export default function CelebrityClient() {
  const [isVisible, setIsVisible] = useState({});
  const [galleryApi, setGalleryApi] = useState(null);
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
        name: "Pourquoi travailler avec une célébrité ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Parce qu'elle offre crédibilité, visibilité instantanée et un fort pouvoir d'influence auprès de son audience."
        }
      },
      {
        "@type": "Question",
        name: "Quel est le coût d'une production ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Le montant dépend du profil de la célébrité et du format de l'opération. Nous adaptons nos recommandations à vos objectifs et à vos moyens."
        }
      },
      {
        "@type": "Question",
        name: "Quelle est la différence entre influenceur et célébrité ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Un influenceur est reconnu principalement en ligne, une célébrité a une notoriété publique plus large (TV, cinéma, sport, musique...)."
        }
      }
    ]
  };

  // Système de filtrage basé sur page.js
  const normalize = (s) => (s || "")
    .toLowerCase()
    .normalize('NFD')
    .replace(/\.[^/.]+$/, '')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\b(cover|copie)\b/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

  const buildMeta = (title) => {
    const baseNameNorm = normalize(title);
    const tags = [];
    const has = (k) => baseNameNorm.includes(k);

    if ((has('showroom') && has('prive')) || has('showroomby') || has('showroom')) {
      tags.push('Célébrité', 'Production');
    }
    if (has('showroom') && has('sport')) {
      tags.push('Production', 'Célébrité');
    }
    if (has('faustine') || has('geraldine')) {
      tags.push('Célébrité', 'Production');
    }
    // Événements et collaborations premium
    if (has('event') || has('opening') || has('vip') || has('premium')) {
      tags.push('Célébrité', 'Événementiel');
    }

    return { tags: Array.from(new Set(tags)) };
  };

  // Ajouter les case studies Showroom manquantes (comme dans work/page.js)
  const additionalCelebrityCases = [
    {
      title: "Showroom By Géraldine",
      href: "/assets/media/cases_studies/ShowroomBy-Geraldine.mp4",
      posterSrc: "/assets/media/cases_studies/cover/Geraldine_Cover%202.png",
      tags: ["Célébrité", "Production"],
      client: "Showroom Privé"
    }
  ];

  // Combiner toutes les case studies et filtrer pour Celebrity
  const allCaseStudies = [...caseStudies, ...additionalCelebrityCases];
  
  const celebrityCaseStudies = allCaseStudies
    .map(cs => {
      const meta = buildMeta(cs.title);
      return { ...cs, autoTags: meta.tags };
    })
    .filter(cs => 
      cs.tags.includes("Célébrité") || 
      cs.tags.includes("Celebrity") || 
      cs.autoTags.includes("Célébrité") ||
      // Forcer l'inclusion des cas Showroom
      normalize(cs.title).includes("showroom")
    );

  // Définir caseItems pour la galerie (format compatible AutoScrollGallery)
  const caseItems = allCaseStudies.map(cs => ({
    title: cs.title,
    client: cs.client || cs.title,
    poster: cs.posterSrc,
    video: cs.href,
    tags: cs.tags,
    textColor: 'text-white'
  }));

  const handleGalleryApi = useCallback((api) => {
    setGalleryApi(api);
  }, []);

  const thinkItems = [
    { title: 'Xplain.Ai.', desc: "Mesurer et optimiser l’attention portée à une campagne via un panel de consommateurs en pré‑lancement. Multipliez par deux le taux de mémorisation de vos campagnes avec une étude XPLN.AI. Au programme : Heat map de la publicité dans son contexte média, % mémorisation (Ad‑recall), nombre de vues, durée effective de la vue, un algorithme entrainé pour analyser les corrélations entre ad‑centric et attention, calcul prédictif du taux d’attention de la campagne." }
  ];
  const connectItems = [
    { title: 'Casting.', desc: "Nous sélectionnons des profils alignés avec vos valeurs et affinités produits, sans transformer les influenceurs en panneaux publicitaires ni saturer les audiences. Notre sélection repose sur des talents fiables, vérifiés pour leur image et leurs précédentes collaborations. Les KPIs sont essentiels pour garantir un ROI optimal et un engagement minimum sur vos contenus. Nos castings mêlent créativité et originalité, combinant influenceurs, célébrités, artistes 3D et push UGC pour une campagne unique." },
    { title: 'Ad‑fluence.', desc: "Les algorithmes des réseaux sociaux rendent l’obtention de vues souvent imprévisible et les budgets alloués aux influenceurs parfois disproportionnés par rapport aux résultats. Notre approche repose dans le fait de puiser dans la créativité et la qualité d’exécution des créateurs, sans nécessairement exploiter leur audience directe. Leur contenu est publié en dehors de leur feed organique, ce qui permet de se concentrer sur le contenu et le message." },
    { title: 'Media.', desc: "Les activations Gust sont pensées pour optimiser le social ads et vous permettre de scale votre contenu sur l’ensemble de votre plateforme de marque. L’AD-fluence : incarnés, ces contenus permettent un ciblage très précis afin de toucher votre cœur de cible avec des performances décuplées. Que vous souhaitez accroître votre notoriété, développer votre communauté ou générer des leads, Gust s’occupe de set up et manager vos campagnes média !" }
  ];
  const produceItems = [
    { title: 'Social Media.', desc: "Stop-Scroll Specialists : nous maîtrisons l’art de capter l’attention dans un flux saturé, avec des contenus pensés et tailler pour performer : trouvez votre hook stratégique avec un éditorial pertinent, des contenus engageants et une approche entertainment. Développez des contenus créatifs afin d’intéresser vos audiences. Amplifiez votre visibilité avec l’influence pour faire grandir votre communauté et incarner vos messages. Conversez avec votre communauté, générez de l’engagement et fédérez vos audiences." },
    { title: 'Brand Content', desc: "Chez Gust, nous produisons du brand content percutant qui connecte les marques à leurs audiences. Nous plaçons les marques au cœur de la culture digitale grâce à notre réseau de chargés de production, réalisateurs et directeurs artistiques. Une équipe spécialisée, composée de vidéaste, réalisateurs et ingénieurs du son, pour le tournage de la campagne. Prise en charge de l’ensemble de la production de votre campagne, de la conception à la réalisation. Un déroulement fluide et optimisé pour un résultat rapide et efficace. Nous collaborons avec des experts pour le montage et l'editing de vos contenus pour donner vie à vos projets de manière optimale. Nos contenus sont ARPP compliant." }
  ];

  const [thinkOpen, setThinkOpen] = useState(null);
  const [connectOpen, setConnectOpen] = useState(null);
  const [produceOpen, setProduceOpen] = useState(null);

  return (
    <div className="celebrity-wrapper relative min-h-screen">
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
        className="celebrity-content relative"
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
            className="absolute w-full h-full object-cover"
            poster="/assets/media/cases_studies/cover/Faustine_cover.png"
          >
            <source src="/assets/media/offres/open16_9.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-blue-900/20" />
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
              Une visibilité maximale grâce aux célébrités
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-10">
            Nous connectons votre marque avec des personnalités reconnues pour générer un impact fort, crédible et immédiat.
            </p>
            

            {/* Trust indicators (pills) */}
            <div className="trust-pills">
              {[
                '+10 ans d’expérience ',
                '+180 % de notoriété spontanée',
                'x4 d’attention '
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
        <div className="max-w-5xl mx-auto">
          <div 
            id="stats-grid" 
            data-animate
            className={`grid grid-cols-1 md:grid-cols-3 gap-4 justify-center items-center transition-all duration-1000 delay-200 ${isVisible['stats-grid'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            {/* Carte 1 */}
            <div className="group relative rounded-2xl border border-white/30 bg-white/10 backdrop-blur-md p-8 hover:scale-105 transition-all duration-300 overflow-hidden w-[260px] h-[220px]">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>+10</span>
                </div>
                <p className="text-white/90 text-sm leading-tight font-light" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
                  ans d'expérience dans<br />le celebrity marketing
                </p>
              </div>
            </div>

            {/* Carte 2 */}
            <div className="group relative rounded-2xl border border-white/30 bg-white/10 backdrop-blur-md p-8 hover:scale-105 transition-all duration-300 overflow-hidden w-[260px] h-[220px]">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>+180%</span>
                </div>
                <p className="text-white/90 text-sm leading-tight font-light" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
                  de notoriété spontanée
                </p>
              </div>
            </div>

            {/* Carte 3 */}
            <div className="group relative rounded-2xl border border-white/30 bg-white/10 backdrop-blur-md p-8 hover:scale-105 transition-all duration-300 overflow-hidden w-[260px] h-[220px]">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>x4</span>
                </div>
                <p className="text-white/90 text-sm leading-tight font-light" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
                  D'attention sur les<br />campagnes avec<br />célébrités
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES CARDS AVEC GLASSMORPHISM */}
      <section id="packs" className="relative py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Titre de section */}
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-semibold text-white">Votre Pack Celebrity</h2>
          </div>

          {/* Grille des cartes */}
          <div 
            id="packs-grid" 
            data-animate
            className={`grid grid-cols-1 md:grid-cols-[repeat(3,max-content)] gap-8 md:gap-16 items-start justify-center transition-all duration-1000 delay-300 ${isVisible['packs-grid'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
             {/* Pack Évent */}
             <div className="relative rounded-lg border border-white/60 bg-white/10 p-8 w-[280px] md:w-[320px] min-h-[380px] md:min-h-[420px]">
               <div className="text-center mb-4">
                 <h3 className="text-2xl font-semibold text-white">Pack Évent</h3>
                  </div>
               <p className="text-white/80 mb-4 text-sm">Idéal pour : Lancements, inaugurations, soirées exclusives</p>
               <div className="space-y-3 text-white/85 text-sm">
                 <div>
                   <span className="text-white/70">✓</span>
                   <span className="text-white font-medium"> Guest / Opening :</span>
                   <span className="text-white/85"> présence de célébrités ou personnalités lors de vos événements</span>
                </div>
                 <div>
                   <span className="text-white/70">✓</span>
                   <span className="text-white font-medium"> Amplification média :</span>
                   <span className="text-white/85"> couverture réseaux sociaux + presse lifestyle</span>
              </div>
                 <div>
                   <span className="text-white/70">✓</span>
                   <span className="text-white font-medium"> Objectif business :</span>
                   <span className="text-white/85"> attirer du public qualifié, générer de la visibilité immédiate et du trafic (retail / site / lieux physiques)</span>
          </div>
        </div>
          </div>

             {/* Pack Scale */}
             <div className="relative rounded-lg border border-white/60 bg-white/10 p-8 w-[280px] md:w-[320px] min-h-[380px] md:min-h-[420px]">
               <div className="text-center mb-4">
                 <h3 className="text-2xl font-semibold text-white">Pack Scale</h3>
               </div>
               <p className="text-white/80 mb-4 text-sm">Idéal pour : Positionner la marque comme leader d'opinion</p>
               <div className="space-y-3 text-white/85 text-sm">
                <div>
                   <span className="text-white/70">✓</span>
                   <span className="text-white font-medium"> Masterclass :</span>
                   <span className="text-white/85"> transmission de savoir animé par des experts ou influenceurs premium</span>
                </div>
                <div>
                   <span className="text-white/70">✓</span>
                   <span className="text-white font-medium"> Speaker Event :</span>
                   <span className="text-white/85"> intervention inspirante lors d'un séminaire, d'une convention ou d'un forum</span>
                </div>
                <div>
                   <span className="text-white/70">✓</span>
                   <span className="text-white font-medium"> Objectif business :</span>
                   <span className="text-white/85"> crédibiliser la marque, renforcer la confiance, générer des leads qualifiés via un contenu exclusif</span>
                </div>
              </div>
            </div>

             {/* Pack MMR */}
             <div className="relative rounded-lg border border-white/60 bg-white/10 p-8 w-[280px] md:w-[320px] min-h-[380px] md:min-h-[420px]">
               <div className="text-center mb-4">
                 <h3 className="text-2xl font-semibold text-white">Pack MMR</h3>
               </div>
               <p className="text-white/80 mb-4 text-sm">Idéal pour : Donner de la force et de la désirabilité à la marque</p>
               <div className="space-y-3 text-white/85 text-sm">
                 <div>
                   <span className="text-white/70">✓</span>
                   <span className="text-white font-medium"> Conférence :</span>
                   <span className="text-white/85"> organisation d'un événement de thought leadership avec un plateau de speakers haut niveau</span>
                 </div>
                 <div>
                   <span className="text-white/70">✓</span>
                   <span className="text-white font-medium"> Endorsement / Ambassadeur :</span>
                   <span className="text-white/85"> partenariat fort avec une personnalité en affinité avec la marque</span>
                 </div>
                 <div>
                   <span className="text-white/70">✓</span>
                   <span className="text-white font-medium"> Objectif business :</span>
                   <span className="text-white/85"> accélérer la notoriété, développer les ventes, ancrer la marque dans l'univers premium et international</span>
                 </div>
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
                { step: '01', title: 'Casting & Recommandation', desc: 'Sélection des célébrités pertinentes selon votre cible, budget et objectifs.', side: 'right' },
                { step: '02', title: 'Casting créateurs', desc: 'Gestion complète des discussions et sécurisation de l\'accord.', side: 'left' },
                { step: '03', title: 'Activation & Production', desc: 'Organisation de l\'opération, suivi de la création de contenu et validation.', side: 'right' },
                { step: '04', title: 'Suivi & Reporting', desc: 'Analyse de la performance et mesure du ROI de la campagne.', side: 'left' }
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
              Le celebrity marketing ne s'improvise pas. Il s'aligne. Il se mesure.<br />
              Chez GUST, chaque prise de parole ou présence publique d'un talent est construite avec méthode : données, intention stratégique, effet mesurable.
            </p>
            <p className="text-white font-medium text-base mb-8" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
              Ce que nous analysons avant chaque activation :
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Match marque / célébrité */}
              <div className="relative rounded-2xl border border-white/30 bg-white/10 backdrop-blur-md p-6">
                <div className="absolute top-4 right-4">
                  <span className="text-white/50 text-sm">+</span>
              </div>
                <h3 className="text-white font-semibold text-lg mb-3" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
                  Match marque / célébrité :
                </h3>
                <p className="text-white/80 text-sm leading-relaxed" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
                  valeurs partagées, affinité culturelle, crédibilité.
                </p>
            </div>

              {/* Anticipation de performance */}
              <div className="relative rounded-2xl border border-white/30 bg-white/10 backdrop-blur-md p-6">
                <div className="absolute top-4 right-4">
                  <span className="text-white/50 text-sm">+</span>
              </div>
                <h3 className="text-white font-semibold text-lg mb-3" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
                  Anticipation de performance (XPLAIN.AI) :
                </h3>
                <p className="text-white/80 text-sm leading-relaxed" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
                  tests de mémorisation et d'attention sur vos visuels en amont — pour maximiser le souvenir publicitaire et la visibilité utile.
                </p>
            </div>

              {/* Data audience */}
              <div className="relative rounded-2xl border border-white/30 bg-white/10 backdrop-blur-md p-6">
                <div className="absolute top-4 right-4">
                  <span className="text-white/50 text-sm">+</span>
              </div>
                <h3 className="text-white font-semibold text-lg mb-3" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
                  Data audience :
                </h3>
                <p className="text-white/80 text-sm leading-relaxed" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
                  sociodémographie, affinités, EMV potentiel, réputation e-sociale.
                </p>
              </div>
            </div>
          </div>

          {/* We connect */}
          <div className="w-full mx-auto mb-16">
            <h2 className="text-white text-2xl font-bold mb-4" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>We connect.</h2>
            <p className="text-white/90 text-base mb-6 leading-relaxed" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
              Célébrité, crédibilité & visibilité — orchestrées, pas improvisées. Nous vous connectons aux talents qui renforcent vraiment votre image. Pas d'ego mal géré, pas de bling. Seulement des visages forts, alignés à vos objectifs.
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
                      Endorsement / Ambassadeur : partenariat longue durée avec une figure médiatique forte → gain d'image et visibilité activable dans le temps.
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
                      Event Guest & Opening : guest star lors d'une inauguration, lancement ou soirée VIP → affluence, couverture presse, notoriété instantanée.
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
                      Masterclass : une personnalité légitime pour transmettre un savoir à vos clients ou équipes → image d'expert + génération de leads qualifiés.
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
                      Speaker Event / Conférence : un leader d'opinion pour magnifier vos talks → boost de participation, networking de haut niveau.
                    </p>
                  </div>
                </div>
              </div>
              
            </div>
            
            <p className="text-white/80 text-sm mt-6 leading-relaxed" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
              Accès à un réseau international de talents vérifiés (artistes, leaders, sportifs, conférenciers…). Gestion des castings, des contrats, des conditions d'intervention, jusqu'au moindre détail.
            </p>
                </div>

                {/* We produce */}
          <div className="w-full mx-auto">
            <h2 className="text-white text-2xl font-bold mb-4" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>We produce.</h2>
            <p className="text-white/90 text-base mb-6 leading-relaxed" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
              L'image premium ne suffit pas. Elle doit se diffuser. Et engager. Chez GUST, nous ne faisons pas que "booker une célébrité" — nous créons le contenu et les activations autour, pour maximiser l'effet "halo".
            </p>
            <p className="text-white font-medium text-base mb-8" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
              Ce que nous prenons en charge :
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Production exécutive */}
              <div className="relative rounded-2xl border border-white/30 bg-white/10 backdrop-blur-md p-6">
                <div className="absolute top-4 right-4">
                  <span className="text-white/50 text-sm">+</span>
                </div>
                <h3 className="text-white font-semibold text-base mb-3" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
                  Production exécutive :
                </h3>
                <p className="text-white/80 text-sm leading-relaxed" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
                  tournages, shooting, contenus social-first, capsules média.
                            </p>
                            </div>

              {/* Gestion logistique */}
              <div className="relative rounded-2xl border border-white/30 bg-white/10 backdrop-blur-md p-6">
                <div className="absolute top-4 right-4">
                  <span className="text-white/50 text-sm">+</span>
                        </div>
                <h3 className="text-white font-semibold text-base mb-3" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
                  Gestion logistique :
                </h3>
                <p className="text-white/80 text-sm leading-relaxed" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
                  déplacements, hébergements, timing, accueil VIP, gestion jour J.
                </p>
                        </div>

              {/* Valorisation média */}
              <div className="relative rounded-2xl border border-white/30 bg-white/10 backdrop-blur-md p-6">
                <div className="absolute top-4 right-4">
                  <span className="text-white/50 text-sm">+</span>
                </div>
                <h3 className="text-white font-semibold text-base mb-3" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
                  Valorisation média :
                </h3>
                <p className="text-white/80 text-sm leading-relaxed" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
                  captation, replays, clips, interviews, plan de diffusion post-event.
                </p>
              </div>

              {/* Amplification paid / PR */}
              <div className="relative rounded-2xl border border-white/30 bg-white/10 backdrop-blur-md p-6">
                <div className="absolute top-4 right-4">
                  <span className="text-white/50 text-sm">+</span>
                </div>
                <h3 className="text-white font-semibold text-base mb-3" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
                  Amplification paid / PR :
                </h3>
                <p className="text-white/80 text-sm leading-relaxed" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
                  coordination presse, social ads, diffusion multicanal.
                </p>
                </div>
            </div>
            
            <p className="text-white/80 text-sm mt-8 leading-relaxed" style={{fontFamily:'Avenir Next, Avenir, sans-serif'}}>
              De la conférence privée à l'événement presse, du gala B2B à la campagne globale : GUST orchestre chaque activation avec une exigence créative et opérationnelle.
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
        <AutoScrollGallery images={caseItems.filter(ci => (ci.tags||[]).includes('Célébrité'))} visibleImages={caseItems.filter(ci => (ci.tags||[]).includes('Célébrité')).length} enableAutoScroll={false} scrollable={false} duplicate={false} onApiReady={handleGalleryApi} />
        </section>

        {/* FAQ SECTION CELEBRITY */}
        <section id="faq" className="relative pt-4 pb-6">
          <div className="w-full flex items-center justify-center px-6 md:px-10 pt-0 pb-20">
            <div className="w-full max-w-7xl">
              <h2 className="text-white text-xl tracking-wide mb-3 font-bold">FAQ</h2>

              <div className="border-t border-b border-white/18">
                {[
                  {
                    q: "Pourquoi travailler avec une célébrité ?",
                    a: "Parce qu'elle offre crédibilité, visibilité instantanée et un fort pouvoir d'influence auprès de son audience.",
                  },
                  {
                    q: "Quel est le coût d'une production ?",
                    a: "Le montant dépend du profil de la célébrité et du format de l'opération. Nous adaptons nos recommandations à vos objectifs et à vos moyens.",
                  },
                  {
                    q: "Quelle est la différence entre influenceur et célébrité ?",
                    a: "Un influenceur est reconnu principalement en ligne, une célébrité a une notoriété publique plus large (TV, cinéma, sport, musique...).",
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
                <label className="block text-white/70 text-[12px] mb-1">Votre budget</label>
                <select className="w-full h-11 px-5 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/60 transition-colors">
                  <option className="bg-black" value="">Selectionnez votre budget</option>
                  <option className="bg-black" value="50-100k">50-100k€</option>
                  <option className="bg-black" value="100-250k">100-250k€</option>
                  <option className="bg-black" value="250-500k">250-500k€</option>
                  <option className="bg-black" value="500k+">500k€+</option>
                      </select>
                    </div>
                  </div>

                  <div>
              <label className="block text-white/70 text-[12px] mb-1">Message *</label>
              <textarea rows={5} placeholder="Décrivez nous votre projet celebrity..." className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/60 transition-colors resize-none" />
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
            Lancer ma campagne celebrity →
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
