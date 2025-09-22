import { PrismicRichText } from "@prismicio/react"

const NumberedCard = ({ index, item }) => {
    const spreadStyle = item.spread ? "lg:col-span-4" : "lg:col-span-2"

    return (
        <div
            className={`
                w-full p-4
                bg-gradient-to-b from-white/20 to-transparent rounded-xl
                grid h-max

                lg:p-12
                ${spreadStyle}
            `}
        >
            <div className={`text-6xl mb-2 font-bold opacity-20`}>0{index + 1}</div>
            <div className={``}>
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
        </div>
    )
}

export default NumberedCard