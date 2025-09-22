"use client";
import { PrismicRichText } from "@prismicio/react";
import Image from "next/image";


/**
 * @typedef {import("@prismicio/client").Content.MediaSlice} MediaSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<MediaSlice>} MediaProps
 * @param {MediaProps}
 */

const Media = ({ slice }) => {
  const media = slice.primary.media ? slice.primary.media : {}

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >


      {slice.variation === 'default' && (
        <div
          className={`
            flex justify-center
          `}
        >

          <figure className="h-[55vh] w-auto flex rounded-3xl overflow-hidden">
            {media.kind === "file" ? (
              <video
                width="100%"
                height="100%"
                autoPlay
                loop
                muted
                playsInline
                aria-label={media.alt}
              >
                <source src={media.url} type="video/mp4" />
              </video>
            ) : media.kind === "image" && (
              <Image
                src={media.url}
                width={Number(media.width)}
                height={Number(media.height)}
                alt={media.text? media.text : ""}
              />
            )}
          </figure>
        </div>
      )}



      {slice.variation === 'withList' && (
        <div
          className="
            grid grid-cols-1 py-[var(--tw-12)]
            lg:grid-cols-2 lg:items-center lg:gap-[var(--tw-12)]
            "
        >
          <figure className="max-w-2xl justify-self-end pr-16 hidden lg:block">
            {media.kind === "file" ? (
              <video
                width="100%"
                height="100%"
                autoPlay
                loop
                muted
                playsInline
                aria-label={media.alt}
              >
                <source src={media.url} type="video/mp4" />
              </video>
            ) : media.kind === "image" ? (
              <Image
                src={media.url}
                width={Number(media.width)}
                height={Number(media.height)}
                alt={media.text ? media.text : ""}
              />
            ) : null}
          </figure>

          <div className="no-list-style">
            {slice.primary.list_container.map((item, index) => (
              <PrismicRichText field={item.list} key={index} />
            ))}
          </div>
        </div>
      )}







    </section>
  );
};

export default Media;
