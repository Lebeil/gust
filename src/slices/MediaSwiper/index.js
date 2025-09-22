// "use client";
// import React, { useEffect, useState } from "react";
// import { createClient } from "../../prismicio";
// import EmblaCarousel from "../../components/EmblaCarousel";
// import SliceHeading from "@/components/SliceHeading";

// const MediaSwiper = ({ slice }) => {
//   const [workItems, setWorkItems] = useState([]);

//   const selectedBranch = slice.primary.branch ? slice.primary.branch.trim().toLowerCase().replace(/\s+/g, "-") : "";

//   const selectedWorkItems = workItems.filter(item => {
//     if (selectedBranch === "all") {
//       return true;
//     }

//     const branch = item.data.branch ? item.data.branch.toLowerCase().replace(/\s+/g, "-") : "";

//     return branch === selectedBranch;
//   });

//   useEffect(() => {
//     const fetchWorkItems = async () => {
//       const client = createClient();

//       const response = await client.getAllByType("work", {
//         graphQuery: `{
//             work {
//               uid
//               title
//               branch
//               image
//               video
//               cover
//               preview_video
//             }
//           }`
//       });

//       if (response.length > 0) {
//         setWorkItems(response);
//       }
//     };

//     fetchWorkItems();
//   }, [slice]);

//   const slideMinimum = selectedWorkItems.length <= 5;

//   return (
//     <section
//       data-slice-type={slice.slice_type}
//       data-slice-variation={slice.variation}
//     >
//       <div
//         className={`
//             pb-36
//             `}
//       >

//         <SliceHeading
//           slice={slice}
//           isSwiper
//           selectedWorkItems={selectedWorkItems}
//         />


//         {selectedWorkItems.length > 0 && (
//           <EmblaCarousel
//             slides={slideMinimum ? [...selectedWorkItems, ...selectedWorkItems, ...selectedWorkItems] : selectedWorkItems}
//             nextClick={nextClick}
//             prevClick={prevClick}
//           />
//         )}

//       </div>

//     </section>
//   );
// };

// export default MediaSwiper;


"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "../../prismicio";
import EmblaCarousel from "@/components/EmblaCarousel";
import SliceHeading from "@/components/SliceHeading";

const MediaSwiper = ({ slice }) => {
  const [workItems, setWorkItems] = useState([]);
  const [prevClick, setPrevClick] = useState(false);
  const [nextClick, setNextClick] = useState(false);

  const selectedBranch = slice.primary.branch
    ? slice.primary.branch.trim().toLowerCase().replace(/\s+/g, "-")
    : "";

  const selectedWorkItems = workItems.filter(item => {
    if (selectedBranch === "all") {
      return true;
    }
    const branch = item.data.branch
      ? item.data.branch.toLowerCase().replace(/\s+/g, "-")
      : "";
    return branch === selectedBranch;
  });

  useEffect(() => {
    const fetchWorkItems = async () => {
      const client = createClient();
      const response = await client.getAllByType("work", {
        graphQuery: `{
            work {
              uid
              title
              branch
              cover
              preview_video
            }
          }`
      });
      if (response.length > 0) {
        setWorkItems(response);
      }
    };

    fetchWorkItems();
  }, [slice]);

  const slideMinimum = selectedWorkItems.length <= 5;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >

      <div
        className={`
          pb-24
          md:pb-[var(--tw-36)]

        `}
      >
        <SliceHeading
          slice={slice}
          isSlider
          selectedWorkItems={selectedWorkItems}
          setNextClick={setNextClick}
          setPrevClick={setPrevClick}
        />

        {selectedWorkItems.length > 0 && (
          <EmblaCarousel
            slides={
              slideMinimum
                ? [...selectedWorkItems, ...selectedWorkItems, ...selectedWorkItems]
                : selectedWorkItems
            }
            nextClick={nextClick}
            prevClick={prevClick}
          />
        )}
      </div>
    </section>
  );
};

export default MediaSwiper;
