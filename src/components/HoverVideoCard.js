"use client"

import { useRef, useCallback, useState } from "react"
import { useRouter } from "next/navigation"

export default function HoverVideoCard({ href, title, posterSrc, className = "" }) {
  const videoRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const router = useRouter()

  const handleMouseEnter = useCallback(async () => {
    const el = videoRef.current
    if (!el) return
    
    try {
      el.muted = true
      
      // Attendre que la vidéo soit chargée si nécessaire
      if (el.readyState < 3) {
        await new Promise((resolve) => {
          const onCanPlay = () => {
            el.removeEventListener('canplay', onCanPlay)
            resolve()
          }
          el.addEventListener('canplay', onCanPlay)
        })
      }
      
      // Démarrer la lecture
      await el.play()
    } catch (error) {
      console.log('Erreur lors de la lecture de la vidéo:', error)
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    const el = videoRef.current
    if (!el) return
    
    try {
      el.pause()
      el.currentTime = 0
    } catch (error) {
      console.log('Erreur lors de la pause de la vidéo:', error)
    }
  }, [])

  const handleLoadedData = useCallback(() => {
    setIsLoaded(true)
  }, [])

  const generateSlug = (rawTitle) => {
    return (rawTitle || "")
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // remove diacritics
      .replace(/[^a-z0-9]+/g, '-')       // collapse non-alphanum to single '-'
      .replace(/^-+|-+$/g, '')           // trim leading/trailing '-'
  }

  const handleClick = useCallback((e) => {
    e.preventDefault()
    const slug = generateSlug(title)
    router.push(`/fr/work/${slug}`)
  }, [title, router])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick(e)
    }
  }, [handleClick])

  return (
    <div
      className={`${className} relative group cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black rounded-lg`}
      title={title}
      role="button"
      tabIndex={0}
      aria-label={`Voir le détail du projet ${title}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <video
        ref={videoRef}
        src={href}
        poster={posterSrc}
        muted
        loop
        playsInline
        preload="metadata"
        onLoadedData={handleLoadedData}
        className="w-full h-full object-cover"
      />
      {posterSrc && (
        <img
          src={posterSrc}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0 pointer-events-none"
          loading="lazy"
        />
      )}
    </div>
  )
}


