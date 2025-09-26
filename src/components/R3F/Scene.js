import { Canvas } from "@react-three/fiber"
import { ScrollControls } from "@react-three/drei"
import IphoneModel from "./IphoneModel"

export default function Scene({ content, onLoaded, scrollProgress = 0, canvasClassName = "h-screen" }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 2], fov: 50 }}
      className={`w-full ${canvasClassName}`}
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