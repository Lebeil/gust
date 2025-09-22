"use client"
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText } from '@prismicio/react'

const SubHero = ({ slice }) => {

    const imageObj = {
        alt: slice.primary.media.text || "",
        dimensions: {
            width: Number(slice.primary.media.width),
            height: Number(slice.primary.media.height)
        },
        url: slice.primary.media.url
    }

    return (
        <div
            className="
                flex flex-col justify-center relative
                lg:min-h-screen lg:gap-[var(--tw-12)]
            "
        >

            <div
                className="
                    flex flex-col justify-center gap-[var(--tw-6)] h-screen
                    lg:h-auto lg:grid lg:items-center lg:max-w-5xl lg:mx-auto lg:gap-[var(--tw-12)]
                    "
            >

                <figure className="m-0 flex justify-center md:max-h-48">
                    {
                        slice.primary.media.kind === "image"
                            ? <PrismicNextImage field={imageObj} className="w-auto object-contain" />
                            : <video src={slice.primary.media.url} autoPlay loop muted playsInline />
                    }
                </figure>

                <div className="lg:text-center">
                    <PrismicRichText
                        field={slice.primary.text}
                        components={{
                            heading2: ({ children }) => <h2 className="md:text-lg font-bold uppercase">{children}</h2>,
                            heading3: ({ children }) => <h3 className="md:text-lg font-bold uppercase">{children}</h3>,
                            paragraph: ({ children }) => <p className="md:text-lg">{children}</p>,
                        }}
                    />
                </div>

            </div>

            <div
                className={`
                        grid gap-[var(--tw-4)]
                        lg:grid-cols-3 lg:gap-8 lg:max-w-7xl lg:mx-auto
                    `}
            >

                {
                    slice.primary.text_blocks?.map((item, index) => (
                        <div
                            key={index}
                            className={`
                                        px-[var(--tw-4)] py-8
                                        bg-gradient-to-b from-white/20 to-transparent rounded-xl
                                        grid h-max

                                        lg:p-8 
                                        ${item.spread ? "col-span-2" : ""}
                                    `}
                        >
                            <PrismicRichText
                                field={item.heading}
                                components={{
                                    heading2: ({ children }) => <h2 className="mb-4 text-2xl font-bold font-avenir uppercase">{children}</h2>,
                                    heading3: ({ children }) => <h3 className="mb-4 text-2xl font-bold font-avenir uppercase">{children}</h3>
                                }}
                            />
                            <PrismicRichText
                                field={item.body}
                                components={{
                                    paragraph: ({ children }) => <p className="max-w-lg">{children}</p>,
                                    list: ({ children }) => <ul className="m-0 pl-4">{children}</ul>,
                                    listItem: ({ children }) => <li className="list-disc">{children}</li>
                                }}
                            />
                        </div>

                    ))
                }

            </div>
        </div>
    )
}

export default SubHero