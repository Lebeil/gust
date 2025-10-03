"use client"
import { useState, useEffect, useRef } from "react"
import RichText from "@/components/RichText"
import LogoBanner from "@/components/LogoBanner"

const MainHeroMobile = ({ content }) => {
  const landingVideo = content.media
  const [isSafariMobile, setIsSafariMobile] = useState(false)
  const [videoStarted, setVideoStarted] = useState(false)
  const videoRef = useRef(null)

  // Détection Safari mobile
  useEffect(() => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    setIsSafariMobile(isIOS && isSafari && window.innerWidth <= 768)
  }, [])

  // Fonction pour démarrer la vidéo sur Safari mobile
  const startVideo = async () => {
    if (videoRef.current && isSafariMobile && !videoStarted) {
      try {
        await videoRef.current.play()
        setVideoStarted(true)
      } catch (error) {
        console.log('Video autoplay blocked on Safari mobile:', error)
      }
    }
  }

  return (
    <section
      id="main-hero"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden"
    >
      <figure className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          loop
          muted
          autoPlay={!isSafariMobile}
          playsInline
          className="h-full w-full object-cover"
          poster="/assets/media/cases_studies/cover/Quick_cover.png"
          onClick={isSafariMobile ? startVideo : undefined}
          style={isSafariMobile ? { cursor: 'pointer' } : {}}
        >
          <source src={landingVideo?.url} type="video/mp4" />
        </video>

        {/* Overlay pour Safari mobile avec instruction */}
        {isSafariMobile && !videoStarted && (
          <div
            className="absolute inset-0 bg-black/20 flex items-center justify-center z-10 cursor-pointer"
            onClick={startVideo}
          >
            <div className="text-center text-white">
              <div className="text-2xl mb-2">▶</div>
              <div className="text-sm">Appuyez pour lancer la vidéo</div>
            </div>
          </div>
        )}
      </figure>

      <div className="relative z-10 flex h-full w-full items-start justify-center px-[var(--tw-4)] pb-[var(--tw-16)] pt-[calc(6vh+var(--tw-14))] text-white sm:px-[var(--tw-6)] sm:pt-[calc(7vh+var(--tw-16))] md:px-[var(--tw-10)] md:pt-[calc(8vh+var(--tw-20))]">
        <div className="flex w-full max-w-[min(540px,100%)] flex-col gap-[var(--tw-6)] drop-shadow-lg">
          <div className="flex flex-col gap-[var(--tw-6)]">
            <h2 className="flex flex-col gap-[var(--tw-4)] uppercase">
              <span className="text-sm font-semi-bold tracking-[0.35em] text-white/70">{content.primaryText}</span>
              <span className="font-avenir-next font-semi-bold text-4xl leading-tight sm:text-5xl">
                {content.secondaryText}
              </span>
            </h2>

            <RichText
              content={content.description}
              components={{
                paragraph: ({ children }) => (
                  <p className="text-base leading-relaxed sm:text-lg">{children}</p>
                ),
              }}
            />

            <RichText
              content={content.mission}
              components={{
                paragraph: ({ children }) => (
                  <p className="text-sm leading-relaxed text-white/90 sm:text-base">
                    {children}
                  </p>
                ),
              }}
            />
          </div>


          <div className="flex flex-col gap-[var(--tw-4)] pt-[var(--tw-10)]">
            <span className="h-px w-20 bg-white/70" aria-hidden="true" />
            <a
              href="#projects"
              className="flex items-center gap-[var(--tw-2)] text-base font-semibold uppercase tracking-[0.2em] text-white/90 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              tabIndex={0}
              aria-label="Découvrir notre travail"
            >
              Notre travail
              <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="pt-[var(--tw-10)]">
            <LogoBanner />
          </div>
        </div>
      </div>
    </section>
  )
}

export default MainHeroMobile
