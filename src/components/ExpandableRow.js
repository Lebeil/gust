"use client"
import React, { useState } from 'react'
import { PrismicRichText } from '@prismicio/react'
import useViewport from '@/lib/hooks/useViewport'
// import { MoreIcon } from './icons/MoreIcon'
import expandableStyles from "@/styles/Expandable.module.css"

export const ExpandableRow = ({ item, slice }) => {
    const [isOpen, setIsOpen] = useState(false)
    const handleMouseEnter = () => setIsOpen(true)
    const handleMouseLeave = () => setIsOpen(false)
    const viewport = useViewport()
    // const iconSize = viewport.isMobile ? 15 : 30

    return (
        <div
            className={`
                text-md font-avenir
                border-b-2 border-white border-opacity-20            
                py-[var(--tw-6)]
                md:py-[var(--tw-12)]
                last:border-b-0
            `}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {slice.variation === "default" && (
                <div className="grid lg:grid-cols-2 lg:gap-8">
                    <div className="uppercase">
                        <PrismicRichText
                            key={item.id}
                            field={item.heading}
                            components={{ heading2: ({ children }) => <h2 className="text-2xl mb-[var(--tw-2)] font-bold md:text-4xl md:margin-0">{children}</h2> }}
                        />
                    </div>

                    <div>
                        <PrismicRichText
                            field={item.text}
                            components={{ paragraph: ({ children }) => <p className="margin-0 max-w-md">{children}</p> }}
                        />
                    </div>
                </div>
            )}

            {slice.variation === "faq" && (
                <div className={expandableStyles.expandableWrapper_variation}>
                    <div className="flex justify-between">
                        <PrismicRichText
                            key={item.id}
                            field={item.question}
                            components={{
                                heading3: ({ children }) => <h3 className="text-white/60 md:text-xl uppercase">{children}</h3>,
                                heading4: ({ children }) => <h4 className="text-white/60 md:text-xl uppercase">{children}</h4>
                            }}
                        />
                    </div>
                    <div>
                        <PrismicRichText
                            field={item.answer}
                            components={{
                                paragraph: ({ children }) => <p className="md:text-xl max-w-xl">{children}</p>
                            }}
                        />
                    </div>
                </div>
            )}

        </div>
    )
}