"use client";
import Image from "next/image";

/**
 * Bandeau défilant de logos de clients
 */
export default function LogoBanner() {
  // Liste des logos clients avec leurs images - taille uniformisée
  const logos = [
    { name: "Emma", image: "/images/emma.svg" },
    { name: "Vestiaire Collective", image: "/images/vestiaire collective.svg" },
    { name: "Vertbaudet", image: "/images/verbaudet.svg" },
    { name: "Nestlé", image: "/images/Nestlé.svg" },
    { name: "CyberGhost", image: "/images/cyberghost vpn.svg" },
    { name: "Quick", image: "/images/Quick.svg" },
    { name: "Parions Sport", image: "/images/parions sport.svg" },
    { name: "Orange", image: "/images/orange logo.svg" },
    { name: "Coca-Cola", image: "/images/coca cola.svg" },
    { name: "NIVEA", image: "/images/NIVEA.svg" },
    { name: "O.P.I", image: "/images/O P I.svg" },
    { name: "Showroom Privé", image: "/images/showroom privé.svg" }
  ];

  // Dupliquer les logos pour un défilement continu
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="w-full py-16 overflow-hidden relative mb-20" style={{
      maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
      WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)'
    }}>
      <div className="flex animate-scroll-left">
        {duplicatedLogos.map((logo, index) => (
          <div 
            key={`${logo.name}-${index}`}
            className="flex items-center justify-center min-w-[180px]"
          >
            <div className="relative w-80 h-24 flex items-center justify-center">
              <Image 
                src={logo.image} 
                alt={logo.name} 
                fill
                sizes="160px"
                style={{ objectFit: 'contain' }}
                className="filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </div>
        ))}
      </div>
      
      {/* Dégradés de renfort pour un fondu ultra-doux */}
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-blue-900 via-blue-900/40 to-transparent pointer-events-none z-10"></div>
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-blue-900 via-blue-900/40 to-transparent pointer-events-none z-10"></div>
    </div>
  );
}