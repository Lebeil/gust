"use client"
import Navbar from "./Navbar"
import { BottomBar } from "./BottomBar"
import ScrollingBackgroundShaderPage from "./scrollingBackgroundGradient/ScrollingBackgroundGradientPage"
import { Leva } from 'leva'
import Template from "./Template"
import FadeObserver from "./FadeObserver"

export function Layout({ children }) {
  return (
    <>
      <link rel="icon" href="/assets/favicon.ico" type="image/png" />

      <Leva hidden/>
      <ScrollingBackgroundShaderPage />
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