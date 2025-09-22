"use client"
import { PrismicNextImage } from "@prismicio/next"
import { useState } from "react"

export const BeforeAfter = ({ slice }) => {
    const [sliderPosition, setSliderPosition] = useState(50)
    const [isDragging, setIsDragging] = useState(false)

    const handleMove = (event) => {
        if (!isDragging) return

        const rect = event.currentTarget.getBoundingClientRect()
        const x = Math.max(0, Math.min(event.clientX - rect.left, rect.width))
        const percent = Math.max(0, Math.min((x / rect.width) * 100, 100))

        setSliderPosition(percent)
    }

    const handleMouseDown = () => {
        setIsDragging(true)
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    const beforeMedia = slice.primary.media_1
    const afterMedia = slice.primary.media_2

    return (
        <div className="w-full flex justify-center" onMouseUp={handleMouseUp}>
            <div
                className="relative w-auto overflow-hidden select-none"
                onMouseMove={handleMove}
                onMouseDown={handleMouseDown}
            >
                {beforeMedia && beforeMedia.length > 0 && (
                    <figure className="rounded-3xl overflow-hidden">
                        {beforeMedia[0].video ? (
                            <video
                                src={beforeMedia[0].video}
                                playsInline
                                muted
                                autoPlay
                                loop
                            />
                        ) : (
                            <PrismicNextImage field={beforeMedia[0].image} width={600} className="w-full h-full" />
                        )}
                    </figure>
                )}

                {afterMedia && afterMedia.length > 0 && (
                    <div
                        className="absolute inset-0 overflow-hidden"
                        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                    >
                        <figure className="rounded-3xl overflow-hidden">

                            {afterMedia[0].video ? (
                                <video
                                    src={afterMedia[0].video}
                                    playsInline
                                    muted
                                    autoPlay
                                    loop
                                />
                            ) : (
                                <PrismicNextImage field={afterMedia[0].image} width={600} className="w-full h-full" />
                            )}
                        </figure>
                    </div>
                )}

                <div
                    className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
                    style={{
                        left: `calc(${sliderPosition}% - 1px)`,
                    }}
                >
                    <div className="bg-white absolute rounded-full h-3 w-3 -left-1 top-1/2 transform -translate-y-1/2" />
                </div>
            </div>
        </div>
    )
}
