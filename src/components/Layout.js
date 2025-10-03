"use client"
import Navbar from "./Navbar"
import { BottomBar } from "./BottomBar"
import { Suspense, useMemo } from "react"
import { usePathname } from "next/navigation"
import ScrollingBackgroundShaderPage from "./scrollingBackgroundGradient/ScrollingBackgroundGradientPage"
import { Leva } from 'leva'
import Template from "./Template"
import FadeObserver from "./FadeObserver"

const GRADIENT_PAGES = new Set(["/", "/fr", "/fr/", "/fr/home", "/home"])

export function Layout({ children }) {
  const pathname = usePathname() || "/"
  const shouldShowGradient = useMemo(() => {
    const normalized = pathname.replace(/\/fr(?:\-[a-z]{2})?/, "") || "/"
    return GRADIENT_PAGES.has(normalized)
  }, [pathname])

  return (
    <>
      <link rel="icon" href="/assets/favicon.ico" type="image/png" />

      <Leva hidden/>
      {shouldShowGradient && (
        <Suspense fallback={null}>
          <ScrollingBackgroundShaderPage />
        </Suspense>
      )}
      <FadeObserver />

      <Navbar />
      
      <Template>
        <div className="relative h-full w-full overflow-x-clip">
          <main className="main">
            {children}
          </main>
        </div>
      </Template>

      <BottomBar />
    </>
  )
}