"use client"

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react"

const HeroStateContext = createContext(null)

export function HeroStateProvider({ children }) {
  const [isSceneLoaded, setIsSceneLoaded] = useState(false)
  const [isWebGLSupported, setIsWebGLSupported] = useState(null)
  const [scrollProgress, setScrollProgressState] = useState(0)
  const lastScrollRef = useRef(scrollProgress)

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
    }),
    [isSceneLoaded, isWebGLSupported, scrollProgress, updateScrollProgress]
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


