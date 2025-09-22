"use client"
import React, { useRef, useMemo } from "react"
import { ScreenQuad, shaderMaterial } from "@react-three/drei"
import { extend, useFrame } from "@react-three/fiber"
import { usePathname } from "next/navigation"
import { Vector3 } from "three"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import ScrollTrigger from "gsap/dist/ScrollTrigger"
import { useControls } from "leva"
import fragmentShader from "./gradient.frag"
import vertexShader from "./gradient.vert"
import { PAGE_PALETTES, DEFAULT_SHADER_SETTINGS } from "./gradientSettings"

gsap.registerPlugin(ScrollTrigger)

const ScrollingBackgroundMaterial = shaderMaterial(
  {
    uTime: 0,
    uScrollProgress: 0,
    uColourPalette: [],
    uUvScale: DEFAULT_SHADER_SETTINGS.scale,
    uUvDistortionIntensity: DEFAULT_SHADER_SETTINGS.distortionIntensity,
    uUvDistortionIterations: DEFAULT_SHADER_SETTINGS.distortionIterations,
  },
  vertexShader,
  fragmentShader
)

extend({ ScrollingBackgroundMaterial })

const hexToVector3 = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  return new Vector3(r, g, b)
}

export default function ScrollingBackgroundGradient({
  screens = 1,
  loopScroll = false,
  paletteOverride = null,
  disableScroll = false,
}) {
  const shaderRef = useRef()
  const scrollProgress = useRef(0)
  const pathname = usePathname()
  const cleanPath = pathname.replace(/^\/[a-z]{2}-[a-z]{2}/, "") || "/"
  const palette = paletteOverride || PAGE_PALETTES[cleanPath] || PAGE_PALETTES["/"]
  const colorPalette = useMemo(() => palette.map(hexToVector3), [palette])

  const { timeMultiplier, scale, distortionIntensity, distortionIterations } =
    useControls({
      timeMultiplier: { value: DEFAULT_SHADER_SETTINGS.timeMultiplier, min: 0, max: 1, step: 0.01 },
      scale: { value: DEFAULT_SHADER_SETTINGS.scale, min: 0.1, max: 5, step: 0.1 },
      distortionIntensity: { value: DEFAULT_SHADER_SETTINGS.distortionIntensity, min: 0, max: 1, step: 0.01 },
      distortionIterations: { value: DEFAULT_SHADER_SETTINGS.distortionIterations, min: 0, max: 10, step: 1 },
    })

  useGSAP(() => {
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: ({ progress }) => {
        scrollProgress.current = loopScroll && progress >= 1 ? 0 : progress
      },
    })
  }, [loopScroll])

  useFrame(({ clock }) => {
    if (!shaderRef.current) return
    shaderRef.current.uTime = clock.elapsedTime * timeMultiplier
    shaderRef.current.uScrollProgress = disableScroll ? 0 : scrollProgress.current * screens
  })

  return (
    <ScreenQuad>
      <scrollingBackgroundMaterial
        ref={shaderRef}
        uTime={0}
        uScrollProgress={0}
        uColourPalette={colorPalette}
        uUvScale={scale}
        uUvDistortionIterations={distortionIterations}
        uUvDistortionIntensity={distortionIntensity}
      />
    </ScreenQuad>
  )
}