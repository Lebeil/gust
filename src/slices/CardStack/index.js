'use client';
import { useRef } from 'react';
import LayerCard from '../../components/LayerCard';
import { useScroll } from 'framer-motion';

/**
 * @typedef {import("@prismicio/client").Content.CardStackSlice} CardStackSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<CardStackSlice>} CardStackProps
 * @param {CardStackProps}
 */
const CardStack = ({ slice }) => {
  const container = useRef(null);
  const disableStack = slice.primary.card.length === 1;

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div
        ref={container}
        className="
          pb-[var(--tw-36)]
          lg:pb-[var(--tw-48)]
        "
      >
        {slice.variation === 'default' &&
          slice.primary.card.map((item, i) => {
            // When stacking is disabled, ensure targetScale is 1 and range is inconsequential.
            const targetScale = disableStack ? 1 : 1 - ((slice.primary.card.length - i) * 0.05);
            const range = disableStack ? [0, 0] : [i * 0.25, 1];
            return (
              <LayerCard
                key={`p_${i}`}
                i={i}
                item={item}
                progress={scrollYProgress}
                range={range}
                targetScale={targetScale}
                disableStack={disableStack}
              />
            );
          })}
      </div>
    </section>
  );
};

export default CardStack;
