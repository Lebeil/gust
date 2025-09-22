import { PrismicRichText } from "@prismicio/react"

const ResultCard = ({ item }) => {
    return (
        <div
            className="
                flex-1 basis-1/4 flex flex-col justify-center items-center p-4 w-36 h-36
                bg-gradient-to-b from-white/20 to-transparent rounded-xl
                border-white border-2
            "
        >
            <PrismicRichText
                field={item.heading}
                components={{
                    heading2: ({ children }) => <h2 className="w-max text-2xl lg:text-4xl pb-2 font-bold uppercase border-b border-white">{children}</h2>,
                    heading3: ({ children }) => <h3 className="w-max text-2xl lg:text-4xl pb-2 font-bold uppercase border-b border-white">{children}</h3>
                }}
            />
            <PrismicRichText
                field={item.body}
                components={{
                    paragraph: ({ children }) => <p className="pt-2">{children}</p>,
                }}
            />
        </div>
    )
}

export default ResultCard