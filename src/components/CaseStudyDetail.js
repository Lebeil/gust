"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"

export default function CaseStudyDetail({ caseData }) {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlayPause = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    try {
      video.muted = true
      video.play().catch(() => {})
    } catch {}
  }, [])

  return (
    <div className="h-screen overflow-hidden">
      <div className="container mx-auto px-16 pt-24 pb-8 h-full flex flex-col">
        
        {/* Titre principal */}
        <h1 className="text-white text-3xl font-light mb-8 max-w-3xl">
          Nous avons collaboré avec <span className="font-semibold">{caseData.client || caseData.title || "Service Civique"}</span>.
        </h1>

        {/* Grille principale: groupe gauche (vidéo + métriques) | texte */}
        <div className="grid grid-cols-[600px_1fr] gap-16 flex-1 items-start">
          {/* Groupe gauche: 2 colonnes vidéo | métriques */}
          <div className="grid grid-cols-[340px_260px] gap-16 h-[60vh] items-end">
            <div className="w-[340px] h-full bg-white/10 rounded-[24px] overflow-hidden">
              <video
                ref={videoRef}
                src={caseData.href}
                poster={caseData.posterSrc}
                className="w-full h-full object-cover"
                autoPlay
                playsInline
                preload="auto"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onClick={handlePlayPause}
                muted
                loop
              />
            </div>
            <div className="flex flex-col justify-end">
              <div className="text-white mb-6">
                <div className="text-4xl font-bold">+1m</div>
                <div className="text-lg mt-1">Impressions</div>
                <div className="text-sm text-white/70">(organique & paid)</div>
              </div>
              <Link href="/contact" className="text-white text-base underline underline-offset-2 hover:text-white/80 transition-colors">
                Nous contacter
              </Link>
            </div>
          </div>

          {/* Colonne texte: sans défilement, contenu complet */}
          <div className="pr-4">
            {/* Métadonnées en 2 colonnes */}
            <div className="grid grid-cols-2 gap-x-24 mb-8">
              
              {/* Colonne 1 */}
              <div className="space-y-5">
                <div>
                  <p className="text-white/60 text-xs mb-1">Entreprise</p>
                  <p className="text-white text-base font-semibold">{caseData.client || "SC2S"}</p>
                </div>
                
                <div>
                  <p className="text-white/60 text-xs mb-1">Catégorie</p>
                  <p className="text-white text-base font-semibold">{caseData.category || "Associatif"}</p>
                </div>
                
                <div>
                  <p className="text-white/60 text-xs mb-1">Période</p>
                  <p className="text-white text-base font-semibold">{caseData.period || "2023"}</p>
                </div>
              </div>
              
              {/* Colonne 2 - Expertise */}
              <div>
                <p className="text-white/60 text-xs mb-3">Expertise</p>
                <div className="flex flex-col gap-2">
                  {(caseData.tags || ["Influence", "Social Media"]).map((tag, i) => (
                    <span 
                    key={i} 
                    className="inline-block bg-transparent border border-white/40 rounded-full px-4 py-1.5 text-white text-xs w-fit"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Intro optionnelle au-dessus de Contexte */}
            {caseData.intro && (
              <div className="mb-8">
                <p className="text-white/90 text-sm leading-relaxed">{caseData.intro}</p>
              </div>
            )}
            
            {/* Contexte / Challenge */}
            <div className="mb-6">
              <h3 className="text-white text-base font-semibold mb-2">{caseData.contextTitle || "Contexte"}</h3>
              <p className="text-white/90 text-sm leading-relaxed">
                {caseData.context || "À l'occasion de la Journée Européenne de la Solidarité Intergénérationnelle, le SC2S s'est associée à Elise Heb pour produire un contenu en marque blanche, mettant en avant les missions de l'association à travers le prisme de la relation qu'elle entretient avec Annick, son amie senior."}
              </p>
            </div>

            {/* Contenu / Solution */}
            <div className="mb-6">
              <h3 className="text-white text-base font-semibold mb-2">{caseData.contentTitle || "Contenu"}</h3>
              <div className="text-white/90 text-sm leading-relaxed space-y-1">
                {(caseData.content || []).map((line, i) => (<p key={i}>{line}</p>))}
              </div>
            </div>

            {/* Impact */}
            {caseData.impact && (
              <div className="mb-6">
                <h3 className="text-white text-base font-semibold mb-2">{caseData.impactTitle || "Impact"}</h3>
                <p className="text-white/90 text-sm leading-relaxed">{caseData.impact}</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}