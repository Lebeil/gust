"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { getLocalizedPath } from "@/lib/localizePath"
import { IoIosArrowRoundBack } from "react-icons/io"

export default function CaseStudyDetail({ caseData }) {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const params = useParams()
  const lang = params?.lang || ""
  const backHref = getLocalizedPath("work", lang)

  const handlePlayPause = () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      video.play().catch(() => {})
      setIsPlaying(true)
      return
    }

    video.pause()
    setIsPlaying(false)
  }

  const handleVideoKeyDown = (event) => {
    if (event.key !== "Enter" && event.key !== " ") return

    event.preventDefault()
    handlePlayPause()
  }

  const handleContactKeyDown = (event) => {
    if (event.key !== "Enter" && event.key !== " ") return

    event.preventDefault()
    event.currentTarget.click()
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
    <div className="min-h-screen w-full overflow-x-hidden">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-5 py-12 sm:px-8 lg:container lg:min-h-screen lg:gap-0 lg:px-16 lg:pt-24 lg:pb-8">
        
        {/* Titre principal */}
        <h1 className="mb-6 max-w-3xl text-xl font-light leading-relaxed text-white sm:text-2xl lg:mb-8 lg:text-3xl">
          Nous avons collaboré avec <span className="font-semibold">{caseData.client || caseData.title || "Service Civique"}</span>.
        </h1>

        {/* Grille principale: groupe gauche (vidéo + métriques) | texte */}
        <div className="grid gap-12 lg:flex-1 lg:grid-cols-[minmax(320px,600px)_1fr] lg:items-start lg:gap-16">
          {/* Groupe gauche: 2 colonnes vidéo | métriques */}
          <div className="flex flex-col gap-6 lg:grid lg:h-[60vh] lg:grid-cols-[340px_260px] lg:items-end lg:gap-16">
            <div className="relative inline-block lg:h-full lg:w-[340px]">
              <Link
                href={backHref}
                aria-label="Retour à la liste des projets"
                className="absolute left-13 top-3 lg:right-full lg:top-0 lg:mr-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/85 bg-transparent text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              >
                <IoIosArrowRoundBack size={26} />
              </Link>
              <div className="aspect-[3/4] w-full overflow-hidden rounded-[24px] bg-white/10 lg:aspect-auto lg:h-full lg:w-[340px]">
                <video
                ref={videoRef}
                src={caseData.href}
                poster={caseData.posterSrc}
                className="h-full w-full object-cover"
                autoPlay
                playsInline
                preload="auto"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onClick={handlePlayPause}
                onKeyDown={handleVideoKeyDown}
                muted
                loop
                tabIndex={0}
                aria-label={
                  isPlaying ? "Mettre la vidéo en pause" : "Lire la vidéo du projet"
                }
                role="button"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-[24px] bg-white/5 p-6 text-white lg:bg-transparent lg:p-0 lg:text-left">
              <div>
                <div className="text-3xl font-bold sm:text-4xl">+1m</div>
                <div className="mt-1 text-base sm:text-lg">Impressions</div>
                <div className="text-sm text-white/70">(organique & paid)</div>
              </div>
              <Link
                href="/contact"
                className="w-fit rounded-full border border-white/30 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white/70 hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                tabIndex={0}
                aria-label="Accéder au formulaire de contact"
                onKeyDown={handleContactKeyDown}
              >
                Nous contacter
              </Link>
            </div>
          </div>

          {/* Colonne texte: sans défilement, contenu complet */}
          <div className="flex flex-col gap-8 lg:pr-4">
            {/* Métadonnées en 2 colonnes */}
            <div className="grid gap-6 sm:grid-cols-2 lg:gap-x-24 lg:gap-y-10">
              
              {/* Colonne 1 */}
              <div className="space-y-4 lg:space-y-0">
                <div className="lg:hidden">
                  <p className="mb-1 text-xs text-white/60">Entreprise</p>
                  <p className="text-base font-semibold text-white">{caseData.client || "SC2S"}</p>
                </div>
                
                <div>
                  <p className="mb-1 text-xs text-white/60">Secteurs</p>
                  <p className="text-base font-semibold text-white">{caseData.category || "Associatif"}</p>
                </div>
                
                <div className="lg:hidden">
                  <p className="mb-1 text-xs text-white/60">Période</p>
                  <p className="text-base font-semibold text-white">{caseData.period || "2023"}</p>
                </div>
              </div>
              
              {/* Colonne 2 - Expertise */}
              <div>
                <p className="mb-3 text-xs text-white/60">Expertise</p>
                <div className="flex flex-wrap gap-2">
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
              <div className="text-sm leading-relaxed text-white/90 lg:text-base">
                <p>{caseData.intro}</p>
              </div>
            )}
            
            {/* Contexte / Challenge */}
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-white lg:text-lg">{caseData.contextTitle || "Contexte"}</h3>
              <p className="text-sm leading-relaxed text-white/90 lg:text-base">
                {caseData.context || "À l'occasion de la Journée Européenne de la Solidarité Intergénérationnelle, le SC2S s'est associée à Elise Heb pour produire un contenu en marque blanche, mettant en avant les missions de l'association à travers le prisme de la relation qu'elle entretient avec Annick, son amie senior."}
              </p>
            </div>

            {/* Contenu / Solution */}
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-white lg:text-lg">{caseData.contentTitle || "Contenu"}</h3>
              <div className="space-y-2 text-sm leading-relaxed text-white/90 lg:text-base">
                {(caseData.content || []).map((line, i) => (<p key={i}>{line}</p>))}
              </div>
            </div>

            {/* Impact */}
            {caseData.impact && (
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-white lg:text-lg">{caseData.impactTitle || "Impact"}</h3>
                <p className="text-sm leading-relaxed text-white/90 lg:text-base">{caseData.impact}</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}