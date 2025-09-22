"use client"
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import SliceHeading from "@/components/SliceHeading";
import Link from "next/link";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import ScrollingBackgroundGradient from "@/components/scrollingBackgroundGradient/ScrollingBackgroundGradient";
import { PAGE_PALETTES } from "@/components/scrollingBackgroundGradient/gradientSettings";


/**
 * @typedef {import("@prismicio/client").Content.BranchesPortalSlice} BranchesPortalSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<BranchesPortalSlice>} BranchesPortalProps
 * @param {BranchesPortalProps}
 */
const BranchesPortal = ({ slice }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);


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

        <div
          className={`
            flex justify-center
            lg:px-12
        `}
        >

          <div
            className="
              flex flex-col gap-4
              py-6
              md:gap-[var(--tw-12)]
              lg:flex-row lg:max-w-7xl lg:gap-8
            "
          >
            {slice.primary.portal.map((item, index) => {
              const isHovered = hoveredIndex === index
              const linkUrl = item.link?.url?.replace(/\/$/, "") || "/";

              return (
                <Link
                  key={index}
                  href={item.link?.url || "/"}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`
                  relative flex flex-col w-full
                  border-2 border-transparent hover:border-white
                  justify-between gap-2 items-center
                  rounded-3xl overflow-hidden cursor-pointer
                  px-4 py-8
                  md:px-8 md:py-16
                  lg:gap-4
                  transition-all duration-300 ease-in-out
                  opacity-100 lg:opacity-50 hover:lg:opacity-100
                `}
                >

                  <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
                    <Canvas
                      gl={{ alpha: false, antialias: false }}
                      className="!w-full !h-full"
                    >
                      <ScrollingBackgroundGradient
                        disableScroll={true}
                        paletteOverride={PAGE_PALETTES[linkUrl] || DEFAULT_PALETTE}
                      />
                    </Canvas>
                  </div>


                  {/* Image */}
                  <figure className="relative aspect-square flex justify-center items-center z-10 lg:w-full">
                    <PrismicNextImage
                      field={item.image}
                      className="object-contain max-h-48"
                    />
                  </figure>

                  {/* Expanding Text Without Fixed Max Height */}
                  <div
                    className={`
                    z-10  overflow-hidden text-center
                    lg:transition-all lg:duration-300 lg:ease-in-out
                    ${isHovered ? "lg:opacity-100" : "lg:opacity-20"}
                    lg:w-full
                  `}
                  >
                    <PrismicRichText field={item.description} />

                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

    </section >
  );
};


export default BranchesPortal;
