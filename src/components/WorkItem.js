"use client"
import { useState, useRef, useEffect, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import WorkItemInfo from "./WorkItemInfo"
import { getOptimizedSources } from "@/utils/mediaSources"

export default function WorkItem({ data }) {
  const [isHovered, setIsHovered] = useState(false)
  const previewRef = useRef(null)
  const cover = data?.data?.cover || {}
  const coverSrc = cover.url || ""
  const coverAlt = cover.alt || "Cover image"
  const previewSrc = data?.data?.preview_video?.url || ""
  const previewSources = useMemo(() => {
    const computed = getOptimizedSources(previewSrc)
    if (!computed || computed.length === 0) {
      return previewSrc ? [{ key: `default-${previewSrc}`, src: previewSrc }] : []
    }
    return computed
  }, [previewSrc])

  useEffect(() => {
    let timeoutId
    const videoEl = previewRef.current

    if (isHovered && videoEl) {
      timeoutId = window.setTimeout(() => {
        videoEl
          .play()
          .catch((err) => {
            if (err.name !== "AbortError") console.error(err)
          })
      }, 100)
    } else if (!isHovered && videoEl) {
      videoEl.pause()
      videoEl.currentTime = 0
    }

    return () => {
      clearTimeout(timeoutId)
    }
  }, [isHovered])

  return (
    <Link
      href={`/work/${data.uid}`}
      className="
        relative block rounded-[20px] overflow-hidden border-2 border-transparent hover:border-white mx-auto
        md:h-full md:w-auto md:rounded-3xl md:aspect-auto md:aspect-[9/15]
      "
      style={{ width: "min(328px, calc(100vw - 48px))", height: "min(328px, calc(100vw - 48px))" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-full w-full">
        <Image
          src={coverSrc}
          alt={coverAlt}
          fill
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 328px"
          className="h-full w-full object-cover"
          priority={false}
        />
      </div>

      {isHovered && previewSources.length > 0 && (
        <video
          ref={previewRef}
          loop
          muted
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover"
        >
          {previewSources.map((source) => (
            <source key={source.key} src={source.src} type={source.type} />
          ))}
        </video>
      )}

      <WorkItemInfo tags={data.tags} />
    </Link>
  )
}