import * as THREE from 'three'
import { MeshTransmissionMaterial } from '@react-three/drei'

export const matteSilver = new THREE.MeshStandardMaterial({
  color: 0xd3d3d3,
  metalness: 0.4,
  roughness: 0.6,
})

export const glossyBlack = new THREE.MeshStandardMaterial({
  color: 0x111111,
  metalness: 0.9,
  roughness: 0.2,
})

export const midnightBlue = new THREE.MeshStandardMaterial({
  color: 0x1a1a40,
  metalness: 0.7,
  roughness: 0.3,
})

export const gold = new THREE.MeshStandardMaterial({
  color: 0xffd700,
  metalness: 1.0,
  roughness: 0.3,
})

export const pastelBlue = new THREE.MeshStandardMaterial({
  color: 0xadd8e6,
  metalness: 0.3,
  roughness: 0.7,
})

export const matteGlass = new THREE.MeshPhysicalMaterial({
  color: 0xffffff,
  metalness: 0,
  roughness: 0.9,
  transparent: true,
  opacity: 0.4,
  transmission: 0.95,
  thickness: 0.3,
  clearcoat: 0.1,
})

export const ceramicWhite = new THREE.MeshStandardMaterial({
  color: 0xf4f4f4,
  metalness: 0.2,
  roughness: 0.8,
})

export const iceChrome = new THREE.MeshPhysicalMaterial({
  color: 0x99ccff,
  metalness: 1.0,
  roughness: 0.1,
  clearcoat: 1.0,
  reflectivity: 1.0,
})

export const soapyGlass = (
  <MeshTransmissionMaterial
    roughness={1}
    thickness={0.5}
    transmission={0.9}
    ior={1.3}
    chromaticAberration={0.02}
    anisotropy={0.1}
    samples={6}
    resolution={256}
  />
)