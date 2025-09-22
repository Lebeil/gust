"use client"
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import Image from "next/image";
import NumberedCard from "@/components/NumberedCard";
import ResultCard from "@/components/ResultCard";

/**
 * @typedef {import("@prismicio/client").Content.WorkMediaSlice} WorkMediaSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<WorkMediaSlice>} WorkMediaProps
 * @param {WorkMediaProps}
 */

const WorkMedia = ({ slice }) => {

  const media = slice.primary.media ? slice.primary.media : {}
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >

      <div
        className={`
          px-[var(--tw-4)] pb-[var(--tw-12)]
          md:px-[var(--tw-12)] md:pb-[var(--tw-24)]
        `}
      >
        <div
          className="
            lg:px-[var(--tw-24)] flex flex-col items-center gap-12"
        >




          {slice.variation === 'default' && (
            <div>

              {slice.primary.media?.map((item, index) => (
                <figure key={index} className="rounded-3xl overflow-hidden">
                  {item.video ? (
                    <video
                      width="100%"
                      height="100%"
                      autoPlay
                      loop
                      muted
                      playsInline
                    >
                      <source src={item.video} type="video/mp4" />
                    </video>
                  ) : (
                    <PrismicNextImage field={item.image} />
                  )}
                </figure>
              ))}
            </div>
          )}


          {
            slice.variation === "withFeature" && (
              <div
                className={`
                  flex  flex-col-reverse gap-[var(--tw-6)]
                  lg:grid lg:grid-cols-2 lg:grid-rows-[max-content] lg:gap-[var(--tw-12)] 
                `}
              >

                <div className="grid gap-[var(--tw-6)]">
                  <div
                    className={`
                      grid gap-[var(--tw-4)]
                      lg:h-auto lg:gap-8 lg:grid-rows-[max-content] lg:grid-cols-4
                  `}
                  >
                    {
                      slice.primary.card_feature?.map((item, index) => <NumberedCard key={index} item={item} index={index} />)
                    }
                  </div>

                  <div
                    className={`
                      flex flex-wrap justify-center gap-[var(--tw-4)] h-min
                      lg:gap-8
                    `}
                  >
                    {
                      slice.primary.result_feature?.map((item, index) => (
                        <ResultCard key={index} item={item} index={index} />
                      ))
                    }
                  </div>

                </div>


                <div
                  className={`grid gap-8 grid-rows-[max-content] grid-cols-4`}>

                  <figure
                    className="
                      overflow-hidden col-span-4 rounded-3xl
                      lg:col-span-3
                    "
                  >
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
                        alt={media.text ? media.text : ""}
                      />
                    )}
                  </figure>


                  {/* <div className={`flex flex-col gap-8`}>
                    {
                      slice.primary.result_feature.map((item, index) => (
                        <ResultCard key={index} item={item} index={index} />
                      ))
                    }
                  </div> */}

                </div>
              </div>
            )
          }


          {
            slice.variation === "mediaPaysage" && (
              <div
                className={`
                  flex flex-col gap-[var(--tw-6)]
                  lg:gap-[var(--tw-12)] 
                `}
              >



                <div
                  className={`
                      flex flex-col gap-[var(--tw-4)]
                      lg:flex-row lg:gap-8
                  `}
                >
                  {
                    slice.primary.card_feature?.map((item, index) => <NumberedCard key={index} item={item} index={index} />)
                  }
                </div>


                <div
                  className="

                    md:px-[var(--tw-12)]
                  "
                >
                  <figure
                    className="
                    aspect-landscape
                      overflow-hidden 
                      rounded-xl
                      lg:rounded-3xl
                    "
                  >
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
                        alt={media.text ? media.text : ""}
                      />
                    )}
                  </figure>
                </div>

                <div
                  className={`
                      flex flex-wrap justify-center gap-[var(--tw-4)] h-min
                      lg:gap-8
                    `}
                >
                  {
                    slice.primary.result_feature?.map((item, index) => (
                      <ResultCard key={index} item={item} index={index} />
                    ))
                  }
                </div>
              </div>
            )
          }










          {/* {slice.variation === 'columns' && (
            <>
              <div className="grid grid-cols-2 gap-8 max-w-3xl">
                {slice.primary.media_blocks.map((block, index) => (
                  <figure key={index} className="rounded-3xl overflow-hidden max-h-max">
                    {block.media.url.includes('.mp4') ? (
                      <video
                        width="100%"
                        height="100%"
                        autoPlay
                        loop
                        muted
                        playsInline
                        aria-label={block.media.text || "Video"}
                      >
                        <source src={block.media.url} type="video/mp4" />
                      </video>
                    ) : (
                      <Image
                        src={block.media.url}
                        width={Number(block.media.width)}
                        height={Number(block.media.height)}
                        alt={block.media.text || "Image"}
                      />
                    )}
                  </figure>
                ))}
              </div>

              <div className="flex gap-8">
                {slice.primary.numbered_cards.map((item, index) => (
                  <NumberedCard key={index} item={item} index={index} />
                ))}
              </div>
            </>
          )} */}


          {
            slice.variation === "columns" && (
              <div
                className={`
                  flex flex-col gap-[var(--tw-6)]
                  lg:gap-[var(--tw-12)] 
                `}
              >



                <div
                  className={`
                      flex flex-col gap-[var(--tw-4)]
                      lg:flex-row lg:gap-8
                  `}
                >
                  {
                    slice.primary.card_feature?.map((item, index) => <NumberedCard key={index} item={item} index={index} />)
                  }
                </div>


                <div className="grid lg:grid-cols-2 gap-4 order-[-1] lg:gap-8 max-w-3xl mx-auto">
                  {slice.primary.media_blocks.map((block, index) => (
                    <figure key={index} className="rounded-xl lg:rounded-3xl overflow-hidden max-h-max">
                      {block.media.url.includes('.mp4') ? (
                        <video
                          width="100%"
                          height="100%"
                          autoPlay
                          loop
                          muted
                          playsInline
                          aria-label={block.media.text || "Video"}
                        >
                          <source src={block.media.url} type="video/mp4" />
                        </video>
                      ) : (
                        <Image
                          src={block.media.url}
                          width={Number(block.media.width)}
                          height={Number(block.media.height)}
                          alt={block.media.text? block.media.text : ""}
                        />
                      )}
                    </figure>
                  ))}
                </div>

                <div
                  className={`
                      flex flex-wrap justify-center gap-[var(--tw-4)] h-min
                      lg:gap-8
                    `}
                >
                  {
                    slice.primary.result_feature?.map((item, index) => (
                      <ResultCard key={index} item={item} index={index} />
                    ))
                  }
                </div>
              </div>
            )
          }




        </div>
      </div>
    </section>
  );
};

export default WorkMedia;
