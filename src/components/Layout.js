"use client"
import { useEffect } from "react"
import { usePathname } from "next/navigation"
import Navbar from "./Navbar"

import { BottomBar } from "./BottomBar"
import ScrollingBackgroundShaderPage from "./scrollingBackgroundGradient/ScrollingBackgroundGradientPage"
import { Leva } from 'leva'
import Template from "./Template"
import FadeObserver from "./FadeObserver"
import { footerContent } from "@/data/content"

export function Layout({ children }) {
  const pathname = usePathname()
  const pageType = pathname.split('/')[2] || pathname.split('/')[1] // Handle [lang] routes
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <link rel="icon" href="/assets/favicon.ico" type="image/png" />

      <Leva hidden/>
      <ScrollingBackgroundShaderPage />
      <FadeObserver />

      <Navbar />
      
      <Template>
        <div className="relative h-full w-full overflow-x-clip">
          <main
            className={`${pageType ? `main ${pageType}` : ""}${
              pageType === "contact" ? " h-screen" : ""
            }`}
          >
            {children}
          </main>
        </div>
      </Template>

      <BottomBar />
    </>
  )
}