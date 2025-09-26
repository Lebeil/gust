"use client"
import RichText from "@/components/RichText"
import LogoBanner from "@/components/LogoBanner"

const MainHeroMobile = ({ content }) => {
  const landingVideo = content.media

  return (
    <section
      id="main-hero"
      className="relative flex h-screen w-screen min-h-screen items-center justify-center overflow-hidden"
    >
      <figure className="absolute inset-0 z-0">
        <video
          loop
          muted
          autoPlay
          playsInline
          className="h-full w-full object-cover"
        >
          <source src={landingVideo?.url} type="video/mp4" />
        </video>
      </figure>

      <div className="relative z-10 flex h-full w-full items-start justify-center bg-gradient-to-b from-black/45 via-black/25 to-black/40 px-[var(--tw-4)] pb-[var(--tw-32)] pt-[calc(8vh+var(--tw-20))] text-white sm:px-[var(--tw-6)] md:px-[var(--tw-10)]">
        <div className="flex w-full max-w-[min(540px,100vw)] flex-col gap-[var(--tw-6)]">
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


          <div className="flex flex-col gap-[var(--tw-4)] pt-[var(--tw-8)]">
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
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 -mx-[var(--tw-4)] sm:-mx-[var(--tw-6)] pb-[var(--tw-20)]">
        <LogoBanner />
      </div>
    </section>
  )
}

export default MainHeroMobile
