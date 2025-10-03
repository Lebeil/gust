import { Canvas } from "@react-three/fiber"
import { ScrollControls } from "@react-three/drei"
import { useEffect, useRef } from "react"
import IphoneModel from "./IphoneModel"
import { useHeroState } from "@/context/HeroStateContext"

export default function Scene({ content, onLoaded, scrollProgress = 0, canvasClassName = "h-screen" }) {
  const { registerRenderer, registerCanvas } = useHeroState()
  const canvasRef = useRef(null)

  const handleCreated = (state) => {
    registerRenderer(state.gl)
    if (canvasRef.current) {
      registerCanvas(canvasRef.current, state.gl)
    }
  }

  useEffect(() => {
    const canvasEl = canvasRef.current
    if (!canvasEl) return

    const handleContextLost = (event) => {
      event.preventDefault()
    }

    canvasEl.addEventListener("webglcontextlost", handleContextLost, false)
    return () => {
      canvasEl.removeEventListener("webglcontextlost", handleContextLost, false)
    }
  }, [])

  return (
    <Canvas
      camera={{ position: [0, 0, 2], fov: 50 }}
      className={`w-full ${canvasClassName}`}
      ref={canvasRef}
      onCreated={handleCreated}
    >
      <ambientLight intensity={0.5} />
      <directionalLight intensity={2} position={[0, 0, 2]} />
      <pointLight intensity={0.4} position={[2, 2, 2]} />

      <ScrollControls pages={1} damping={0.2}>
        <IphoneModel content={content} onLoaded={onLoaded} externalScrollProgress={scrollProgress} />
      </ScrollControls>
    </Canvas>
  )
}