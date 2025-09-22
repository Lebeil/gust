"use client"

import EmblaCarousel from "@/components/EmblaCarousel";
import layoutStyles from "@/styles/Layout.module.css";

/**
 * @typedef {import("@prismicio/client").Content.TextSliderSlice} TextSliderSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<TextSliderSlice>} TextSliderProps
 * @param {TextSliderProps}
 */

const TextSlider = ({ slice }) => {
  const slideArray = slice.variation === 'default'
    ? slice.primary.slider_text.map((item) => ({ type: 'text', content: item.text }))
    : slice.primary.slider_image.map(item => ({ type: 'image', content: item.image }));

  const isInverse = slice.primary.inverse;


  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div
        className={`
          pb-[var(--tw-20)]
          md:pb-[var(--tw-36)]
        `}
      >
        <EmblaCarousel slides={slideArray} inverse={isInverse} />
      </div>

    </section>
  );
};

export default TextSlider;
