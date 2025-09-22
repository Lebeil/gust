// "use client";
// import { useRef } from "react";
// import { PrismicRichText } from "../../components/PrismicRichText";
// import useInView from "@/lib/hooks/useInView";
// import CustomImage from "@/components/media/CustomImage";
// import CustomVideo from "@/components/media/CustomVideo";

// import mediaStyles from "@/styles/Media.module.css";
// import layoutStyles from "@/styles/Layout.module.css";

// const MediaText = ({ slice }) => {
//   const alignYClass = layoutStyles[`alignY__${slice.primary.align_y}`];
//   const inverseClass = slice.primary.inverse ? layoutStyles.inverse : "";
//   const widthClass = layoutStyles[`width__${slice.primary.width}`];
//   const spacingTopClass = layoutStyles[`spacingTop__${slice.primary.spacing_top}`]
//   const spacingBottomClass = layoutStyles[`spacingBottom__${slice.primary.spacing_bottom}`]

//   const ref = useRef(null);
//   const isInView = useInView(ref);

//   return (

//     <section
//       data-slice-type={slice.slice_type}
//       data-slice-variation={slice.variation}
//     >
//       <div className={`${layoutStyles.sectionContainer} ${widthClass} ${spacingTopClass} ${spacingBottomClass}`}>


//         {slice.variation === "default" && (
//           <div ref={ref} className={`${layoutStyles.gridContainer} ${layoutStyles.grid2} ${inverseClass} ${isInView ? mediaStyles.inView : ""}`}>

//             <div className={`${layoutStyles.gridItem}`}>
//               {slice.primary.media?.map((item, index) =>
//                 <div key={index} className={`${layoutStyles.mediaContainer}`}>
//                   <CustomImage field={item.image} withBackground={item.with_background} />
//                 </div>
//               )}

//               {slice.primary.media_feature?.length > 0 && (
//                 <ul className={`${mediaStyles.featureTags}`}>
//                   {slice.primary.media_feature.map((item, index) => (
//                     <li
//                       key={index}
//                       className={mediaStyles.featureTag}
//                       style={{ "--index": index }}
//                     >
//                       {item.pill}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>

//             <div className={`${layoutStyles.gridItem} ${layoutStyles.textContainer} ${alignYClass}`}>

//               {slice.primary.text_feature?.map((item, index) => (
//                 <div key={index}>
//                   <CustomImage field={item.image} width={250} />
//                 </div>
//               ))}
//               {slice.primary.rich_text?.map((item, index) =>
//                 <div key={index}>
//                   <PrismicRichText field={item.text} />
//                 </div>
//               )}
//             </div>
//           </div>
//         )}


//         {slice.variation === "withVideo" && (
//           <div className={`${layoutStyles.gridContainer} ${layoutStyles.grid2} ${inverseClass} ${isInView ? mediaStyles.inView : ""}`}>
//             <div className={`${layoutStyles.gridItem}`}>
//               {slice.primary.media?.map((item, index) => (
//                 <div key={index} className={`${layoutStyles.mediaContainer}`}>
//                   <CustomVideo src={item.video} withBackground={item.with_background} />
//                 </div>
//               ))}

//               {slice.primary.media_feature?.length > 0 && (
//                 <ul className={`${mediaStyles.featureTags}`}>
//                   {slice.primary.media_feature.map((item, index) => (
//                     <li
//                       key={index}
//                       className={mediaStyles.featureTag}
//                       style={{ "--index": index }}
//                     >
//                       {item.pill}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>

//             <div className={`${layoutStyles.gridItem} ${layoutStyles.textContainer} ${alignYClass}`}>
//               {slice.primary.rich_text?.map((item, index) => (
//                 <div key={index}>
//                   <PrismicRichText field={item.text} />
//                 </div>
//               ))}
//             </div>

//             {/* {slice.primary.media_feature && (
//               <ul className={`${tagsStyles.tagList_mediaFeature}`}>
//                 {slice.primary.media_feature.map((item, index) => (
//                   <li
//                     key={index}
//                     className={tagsStyles.tag}
//                     style={{ "--index": index }}
//                   >
//                     {item.pill}
//                   </li>
//                 ))}
//               </ul>
//             )} */}
//           </div>
//         )}

//       </div>
//     </section >
//   );
// };

// export default MediaText;


"use client";
import { useRef } from "react";
import { PrismicRichText } from "../../components/PrismicRichText";
import { PrismicNextImage } from "@prismicio/next"; // ✅
import useInView from "@/lib/hooks/useInView";

import mediaStyles from "@/styles/Media.module.css";
import layoutStyles from "@/styles/Layout.module.css";

const MediaText = ({ slice }) => {
  const alignYClass = layoutStyles[`alignY__${slice.primary.align_y}`];
  const inverseClass = slice.primary.inverse ? layoutStyles.inverse : "";
  const widthClass = layoutStyles[`width__${slice.primary.width}`];
  const spacingTopClass = layoutStyles[`spacingTop__${slice.primary.spacing_top}`];
  const spacingBottomClass = layoutStyles[`spacingBottom__${slice.primary.spacing_bottom}`];

  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className={`${layoutStyles.sectionContainer} ${widthClass} ${spacingTopClass} ${spacingBottomClass}`}>

        {slice.variation === "default" && (
          <div ref={ref} className={`${layoutStyles.gridContainer} ${layoutStyles.grid2} ${inverseClass} ${isInView ? mediaStyles.inView : ""}`}>

            {/* Media block */}
            <div className={`${layoutStyles.gridItem}`}>
              {slice.primary.media?.map((item, index) => (
                <div key={index} className={`${layoutStyles.mediaContainer}`}>
                  <PrismicNextImage field={item.image} className="object-contain" />
                </div>
              ))}

              {/* Feature tags */}
              {slice.primary.media_feature?.length > 0 && (
                <ul className={mediaStyles.featureTags}>
                  {slice.primary.media_feature.map((item, index) => (
                    <li key={index} className={mediaStyles.featureTag} style={{ "--index": index }}>
                      {item.pill}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Text block */}
            <div className={`${layoutStyles.gridItem} ${layoutStyles.textContainer} ${alignYClass}`}>
              {slice.primary.text_feature?.map((item, index) => (
                <div key={index}>
                  <PrismicNextImage field={item.image} width={250} className="object-contain" />
                </div>
              ))}
              {slice.primary.rich_text?.map((item, index) => (
                <div key={index}>
                  <PrismicRichText field={item.text} />
                </div>
              ))}
            </div>
          </div>
        )}

        {slice.variation === "withVideo" && (
          <div className={`${layoutStyles.gridContainer} ${layoutStyles.grid2} ${inverseClass} ${isInView ? mediaStyles.inView : ""}`}>

            {/* Video block */}
            <div className={`${layoutStyles.gridItem}`}>
              {slice.primary.media?.map((item, index) => (
                <div key={index} className={`${layoutStyles.mediaContainer}`}>
                  <video
                    src={item.video.url}
                    className="w-full h-auto object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </div>
              ))}

              {/* Feature tags */}
              {slice.primary.media_feature?.length > 0 && (
                <ul className={mediaStyles.featureTags}>
                  {slice.primary.media_feature.map((item, index) => (
                    <li key={index} className={mediaStyles.featureTag} style={{ "--index": index }}>
                      {item.pill}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Text block */}
            <div className={`${layoutStyles.gridItem} ${layoutStyles.textContainer} ${alignYClass}`}>
              {slice.primary.rich_text?.map((item, index) => (
                <div key={index}>
                  <PrismicRichText field={item.text} />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default MediaText;
