"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import { usePathname } from "next/navigation"

const HeroStateContext = createContext(null)

export function HeroStateProvider({ children }) {
  const [isSceneLoaded, setIsSceneLoaded] = useState(false)
  const [isWebGLSupported, setIsWebGLSupported] = useState(null)
  const [scrollProgress, setScrollProgressState] = useState(0)
  const lastScrollRef = useRef(scrollProgress)
  const rendererRef = useRef(null)
  const canvasRef = useRef(null)
  const pathname = usePathname()
  
  const registerRenderer = useCallback((renderer) => {
    rendererRef.current = renderer
  }, [])

  const handleContextLossRef = useRef(null)

  const disposeRenderer = useCallback(() => {
    const renderer = rendererRef.current
    const canvas = canvasRef.current
    if (!renderer || !canvas) {
      return
    }

    try {
      renderer.forceContextLoss?.()
      renderer.dispose?.()
    } catch (_) {}

    rendererRef.current = null
    canvasRef.current = null
    handleContextLossRef.current = null
    setIsSceneLoaded(false)
  }, [])

  const registerCanvas = useCallback((canvas, renderer) => {
    if (canvasRef.current && canvasRef.current !== canvas && handleContextLossRef.current) {
      canvasRef.current.removeEventListener("webglcontextlost", handleContextLossRef.current)
    }

    if (canvas && renderer) {
      const handleContextLost = (event) => {
        event.preventDefault()
        disposeRenderer()
      }
      handleContextLossRef.current = handleContextLost
      canvas.addEventListener("webglcontextlost", handleContextLost, false)
    }

    canvasRef.current = canvas
  }, [disposeRenderer])

  useEffect(() => {
    if (typeof window === "undefined") return

    const videos = Array.from(document.querySelectorAll("video"))
    videos.forEach((video) => {
      if (!video || video.paused) return
      try {
        video.pause()
        video.currentTime = 0
      } catch (_) {}
    })
  }, [pathname])

  useEffect(() => {
    if (!pathname) return
    const normalized = pathname.replace(/\/fr(?:\-[a-z]{2})?/, "") || "/"
    if (normalized === "/") {
      return
    }

    disposeRenderer()
  }, [disposeRenderer, pathname])

  const updateScrollProgress = useCallback((value) => {
    if (typeof value !== "number") {
      return
    }

    const clamped = Math.min(Math.max(value, 0), 1)

    if (Math.abs(lastScrollRef.current - clamped) < 0.0005) {
      return
    }

    lastScrollRef.current = clamped
    setScrollProgressState(clamped)
  }, [])

  const value = useMemo(
    () => ({
      isSceneLoaded,
      setIsSceneLoaded,
      isWebGLSupported,
      setIsWebGLSupported,
      scrollProgress,
      setScrollProgress: updateScrollProgress,
      registerRenderer,
      registerCanvas,
    }),
    [isSceneLoaded, isWebGLSupported, registerCanvas, registerRenderer, scrollProgress, updateScrollProgress]
  )

  return <HeroStateContext.Provider value={value}>{children}</HeroStateContext.Provider>
}

export function useHeroState() {
  const value = useContext(HeroStateContext)
  if (value === null) {
    throw new Error("useHeroState must be used within a HeroStateProvider")
  }

  return value
}


