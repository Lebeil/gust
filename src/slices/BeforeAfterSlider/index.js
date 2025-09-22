import { BeforeAfter } from "@/components/BeforeAfter";
import ResultCard from "@/components/ResultCard";
import NumberedCard from "@/components/NumberedCard";

import layoutStyles from "@/styles/Layout.module.css"
import workStyles from "@/styles/Work.module.css"

/**
 * @typedef {import("@prismicio/client").Content.BeforeAfterSliderSlice} BeforeAfterSliderSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<BeforeAfterSliderSlice>} BeforeAfterSliderProps
 * @param {BeforeAfterSliderProps}
 */

const BeforeAfterSlider = ({ slice }) => {
  const inverseClass = slice.primary.inverse ? workStyles.inverse : '';
  const widthClass = layoutStyles[`width__${slice.primary.width}`];
  const spacingTopClass = layoutStyles[`spacingTop__${slice.primary.spacing_top}`]
  const spacingBottomClass = layoutStyles[`spacingBottom__${slice.primary.spacing_bottom}`]


  const sectionContainerStyle = "px-12 pb-36"
  const maxWidthStyle = "mx-auto max-w-7xl"
  const gridStyle = "grid gap-8 grid-rows-[max-content]"

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className={`
        flex justify-center
        ${sectionContainerStyle}
      `}>

        {/* {
        slice.variation === "default" && (
          <div className={`${layoutStyles.sectionContainer} ${spacingTopClass} ${spacingBottomClass}`}>
            <BeforeAfter slice={slice} />
          </div>
        )
      } */}

        {
          slice.variation === "withFeature" && (
            <div
              className={`
            grid-cols-2
            ${maxWidthStyle}
            ${gridStyle}
        `}>

              <div
                className={`
                grid-cols-4 gap-y-12
                ${gridStyle}
              `}
              >

                {
                  slice.primary.card_feature.map((item, index) => {
                    return (
                      <NumberedCard key={index} item={item} index={index} />
                    );
                  })
                }
              </div>

              <div
                className={`
                    grid-cols-4
                    ${gridStyle}
                  `}
              >

                <div className={`col-span-3`}>
                  <BeforeAfter slice={slice} />
                </div>

                <div className={`flex flex-col gap-8`}>
                  {
                    slice.primary.result_feature.map((item, index) => (
                      <ResultCard key={index} item={item} index={index} />
                    ))
                  }
                </div>
              </div>
            </div>
          )
        }
      </div>
    </section>
  );
};

export default BeforeAfterSlider;
