
"use client"
import React, { useRef, useEffect, useState, useLayoutEffect } from 'react'
import { useGLTF, Text, Html, useScroll, useVideoTexture, ScrollControls, Plane, shaderMaterial } from '@react-three/drei'
import gsap from "gsap"
import { useFrame, useThree, useLoader, extend } from '@react-three/fiber'
import { TextureLoader } from "three"
import * as THREE from 'three'
import { pastelBlue, gold, midnightBlue, matteGlass, matteSilver, soapyGlass } from './materials'

// Shader pour écran avec coins arrondis
const RoundedScreenMaterial = shaderMaterial(
  {
    map: null,
    cornerRadius: 0.15,
  },
  // Vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform sampler2D map;
    uniform float cornerRadius;
    varying vec2 vUv;
    
    void main() {
      vec2 uv = vUv;
      
      // Calculer la distance aux coins pour créer des arrondis
      vec2 corner = abs(uv - 0.5) * 2.0;
      corner = max(corner - (1.0 - cornerRadius), 0.0);
      float dist = length(corner);
      
      // Créer un masque avec coins arrondis
      float mask = 1.0 - smoothstep(cornerRadius * 0.7, cornerRadius, dist);
      
      // Appliquer la texture vidéo avec le masque
      vec4 texColor = texture2D(map, uv);
      
      gl_FragColor = vec4(texColor.rgb, texColor.a * mask);
    }
  `
)

extend({ RoundedScreenMaterial })

export default function Model({ content, onLoaded }) {
    const landingVideo = content.media
    const videoTexture = useVideoTexture(landingVideo.url)
    const { nodes } = useGLTF("/assets/glb/iphone-final.glb")

    useEffect(() => {
        if (videoTexture && nodes && onLoaded) {
            onLoaded()
        }
    }, [videoTexture, nodes, onLoaded])

    useEffect(() => {
        if (videoTexture) {
            // Ajuster la vidéo pour combler tous les espaces
            videoTexture.repeat.set(1.08, 1.18) // Légèrement plus grand pour combler
            videoTexture.offset.set(-0.10, -0.09) // Recentrage pour couvrir les bords
            videoTexture.wrapS = THREE.ClampToEdgeWrapping
            videoTexture.wrapT = THREE.ClampToEdgeWrapping
        }
    }, [videoTexture])

    const { viewport } = useThree()
    const iphoneRef = useRef()
    const text1Ref = useRef()
    const text2Ref = useRef()
    const text3Ref = useRef()
    const titleRef = useRef()
    const ctaRef = useRef()
    const missionRef = useRef()
    const scroll = useScroll()
    const tl = useRef()

    const baseScale = Math.min(viewport.width, viewport.height) * 0.1

    useFrame((state, delta) => {
        tl.current.seek(scroll.offset * tl.current.duration())
    })

    useLayoutEffect(() => {
        tl.current = gsap.timeline()

        // Initialiser l'opacité des textes à 0
        if (text3Ref.current) {
            text3Ref.current.material.opacity = 0
        }
        if (titleRef.current) {
            titleRef.current.material.opacity = 0
        }
        if (ctaRef.current) {
            ctaRef.current.material.opacity = 0
        }
        if (missionRef.current) {
            missionRef.current.material.opacity = 0
        }

        tl.current
            // Phase 1: iPhone tourne et se positionne
            .to(iphoneRef.current.position, { x: 0, y: 0, z: -0.1, duration: 1, ease: "power2.out" }, 0)
            .to(iphoneRef.current.rotation, { x: 0, z: Math.PI * 2, duration: 1, ease: "power2.out" }, 0)
            .to(iphoneRef.current.position, { x: -0.5, z: 0.5, duration: 1, ease: "power2.in" }, 1)
            .to(iphoneRef.current.rotation, { y: Math.PI * 1.2, duration: 1, ease: "power2.in" }, 1)
            
            // Phase 2: Textes animés se déplacent
            .to(text1Ref.current.position, { x: -15, duration: 1, ease: "power2.out" }, 1)
            .to(text2Ref.current.position, { x: 15, duration: 1, ease: "power2.out" }, 1)
            
            // Phase 3: Apparition des nouveaux textes (après que l'iPhone soit en position)
        
        // Ajouter les animations seulement si les références existent
        if (titleRef.current) {
            tl.current.to(titleRef.current.material, { opacity: 1, duration: 0.8, ease: "power2.out" }, "+=0.5")
        }
        if (text3Ref.current) {
            tl.current.to(text3Ref.current.material, { opacity: 1, duration: 0.8, ease: "power2.out" }, "+=0.2")
        }
        if (missionRef.current) {
            tl.current.to(missionRef.current.material, { opacity: 1, duration: 0.8, ease: "power2.out" }, "+=0.2")
        }
        if (ctaRef.current) {
            tl.current.to(ctaRef.current.material, { opacity: 1, duration: 0.8, ease: "power2.out" }, "+=0.3")
        }
    }, [])

    const text1 = content.primaryText
    const text2 = content.secondaryText
    
    // Utiliser le contenu directement comme structuré
    const titleText = content.title           // "We create stop-scrollers."
    const mainDescription = content.description // "L'attention, l'essentiel pour les marques..."
    const missionText = content.mission       // "Notre mission : vous permettre de capter vos audiences"
    const ctaData = content.cta              // { text: "Notre travail →", link: "/work", isBold: true }
    const fontRegular = "/assets/fonts/Avenir-Regular.woff"  // Avenir Next Regular
    const fontSemiBold = "/assets/fonts/Avenir-Demi.woff"   // Avenir Next Semi-Bold
    const fontSecondary = "/assets/fonts/Jemina-Italic.woff" // Garde Jemina pour "STOP-SCROLLERS" uniquement
    const customMaterial = matteSilver

    return (
        <>
            {
                text1 && (
                    <group scale={baseScale}>
                        <Text
                            ref={text1Ref}
                            position={[0, 0.8, 4]}
                            maxWidth={100}
                            font={fontSemiBold}
                            textAlign="center"
                            fontSize={0.6}
                            color="white"
                            anchorX="center"
                            anchorY="middle"
                        >
                            {text1.toUpperCase()}
                        </Text>
                    </group >
                )
            }
            {
                text2 && (
                    <group scale={baseScale}>
                        <Text
                            ref={text2Ref}
                            position={[0, 0.2, 4]}
                            maxWidth={100}
                            font={fontSecondary}
                            textAlign="center"
                            fontSize={0.6}
                            color="white"
                            anchorX="center"
                            anchorY="middle"
                        >
                            {text2.toUpperCase()}
                        </Text>
                    </group>
                )
            }
            {/* Titre en gras - en haut */}
            {
                titleText && content.titleBold && (
                    <group scale={baseScale}>
                        <Text
                            ref={titleRef}
                            position={[0.2, 1.8, 0]}
                            maxWidth={baseScale * 16}
                            font={fontSemiBold} // Police Semi-Bold pour le gras
                            fontSize={0.20}
                            color="white"
                            anchorX="left"
                            anchorY="top"
                        >
                            {titleText}
                        </Text>
                    </group>
                )
            }

            {/* Description principale - milieu haut */}
            {
                mainDescription && (
                    <group scale={baseScale}>
                        <Text
                            ref={text3Ref}
                            position={[0.2, 1.0, 0]}
                            maxWidth={baseScale * 14}
                            font={fontRegular}
                            fontSize={0.14}
                            color="white"
                            anchorX="left"
                            anchorY="top"
                            opacity={0}
                        >
                            {mainDescription}
                        </Text>
                    </group>
                )
            }

            {/* Mission - milieu bas */}
            {
                missionText && (
                    <group scale={baseScale}>
                        <Text
                            ref={missionRef}
                            position={[0.2, -0.2, 0]}
                            maxWidth={baseScale * 14}
                            font={fontRegular}
                            fontSize={0.14}
                            color="white"
                            anchorX="left"
                            anchorY="top"
                        >
                            {missionText}
                        </Text>
                    </group>
                )
            }

            {/* CTA cliquable en gras - tout en bas */}
            {
                ctaData && (
                    <group 
                        scale={baseScale}
                        onClick={() => {
                            if (ctaData.link) {
                                window.location.href = ctaData.link
                            }
                        }}
                        onPointerOver={() => document.body.style.cursor = 'pointer'}
                        onPointerOut={() => document.body.style.cursor = 'default'}
                    >
                        <Text
                            ref={ctaRef}
                            position={[0.2, -0.8, 0]}
                            maxWidth={baseScale * 16}
                            font={ctaData.isBold ? fontSemiBold : fontRegular} // Semi-Bold si isBold = true
                            fontSize={0.16}
                            color="white"
                            anchorX="left"
                            anchorY="top"
                        >
                            {ctaData.text}
                        </Text>
                    </group>
                )
            }

            <group
                ref={iphoneRef}
                scale={baseScale}
                position={[0, -0.2, 0.5]}
                rotation={[-1.4, Math.PI, 0]}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes['case'].geometry}
                    material={customMaterial}

                >
                </mesh>
                <group>
                    {/* Écran avec vidéo qui remplit complètement */}
                    <Plane
                        toneMapped={2}
                        args={[
                            nodes.screen.geometry.boundingBox.max.x * 2.10,
                            nodes.screen.geometry.boundingBox.max.y * 2.18,
                        ]}
                        position={[0, -0.1, -0.18]}
                        scale={1}
                        rotation={[0, Math.PI, 0]}
                    >
                        <roundedScreenMaterial 
                            map={videoTexture}
                            cornerRadius={0.20}
                            transparent={true}
                        />
                    </Plane>
                </group>
            </group>
        </>
    )
}

useGLTF.preload("/assets/glb/iphone-new.glb")