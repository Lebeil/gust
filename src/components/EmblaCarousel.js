"use client"
import React, { useState, useEffect } from "react"
import useEmblaCarousel from "embla-carousel-react"
import AutoScroll from "embla-carousel-auto-scroll"
import WorkItem from "./WorkItem"
import { PrismicNextImage } from "@prismicio/next"

const EmblaCarousel = ({ slides, inverse, nextClick, prevClick }) => {
  const [hoveredItemIndex, setHoveredItemIndex] = useState(null)
  const hasWorkSlide = slides.some((item) => item.type === "work")
  const autoScrollSpeed = inverse ? -0.8 : 0.8
  const containerPointerEvents = hasWorkSlide ? "auto" : "none"

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
    },
    [
      ...(hasWorkSlide
        ? []
        : [AutoScroll({ playOnInit: true, speed: autoScrollSpeed })]),
    ]
  )

  useEffect(() => {
    if (emblaApi) {
      if (nextClick) {
        emblaApi.scrollNext()
      }
      if (prevClick) {
        emblaApi.scrollPrev()
      }
    }
  }, [nextClick, prevClick, emblaApi])

  const getFlexBasisClasses = (type) => {
    switch (type) {
      case "image":
        return "basis-[40%] md:basis-[60%] lg:basis-[20%]"
      case "text":
        return " md:basis-[80%] lg:basis-auto"
      case "work":
        return "basis-[80%] md:basis-[60%] lg:basis-[20%]"
      default:
        return "basis-[80%]"
    }
  }

  return (
    <div className="embla" style={{ pointerEvents: containerPointerEvents }}>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container flex pl-[var(--tw-4)] gap-[var(--tw-4)] md:pl-[var(--tw-12)] md:gap-[var(--tw-12)]">
          {slides.map((item, index) => (
            <div
              key={`slide-${index}`}
              className={`relative flex-shrink-0 hover:cursor-pointer ${getFlexBasisClasses(
                item.type
              )}`}
              onMouseEnter={() => setHoveredItemIndex(index)}
              onMouseLeave={() => setHoveredItemIndex(null)}
            >
              {item.type === "image" && (
                <figure className="max-w-24 md:max-w-36">
                  <PrismicNextImage
                    className="w-full"
                    field={item.content}
                    width={100}
                    priority
                  />
                </figure>
              )}
              {item.type === "text" && (
                <div className="uppercase text-7xl font-jemina min-w-max lg:text-[12vw]">
                  {item.content} -{" "}
                </div>
              )}
              {item.type === "work" && <WorkItem data={item} index={index} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel