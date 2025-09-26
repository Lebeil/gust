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
    <div
      className="relative flex w-full items-center justify-center overflow-hidden py-[var(--tw-8)] md:py-[var(--tw-10)]"
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
      }}
    >
      <div className="absolute inset-0 z-10 pointer-events-none" aria-hidden="true">
        <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-blue-900 via-blue-900/40 to-transparent" />
        <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-blue-900 via-blue-900/40 to-transparent" />
      </div>

      <div className="flex min-w-full animate-logo-marquee gap-[var(--tw-10)]">
        {duplicatedLogos.map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            className="flex items-center justify-center text-center"
          >
            <div className="relative flex h-16 w-40 items-center justify-center sm:h-20 sm:w-48">
              <Image
                src={logo.image}
                alt={logo.name}
                fill
                sizes="192px"
                style={{ objectFit: "contain" }}
                className="filter brightness-0 invert opacity-80 transition-opacity duration-300 hover:opacity-100"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}