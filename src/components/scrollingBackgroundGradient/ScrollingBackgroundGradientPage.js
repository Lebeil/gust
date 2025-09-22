import React from "react"
import { Canvas } from "@react-three/fiber"
import ScrollingBackgroundGradient from "./ScrollingBackgroundGradient"

export default function ScrollingBackgroundShaderPage() {
  return (
    <Canvas
      className="!fixed inset-0 z-[-1]"
      gl={{
        alpha: false,
        antialias: false,
        powerPreference: "high-performance",
      }}
    >
      <ScrollingBackgroundGradient />
    </Canvas>
  )
}
