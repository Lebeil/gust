// import { PrismicRichText } from "../../components/PrismicRichText";

// import layoutStyles from "@/styles/Layout.module.css";

// /**
//  * @typedef {import("@prismicio/client").Content.LargeTextSlice} LargeTextSlice
//  * @typedef {import("@prismicio/react").SliceComponentProps<LargeTextSlice>} LargeTextProps
//  * @param {LargeTextProps}
//  */

// const LargeText = ({ slice }) => {
//   const alignXClass = layoutStyles[`alignX__${slice.primary.align_x}`];
//   const widthClass = layoutStyles[`width__${slice.primary.width}`];
//   const spacingTopClass = layoutStyles[`spacingTop__${slice.primary.spacing_top}`]
//   const spacingBottomClass = layoutStyles[`spacingBottom__${slice.primary.spacing_bottom}`]

//   return (
//     <section
//       data-slice-type={slice.slice_type}
//       data-slice-variation={slice.variation}
//     >
//       <div className={`${layoutStyles.sectionContainer} ${widthClass} ${spacingTopClass} ${spacingBottomClass}`}>
//         <div className={`${alignXClass}`}>
//           {slice.variation === "default" && (
//             <div>
//               {slice.primary.rich_text?.map((item) => (
//                 <PrismicRichText
//                   key={item.id}
//                   field={item.text}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default LargeText;


import { PrismicRichText } from "@prismicio/react";
import layoutStyles from "@/styles/Layout.module.css";

/**
 * @typedef {import("@prismicio/client").Content.LargeTextSlice} LargeTextSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<LargeTextSlice>} LargeTextProps
 * @param {LargeTextProps}
 */

const LargeHeading = ({ slice }) => {
  // const alignXClass = layoutStyles[`alignX__${slice.primary.align_x}`];
  // const widthClass = layoutStyles[`width__${slice.primary.width}`];
  // const spacingTopClass = layoutStyles[`spacingTop__${slice.primary.spacing_top}`]
  // const spacingBottomClass = layoutStyles[`spacingBottom__${slice.primary.spacing_bottom}`]

   const sectionContainerStyle = "px-12 pb-36"
   const maxWidthStyle = "mx-auto max-w-7xl"
   const gridStyle = "grid gap-8"

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className={`${sectionContainerStyle}`}>
        {slice.variation === "default" && (
          <div className={`${gridStyle} ${maxWidthStyle}`}>
            {slice.primary.rich_text?.map((item, index) => (
              <PrismicRichText
                key={index}
                field={item.text}
                components={{
                  heading1: ({ children }) => <h1 className="text-7xl font-bold font-avenir uppercase">{children}</h1>,
                  heading2: ({ children }) => <h2 className="text-7xl font-bold font-avenir uppercase">{children}</h2>,
                  paragraph: ({ children }) => <p className={`max-w-4xl text-md font-avenir`}>{children}</p>
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LargeHeading;
