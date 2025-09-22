import { ExpandableRow } from "@/components/ExpandableRow";
import SliceHeading from "@/components/SliceHeading"; // import the new SliceHeading
// import { PrismicRichText } from '@prismicio/react';

import layoutStyles from "@/styles/Layout.module.css"

/**
 * @typedef {import("@prismicio/client").Content.ExpandableRowsSlice} ExpandableRowsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ExpandableRowsSlice>} ExpandableRowsProps
 * @param {ExpandableRowsProps}
 */
const ExpandableRows = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
        <div
        className={`
          px-[var(--tw-4)] pb-[var(--tw-24)]
          md:px-[var(--tw-12)] md:pb-[var(--tw-36)]
        `}
      >

      <SliceHeading slice={slice} />

    
        <div className="
            md:px-28
            lg:px-[var(--tw-36)]

        "
        >
          {slice.primary.row.map((item) => (
            <ExpandableRow key={item.id} item={item} slice={slice} />
          ))}

        </div>
      </div>
    </section >
  );
};

export default ExpandableRows;

