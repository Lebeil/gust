"use client"
import { useEffect } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/dist/ScrollTrigger"
import { PrismicRichText } from "@/components/PrismicRichText"

gsap.registerPlugin(ScrollTrigger)

const MainHeroMobile = ({ slice }) => {
  const landingVideo = slice.primary.media

  useEffect(() => {
    gsap.to("#main-hero", {
      scrollTrigger: {
        trigger: "#main-hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      opacity: 0,
      ease: "none",
    })
  }, [])

  return (
    <div
      id="main-hero"
      className="relative z-10 h-screen overflow-hidden flex items-center mb-[--tw-36] px-[var(--tw-4)] md:px-[var(--tw-12)] md:pb-[var(--tw-24)]"
    >
      <div className="flex justify-center items-center w-full">
        <div className="z-10 max-w-90">
          <div className="flex flex-col justify-center md:max-w-2xl h-full">
            <h2 className="uppercase mb-[var(--tw-4)]">
              <div className="text-2xl mb-[var(--tw-4)]">
                {slice.primary.text_primary?.[0]?.text?.[0]?.text}
              </div>
              <span className="font-jemina text-6xl">
                {slice.primary.text_secondary?.[0]?.text?.[0]?.text}
              </span>
            </h2>

            <PrismicRichText
              field={slice.primary.text_tertiary?.[0]?.text}
              components={{
                paragraph: ({ children }) => (
                  <p className="text-2xl">{children}</p>
                ),
              }}
            />

            <div className="hidden lg:block">
              <PrismicRichText
                field={slice.primary.text_tertiary?.[1]?.text}
                components={{
                  paragraph: ({ children }) => <p>{children}</p>,
                }}
              />
            </div>

            <div className="lg:hidden">
              <PrismicRichText
                field={slice.primary.text_tertiary?.[1]?.text}
                components={{
                  paragraph: ({ children }) => <p>{children}</p>,
                }}
              />
            </div>
          </div>
        </div>

        <figure className="absolute inset-0 z-0">
          <video
            loop
            muted
            autoPlay
            playsInline
            className="object-cover h-full w-full filter brightness-[0.4]"
          >
            <source src={landingVideo?.url} type="video/mp4" />
          </video>
        </figure>
      </div>
    </div>
  )
}

export default MainHeroMobile
