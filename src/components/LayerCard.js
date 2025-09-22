'use client'
import { useRef } from 'react'
import { useTransform, motion, useScroll } from 'framer-motion'
import { PrismicRichText } from '@prismicio/react'

const LayerCard = ({ i, item, progress, range, targetScale, disableStack }) => {
  const container = useRef(null)

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  })
  
  const computedScale = useTransform(progress, range, [1, targetScale])
  const scale = disableStack ? 1 : computedScale

  const maxWidthStyle = "mx-auto max-w-7xl"

  return (
    <div
      ref={container}
      className={`
        px-[var(--tw-4)]
        h-auto flex items-center justify-center sticky top-[var(--tw-24)]
        ${maxWidthStyle}
      `}
    >
      <motion.div
        style={{ scale, top: `calc(4vh + ${i * 2}rem)` }}
        className={`
          relative top-[-25%] min-h-[500px] max-w-4xl w-full origin-top pb-[var(--tw-8)]
          bg-gradient-to-b from-white/20 to-transparent rounded-3xl
          backdrop-blur-md backdrop-brightness-95
          lg:min-h-[700px]
        `}
      >
        <div className={`
            border-white border-b-2 max-w-max
            m-[var(--tw-6)]
            lg:m-[var(--tw-12)] pb-[var(--tw-4)]
          `}
        >
          <PrismicRichText
            field={item.heading}
            components={{
              heading2: ({ children }) => <h2 className="text-4xl md:text-6xl uppercase font-jemina max-w-xl">{children}</h2>,
              heading3: ({ children }) => <h3 className="text-4xl md:text-6xl uppercase font-jemina max-w-xl">{children}</h3>
            }}
          />
        </div>
        <div className={`
            grid
            lg:grid-cols-2 lg:gap-x-6 lg:mx-6 lg:pb-12
          `}
        >
          <PrismicRichText
            field={item.text}
            components={{
              paragraph: ({ children }) => <p className="mb-[var(--tw-4)] px-[var(--tw-6)] last-child:mb-0 lg:p-[var(--tw-6)] lg:bg-gradient-to-b from-white/20 to-transparent rounded-xl">{children}</p>,
              list: ({ children }) => <ul className="mb-[var(--tw-4)] px-[var(--tw-6)] last-child:mb-0 lg:p-[var(--tw-6)] lg:bg-gradient-to-b from-white/20 to-transparent rounded-xl">{children}</ul>,
              listItem: ({ children }) => <li className="list-disc ml-4">{children}</li>
            }}
          />
        </div>
      </motion.div>
    </div>
  )
}

export default LayerCard