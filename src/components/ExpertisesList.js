"use client"
import Image from "next/image"

export default function ExpertisesList() {
  const rows = [
    {
      title: "Influence",
      desc:
        "Des créateurs de contenus avec une communauté engagée, qui sont utilisés pour leur créativité, leur image et leur expérience sur les réseaux sociaux. Des égéries des temps modernes.",
      badge: "Make.it",
    },
    {
      title: "Célébrité",
      desc:
        "Open, notre entité celebrity marketing en association avec Isabelle Brulier, donne accès aux célébrités françaises et internationales pour vos campagnes, RSE, B2C et même B2B.",
      badge: "OPEN",
    },
    {
      title: "Social Media",
      desc:
        "Des experts du social media qui orchestrent votre présence sur les plateformes. De la stratégie éditoriale à la création de contenus, ils transforment votre marque en média vivant, pensé pour engager et performer.",
      badge: "SOME",
    },
    {
      title: "Production",
      desc:
        "Des artistes du digital, aux spécialités diversifiées. De la 3D au stop‑motion au sound design, ils créent des contenus à la frontière entre le réel et l'imaginaire.",
      badge: "",
    },
    {
      title: "User Generated Content",
      desc:
        "Lancez des campagnes UGC à grande échelle, rapidement et à moindre coût. Diffusez votre image grâce à des contenus authentiques et développez votre communauté d'ambassadeurs fidèles.",
      badge: "UGC",
    },
  ]

  return (
    <section className="w-full pt-0 md:pt-1 pb-24 md:pb-40 text-white/90">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Grille globale sur 12 colonnes pour caler le titre gauche et la liste */}
        <div className="grid grid-cols-12 gap-6 md:gap-10">
          {/* Colonne gauche - titre latéral */}
          <div className="col-span-12 md:col-span-3 lg:col-span-2">
            <div className="text-sm md:text-base pt-4 md:pt-5">
              <span className="inline-flex items-center gap-2 font-semibold text-white">
                Nos expertises <span className="opacity-70">→</span>
              </span>
            </div>
          </div>

          {/* Colonne centrale + droite rendues rangée par rangée pour alignement parfait */}
          <div className="col-span-12 md:col-span-9 lg:col-span-10">
            {rows.map((r, i) => (
              <div key={i} className="grid grid-cols-12 gap-6 md:gap-10 py-4 md:py-5">
                {/* Colonne centrale (texte) */}
                <div className="col-span-12 md:col-span-9">
                  <h3 className="text-white text-sm md:text-base font-semibold mb-2 pb-2 border-b-2 border-white/30">{r.title}</h3>
                  <p className="text-xs md:text-sm leading-relaxed opacity-85">
                    {r.desc}
                  </p>
                </div>

                {/* Colonne droite (logo/badge) */}
                <div className="col-span-12 md:col-span-3 flex items-center justify-end">
                  {r.badgeImg ? (
                    <Image
                      src={r.badgeImg}
                      alt={r.badge || r.title}
                      width={160}
                      height={50}
                      className={`w-auto opacity-95 ${
                        r.badge === 'Make.it' 
                          ? 'h-24' 
                          : r.badge === 'OPEN'
                          ? 'h-16'
                          : r.title === 'Production' 
                          ? 'h-20' 
                          : 'h-10'
                      }`}
                    />
                  ) : r.badgeStyle === 'some' ? (
                    <span
                      className="font-semibold"
                      style={{
                        fontSize: '32px',
                        letterSpacing: '0.30em',
                        lineHeight: 1,
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        color: 'transparent',
                        backgroundImage: 'radial-gradient(#ffffff 1.4px, rgba(255,255,255,0) 1.4px)',
                        backgroundSize: '6px 6px',
                        backgroundPosition: '0.5px 0.5px',
                        filter: 'drop-shadow(0 0 0.2px rgba(255,255,255,0.9))'
                      }}
                    >
                      SOME
                    </span>
                  ) : r.badgeStyle === 'ugc' ? (
                    <span className="text-white font-semibold tracking-wide text-3xl md:text-4xl">
                      UGC
                    </span>
                  ) : null}
                </div>
              </div>
            ))}

            {/* Lien contact */}
            <div className="pt-6 md:pt-8 text-sm md:text-base opacity-90">
              <span className="inline-flex items-center gap-2 cursor-pointer">
                <span className="opacity-70">→</span> Contactez nous !
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


