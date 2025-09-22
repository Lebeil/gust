import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "../../components/PrismicRichText";

/**
 * @typedef {import("@prismicio/client").Content.NavigationItemSlice} NavigationItemSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<NavigationItemSlice>} NavigationItemProps
 * @param {NavigationItemProps}
 */

const NavigationItem = ({ slice }) => {

  return (
    <li
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {slice.variation === "default" ? (
        <PrismicNextLink field={slice.primary.link}>
          <PrismicRichText field={slice.primary.label} />
        </PrismicNextLink>
      ) : slice.variation === "withSubMenu" ? (
        <>
          <PrismicNextLink field={slice.primary.link}>
            <PrismicRichText field={slice.primary.label} />
          </PrismicNextLink>

          {slice.items.length > 0 && (
            <ul>
              {slice.items.map((subItem, index) => (
                <li key={index}>
                  <PrismicNextLink field={subItem.link}>
                    <PrismicRichText field={subItem.label} />
                  </PrismicNextLink>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <p>Unsupported variation</p>
      )}
    </li>
  );
};

export default NavigationItem;

