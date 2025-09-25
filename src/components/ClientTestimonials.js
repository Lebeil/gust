"use client";

import { useState } from "react";
import Image from "next/image";

export default function ClientTestimonials() {
  const testimonials = [
    {
      id: "t1",
      name: "Juliette Lapauw",
      date: "7 Avril 2025",
      company: "EMMA",
      rating: 5,
      avatar: "P",
      avatarImage: "/assets/media/logos/emma-logo.svg",
      isGoogle: true,
      verified: true,
      text: "Nous avons toujours collaboré dans une vision long terme et win-win avec Gust, ils ont très bien compris nos objectifs en tant que marque et ont tout mis en place pour les atteindre. Ils font preuve de flexibilité et réactivité."
    },
    {
      id: "t2",
      name: "Theo Royer",
      date: "25 Janvier 2025",
      company: "WeAreEtendart",
      rating: 5,
      avatar: "N",
      avatarImage: "/assets/media/logos/WeAreEtendart.png",
      isGoogle: true,
      verified: true,
      text: "Nous avons collaboré sur la mobilisation d'influenceurs pertinents pour prendre part à un événement dédié aux jeunes et adressant des enjeux d'inclusion et de lutte contre le cyber-harcèlement."
    },
    {
      id: "t3",
      name: "Matthieu Le Balch",
      date: "11 Décembre 2024",
      company: "Reeve",
      rating: 5,
      avatar: "Z",
      isGoogle: true,
      verified: true,
      text: "Nous avons sollicité l'agence Gust afin d'améliorer l'image de marque de notre société en définissant une nouvelle stratégie & en créant les contenus associés. Une véritable écoute de nos problématiques pour mieux adapter la stratégie, un relationnel de grande qualité et une véritable créativité dans les contenus proposés."
    },
    {
      id: "t4",
      name: "Stephane Boukris",
      date: "9 Décembre 2024",
      company: "QUATID",
      rating: 5,
      avatar: "F",
      isGoogle: true,
      verified: false,
      text: "Réaliser des posts engageants pour notre audience.La réactivité de l'équipe, et la compréhension du projet."
    },
    {
      id: "t5",
      name: "Théo DE CELLERY D'ALLENS",
      date: "7 Décembre 2024",
      company: "Tcorp",
      rating: 5,
      avatar: "D",
      isGoogle: true,
      verified: true,
      text: "Travailler ensemble sur un appel d’offres sur plusieurs aspects : stratégie et création.J’ai beaucoup apprécié le fait d’être dans une équipe jeune et très connecté aux tendances influence et social média. De plus l’expertise de l’agence sur le stop scrolling rend les propositions créatives pertinentes et impactante d’un point de vu marketing"
    }
  ];

  // État: liste d'IDs de cartes actuellement déployées
  const [expandedIds, setExpandedIds] = useState([]);
  
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 4;

  const toggleCard = (cardId) => {
    setExpandedIds((prev) => {
      const isOpen = prev.includes(cardId);
      if (isOpen) {
        return prev.filter((id) => id !== cardId);
      }
      return [...prev, cardId];
    });
  };

  const totalPages = Math.ceil(testimonials.length / cardsPerPage);
  const currentTestimonials = testimonials.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage
  );

  const goToPrevious = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const truncateText = (text, maxLength = 180) => {
    if (text.length <= maxLength) return { truncated: text, needsExpand: false };
    const truncated = text.substring(0, maxLength).trim();
    const lastSpace = truncated.lastIndexOf(' ');
    return {
      truncated: truncated.substring(0, lastSpace) + '...',
      needsExpand: true
    };
  };

  return (
    <section className="w-full py-20 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Titre et Navigation */}
        <div className="mb-12 flex items-center justify-between">
          <h2 className="text-white text-3xl md:text-4xl font-bold">
            Ce que nos clients pensent de nous
          </h2>
          
          {/* Navigation Arrows - En haut à droite */}
          <div className="flex items-center gap-3">
            <button
              onClick={goToPrevious}
              className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors group"
              aria-label="Témoignages précédents"
            >
              <svg className="w-5 h-5 text-white/60 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors group"
              aria-label="Témoignages suivants"
            >
              <svg className="w-5 h-5 text-white/60 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Rangée sans coupures: grilles responsives, aucune carte coupée */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {currentTestimonials.map((testimonial) => {
            const isExpanded = expandedIds.includes(testimonial.id);
            const { truncated, needsExpand } = truncateText(testimonial.text, 180);
            
            return (
              <div key={testimonial.id} className="w-full">
                <div
                  className={`relative rounded-xl p-5 border border-white bg-white/5 bg-clip-padding backdrop-blur-lg transition-all duration-300 ${isExpanded ? 'h-auto' : 'h-[260px]'} flex flex-col shadow-[0_0_0_1px_rgba(255,255,255,0.08)]`}
                >
                {/* Header avec Avatar et Info */}
                <div className="flex items-start gap-3 mb-4">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    {testimonial.avatarImage ? (
                      <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white">
                        <Image src={testimonial.avatarImage} alt={`${testimonial.name} logo`} fill sizes="40px" className="object-contain p-1" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center text-white text-lg font-bold">
                        {testimonial.avatar}
                      </div>
                    )}
                  </div>
                  
                  {/* Nom et Date */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-white font-semibold text-sm">{testimonial.name}</h3>
                    </div>
                    <p className="text-white/50 text-xs mt-0.5">{testimonial.company}</p>
                  </div>
                </div>

                {/* Texte du témoignage */}
                <div className={`relative ${isExpanded ? '' : 'flex-1'} `}>
                  <p className={`text-white/80 text-sm leading-relaxed ${isExpanded ? '' : 'line-clamp-3'}`}>
                    {isExpanded ? testimonial.text : truncated}
                  </p>
                  
                  {/* Bouton Lire la suite / Cacher */}
                  {needsExpand && (
                    <button
                      onClick={() => toggleCard(testimonial.id)}
                      className={`mt-3 text-sm transition-colors ${
                        isExpanded 
                          ? 'text-white/50 hover:text-white/70 border border-white/20 px-3 py-1 rounded-lg' 
                          : 'text-blue-400 hover:text-blue-300'
                      }`}
                    >
                      {isExpanded ? 'Cacher' : 'Lire la suite'}
                    </button>
                  )}
                </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`transition-all duration-300 ${
                index === currentPage 
                  ? 'w-8 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full' 
                  : 'w-2 h-2 bg-white/30 hover:bg-white/50 rounded-full'
              }`}
              aria-label={`Page ${index + 1}`}
            />
          ))}
        </div>

        {/* Lien "Contactez nous" */}
        <div className="text-center mt-8">
          <a 
            href="#contact" 
            className="inline-flex items-center gap-2 text-white/50 hover:text-white/70 transition-colors text-sm"
          >
            <span>Contactez nous</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}