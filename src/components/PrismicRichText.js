import { PrismicNextLink } from "@prismicio/next"
import { PrismicRichText as BasePrismicRichText } from "@prismicio/react"
import rtStyles from "@/styles/RichText.module.css"

const defaultComponents = {
    paragraph: ({ children }) => <p className={rtStyles.p}>{children}</p>,
    oList: ({ children }) => (
        <ol className={rtStyles.ol}>{children}</ol>
    ),
    oListItem: ({ children }) => (
        <li className={rtStyles.ol_li}>{children}</li>
    ),
    list: ({ children }) => (
        <ul className={rtStyles.ul}>{children}</ul>
    ),
    listItem: ({ children }) => (
        <li className={rtStyles.ul_li}>{children}</li>
    ),
    preformatted: ({ children }) => (
        <pre className={rtStyles.pre}>
            <code>{children}</code>
        </pre>
    ),
    strong: ({ children }) => (
        <strong className={rtStyles.strong}>{children}</strong>
    ),
    hyperlink: ({ children, node }) => (
        <PrismicNextLink
            field={node.data}
            className={rtStyles.link}
        >
            {children}
        </PrismicNextLink>
    ),

    heading1: ({ children }) => <h1 className={rtStyles.h1}>{children}</h1>,
    heading2: ({ children }) => <h2 className={rtStyles.h2}>{children}</h2>,
    heading3: ({ children }) => <h3 className={rtStyles.h3}>{children}</h3>,
    heading4: ({ children }) => <h4 className={rtStyles.h4}>{children}</h4>,
    heading5: ({ children }) => <h5 className={rtStyles.h5}>{children}</h5>,
    heading6: ({ children }) => <h6 className={rtStyles.h5}>{children}</h6>,

}

export function PrismicRichText({ components, ...props }) {
    return (
        <BasePrismicRichText
            components={{ ...defaultComponents, ...components }}
            {...props}
        />
    )
}