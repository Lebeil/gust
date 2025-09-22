import { PrismicRichText } from "@prismicio/react"
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io"

const SliceHeading = ({
    slice,
    isSlider,
    selectedWorkItems,
    setNextClick,
    setPrevClick
}) => {
    const handleNavClick = (direction) => {
        if (direction === "next") {
            setNextClick(true)
            setTimeout(() => {
                setNextClick(false)
            }, 200)
        }
        if (direction === "prev") {
            setPrevClick(true)
            setTimeout(() => {
                setPrevClick(false)
            }, 200)
        }
    }

    return (

        <div className={`${isSlider ? "px-[var(--tw-4)] md:px-[var(--tw-12)]" : "contents"}`}>
            <div
                className={`
                slice-heading 

                py-[--tw-4]
                md:py-[--tw-12]
            `}
            >

                <div
                    className="
                    border-b-2 border-white border-opacity-20
                    
                    md:px-16
                    lg:px-[var(--tw-24)]
                "
                >
                    <div
                        className="
                            flex justify-between items-center py-4
                            md:border-l-2 border-white border-opacity-20 md:border-r-2 border-white border-opacity-20
                            md:p-12 
                        "
                    >
                        <PrismicRichText
                            field={slice.primary.heading}
                            components={{
                                heading1: ({ children }) => (
                                    <h1
                                        className="
                                            m-0 font-jemina uppercase
                                            text-4xl 
                                            lg:text-7xl 
                                        "
                                    >{children}
                                    </h1>
                                ),
                                heading2: ({ children }) => (
                                    <h2
                                        className="
                                            m-0 font-jemina uppercase
                                            hyphens-auto
                                            text-4xl
                                            lg:text-7xl 
                                        "
                                    >{children}
                                    </h2>
                                ),

                            }}
                        />
                        {isSlider && selectedWorkItems.length > 0 && (
                            <div
                                className="
                                hidden
                                lg:flex md:items-end md:gap-4

                                "
                            >
                                <div
                                    className="embla__prev w-16 h-16 flex justify-center items-center bg-white/20 rounded-full cursor-pointer hover:border-2 hover:border-white/20"
                                    onClick={() => handleNavClick("prev")}
                                >
                                    <IoIosArrowRoundBack
                                        className="
                                        text-2xl
                                        md:text-3xl
                                    "
                                    />
                                </div>
                                <div
                                    className="embla__next w-16 h-16 flex justify-center items-center bg-white/20 rounded-full cursor-pointer hover:border-2 hover:border-white/20"
                                    onClick={() => handleNavClick("next")}
                                >
                                    <IoIosArrowRoundForward className="
                                        text-2xl
                                        md:text-3xl
                                    " />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SliceHeading