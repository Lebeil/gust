// Simple Rich Text component to replace PrismicRichText
import Link from "next/link"

const RichText = ({ content, components = {} }) => {
  if (!content) return null

  // Default components
  const defaultComponents = {
    paragraph: ({ children }) => <p className="mb-4">{children}</p>,
    heading1: ({ children }) => <h1 className="text-4xl font-bold mb-4">{children}</h1>,
    heading2: ({ children }) => <h2 className="text-3xl font-bold mb-4">{children}</h2>,
    heading3: ({ children }) => <h3 className="text-2xl font-bold mb-4">{children}</h3>,
    list: ({ children }) => <ul className="mb-4 pl-4">{children}</ul>,
    listItem: ({ children }) => <li className="list-disc mb-2">{children}</li>,
    link: ({ children, href }) => (
      <Link href={href} className="underline hover:no-underline">
        {children}
      </Link>
    )
  }

  const finalComponents = { ...defaultComponents, ...components }

  // Simple text rendering for now - can be extended for more complex markup
  if (typeof content === 'string') {
    return finalComponents.paragraph({ children: content })
  }

  if (Array.isArray(content)) {
    return (
      <div>
        {content.map((item, index) => (
          <div key={index}>
            {typeof item === 'string' 
              ? finalComponents.paragraph({ children: item })
              : finalComponents.paragraph({ children: item.text || item })
            }
          </div>
        ))}
      </div>
    )
  }

  return finalComponents.paragraph({ children: content })
}

export default RichText
