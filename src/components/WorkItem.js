"use client"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import WorkItemInfo from "./WorkItemInfo"

export default function WorkItem({ data }) {
  const [isHovered, setIsHovered] = useState(false)
  const previewRef = useRef(null)
  const cover = data?.data?.cover || {}
  const coverSrc = cover.url || ""
  const coverAlt = cover.alt || "Cover image"
  const coverWidth = Number(cover.width) || 500
  const coverHeight = Number(cover.height) || 300
  const previewSrc = data?.data?.preview_video?.url || ""

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
        relative block h-full rounded-3xl overflow-hidden border-2 border-transparent hover:border-white aspect-[9/15]
        md:aspect-auto
      "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={coverSrc}
        alt={coverAlt}
        width={coverWidth}
        height={coverHeight}
        className="h-full w-full object-cover"
      />

      {isHovered && previewSrc && (
        <video
          ref={previewRef}
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={previewSrc} type="video/mp4" />
        </video>
      )}

      <WorkItemInfo tags={data.tags} />
    </Link>
  )
}