
"use client"
import React, { useRef, useEffect, useState, useLayoutEffect } from 'react'
import { useGLTF, Text, Html, useScroll, useVideoTexture, ScrollControls, Plane } from '@react-three/drei'
import gsap from "gsap"
import { useFrame, useThree, useLoader } from '@react-three/fiber'
import { TextureLoader } from "three"
import * as THREE from 'three'
import { pastelBlue, gold, midnightBlue, matteGlass, matteSilver, soapyGlass } from './materials'

export default function Model({ content, onLoaded }) {
    const imageTexture = useLoader(TextureLoader, '/assets/media/instagram_ui.png')
    const landingVideo = content.media
    const videoTexture = useVideoTexture(landingVideo.url)
    const { nodes } = useGLTF("/assets/glb/iphone-final.glb")

    useEffect(() => {
        if (videoTexture && imageTexture && nodes && onLoaded) {
            onLoaded()
        }
    }, [videoTexture, imageTexture, nodes, onLoaded])

    useEffect(() => {
        if (videoTexture) {
            videoTexture.repeat.set(1, 1)
        }

        if (imageTexture) {
            imageTexture.repeat.set(1, 1)
        }
    }, [imageTexture, videoTexture])

    const { viewport } = useThree()
    const iphoneRef = useRef()
    const text1Ref = useRef()
    const text2Ref = useRef()
    const text3Ref = useRef()
    const scroll = useScroll()
    const tl = useRef()

    const baseScale = Math.min(viewport.width, viewport.height) * 0.1

    useFrame((state, delta) => {
        tl.current.seek(scroll.offset * tl.current.duration())
    })

    useLayoutEffect(() => {
        tl.current = gsap.timeline()

        if (text3Ref.current) {
            text3Ref.current.material.opacity = 0
        }

        tl.current
            .to(iphoneRef.current.position, { x: 0, y: 0, z: -0.1, duration: 1, ease: "power2.out" }, 0)
            .to(iphoneRef.current.rotation, { x: 0, z: Math.PI * 2, duration: 1, ease: "power2.out" }, 0)
            .to(iphoneRef.current.position, { x: -0.5, z: 0.5, duration: 1, ease: "power2.in" }, 1)
            .to(iphoneRef.current.rotation, { y: Math.PI * 1.2, duration: 1, ease: "power2.in" }, 1)
            .to(text1Ref.current.position, { x: -15, duration: 1, ease: "power2.out" }, 1)
            .to(text2Ref.current.position, { x: 15, duration: 1, ease: "power2.out" }, 1)
            .to(text3Ref.current.material, { opacity: 1, duration: 1, ease: "power2.out" }, "+=0.3")
    }, [])

    const text1 = content.primaryText
    const text2 = content.secondaryText
    const text3 = content.description
    const text4 = content.mission
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
            {
                text3 && (
                    <group scale={baseScale}>
                        <Text
                            ref={text3Ref}
                            position={[0.2, 0, 0]}
                            maxWidth={baseScale * 20}
                            font={fontRegular}
                            fontSize={0.2}
                            color="white"
                            anchorX="left"
                            anchorY="middle"
                            opacity={0}
                        >
                            {text3}{" "}{text4 && text4}
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
                    <Plane
                        args={[
                            nodes.screen.geometry.boundingBox.max.x * 2.1,
                            nodes.screen.geometry.boundingBox.max.y * 2.12,
                        ]}
                        position={[0, -0.1, -0.18]}
                        rotation={[0, Math.PI, 0]}

                    >
                        <meshStandardMaterial map={imageTexture} transparent />
                    </Plane>
                    <Plane
                        toneMapped={2}
                        args={[
                            nodes.case.geometry.boundingBox.max.x,
                            nodes.case.geometry.boundingBox.max.y * 0.88,
                        ]}
                        position={[0, 0, -0.175]}
                        scale={1.83}
                        rotation={[0, Math.PI, 0]}
                    >
                        <meshStandardMaterial map={videoTexture} />
                    </Plane>
                </group>
            </group>
        </>
    )
}

useGLTF.preload("/assets/glb/iphone-new.glb")