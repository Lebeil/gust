import NumberedCard from "../../components/NumberedCard";
import layoutStyles from "@/styles/Layout.module.css";

/**
 * @typedef {import("@prismicio/client").Content.NumberedCardSlice} NumberedCardSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<NumberedCardSlice>} NumberedCardProps
 * @param {NumberedCardProps}
 */
const NumberedCards = ({ slice }) => {


  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {slice.variation === "default" && (
        <div
          className={`
            flex  max-w-7xl mx-auto 
            lg:pb-[var(--tw-36)] gap-[var(--tw-12)]
          `}
        >
          {slice.primary.card.map((item, index) => (
            <NumberedCard className={layoutStyles.flexItem} key={item.id} item={item} index={index} />
          ))}
        </div>
      )}

      {/* {slice.variation === "withFeature" && (
        <div className={`${layoutStyles.sectionContainer} ${widthClass} ${layoutStyles.gridContainer} ${layoutStyles.grid4} ${spacingTopClass} ${spacingBottomClass}`}>
          <div className={`${cardStyles.cardList_variation}`}>
            {slice.primary.card.map((item, index) => (
              <NumberedCard key={item.id} item={item} index={index} variation={slice.variation} />
            ))}
          </div>


          {slice.primary.feature.map((item, index) => (
            <div key={index}>
              {item.image && <CustomImage field={item.image} />}
              {item.video && <CustomVideo src={item.video} />}
              {item.text && <PrismicRichText field={item.text} />}
            </div>
          ))}

        </div>
      )} */}
    </section>
  );
};

export default NumberedCards;
