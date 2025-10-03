"use client"

import { useRef, useCallback, useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { getOptimizedSources } from "@/utils/mediaSources"

export default function HoverVideoCard({ href, title, posterSrc, className = "", style }) {
  const videoRef = useRef(null)
  const cardRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)
  const [shouldPlay, setShouldPlay] = useState(false)
  const router = useRouter()
  const sources = useMemo(() => {
    if (!shouldLoadVideo) {
      return []
    }
    const computed = getOptimizedSources(href)
    if ((!computed || computed.length === 0) && href) {
      return [{ key: `default-${href}`, src: href }]
    }
    return computed
  }, [href, shouldLoadVideo])

  const handleMouseEnter = useCallback(() => {
    setShouldLoadVideo(true)
    setShouldPlay(true)
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

    setShouldPlay(false)
  }, [])

  const handleLoadedData = useCallback(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      setShouldLoadVideo(true)
      return undefined
    }

    const element = cardRef.current
    if (!element) {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoadVideo(true)
            observer.disconnect()
          }
        })
      },
      { root: null, rootMargin: "200px", threshold: 0.1 }
    )

    observer.observe(element)
    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!shouldLoadVideo) {
      return undefined
    }

    const el = videoRef.current
    return () => {
      if (!el) return
      try {
        el.pause()
        el.removeAttribute("src")
        while (el.firstChild) {
          el.removeChild(el.firstChild)
        }
        el.load()
      } catch (_) {}
    }
  }, [shouldLoadVideo])

  useEffect(() => {
    if (!shouldLoadVideo || !shouldPlay) {
      return
    }

    const el = videoRef.current
    if (!el) {
      return
    }

    let isCancelled = false

    const play = async () => {
      try {
        el.muted = true

        if (el.readyState < 3) {
          await new Promise((resolve) => {
            const onCanPlay = () => {
              el.removeEventListener("canplay", onCanPlay)
              resolve()
            }
            el.addEventListener("canplay", onCanPlay)
          })
        }

        if (!isCancelled) {
          await el.play()
        }
      } catch (error) {
        console.log("Erreur lors de la lecture de la vidéo:", error)
      }
    }

    play()

    return () => {
      isCancelled = true
    }
  }, [shouldLoadVideo, shouldPlay])

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
      ref={cardRef}
      className={`${className} relative group cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black rounded-lg`}
      style={style}
      title={title}
      role="button"
      tabIndex={0}
      aria-label={`Voir le détail du projet ${title}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {shouldLoadVideo ? (
        <video
          ref={videoRef}
          poster={posterSrc}
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={handleLoadedData}
          className="w-full h-full object-cover"
        >
          {sources.map((source) => (
            <source key={source.key} src={source.src} type={source.type} />
          ))}
        </video>
      ) : (
        <video
          ref={videoRef}
          poster={posterSrc}
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={handleLoadedData}
          className="w-full h-full object-cover"
        />
      )}

      {/* Overlay poster pour fade-in une fois la vidéo prête */}
      {posterSrc && (
        <div className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${shouldLoadVideo && isLoaded ? "group-hover:opacity-0" : "opacity-100"}`}>
          <Image
            src={posterSrc}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className="object-cover"
            priority={false}
            loading="lazy"
          />
        </div>
      )}
    </div>
  )
}


