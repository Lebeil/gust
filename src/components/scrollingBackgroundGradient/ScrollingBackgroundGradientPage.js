"use client"

import { usePathname } from "next/navigation"
import Image from "next/image"

const GRADIENT_PAGES = new Set(["/", "/fr", "/fr/", "/fr/home", "/home"])

export default function ScrollingBackgroundShaderPage() {
  const pathname = usePathname() || "/"
  const normalized = pathname.replace(/\/fr(?:\-[a-z]{2})?/, "") || "/"

  if (!GRADIENT_PAGES.has(normalized)) {
    return null
  }

  return (
    <div className="fixed inset-0 -z-10">
      <Image
        src="/assets/gradients/GRADIANT.png"
        alt="Background gradient"
        fill
        priority
        className="object-cover"
      />
    </div>
  )
}
