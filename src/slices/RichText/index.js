import { PrismicRichText } from "@/components/PrismicRichText";
import SliceHeading from "@/components/SliceHeading";
import { PrismicNextLink } from "@prismicio/next";
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";


import layoutStyles from "@/styles/Layout.module.css"

/**
 * @typedef {import("@prismicio/client").Content.RichTextSlice} RichTextSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<RichTextSlice>} RichTextProps
 * @param {RichTextProps}
 */

const RichText = ({ slice }) => {



  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div
        className={`
          px-[var(--tw-4)] pb-[var(--tw-6)]
          md:px-[var(--tw-12)] md:pb-[var(--tw-12)]
        `}
      >
        <SliceHeading slice={slice} />



        <div className="
            md:px-28
            lg:px-[var(--tw-36)]

        "
        >
          <div
            className={`
              grid gap-[var(--tw-4)]
              md:grid-cols-1 md:gap-[var(--tw-6)]
              lg:grid-cols-2 lg:gap-[var(--tw-12)]
            `}
          >
            {slice.primary.text_blocks.map((item, index) => (

              <div key={index} className="">
                <PrismicRichText
                  field={item.text}
                  components={{
                    paragraph: ({ children }) => <p className="">{children}</p>,
                    list: ({ children }) => <ul className="">{children}</ul>,
                    listItem: ({ children }) => <li className="list-disc">{children}</li>,
                    hyperlink: ({ children, node }) => (
                      <PrismicNextLink
                        field={node.data}
                        className={"underline"}
                      >
                        {children}
                      </PrismicNextLink>
                    ),
                  }}
                />
                <div className={`${item.button?.length ? "" : ""}`}>
                  {item.button?.map((link, index) => (
                    <div
                      key={index}
                      className="
                        flex justify-between items-center py-[var(--tw-2)] px-[var(--tw-4)] bg-white bg-opacity-20 uppercase cursor-pointer
                        "
                      >
                      <PrismicNextLink
                        key={link.key}
                        field={link}
                        className={`
                          text-sm
                          ${link.variation}
                        `}
                      />
                      <IoIosArrowRoundForward size={35} className="hidden md:block"/>
                    </div>
                  ))}

                </div>
              </div>

            ))}
          </div>

        </div>


      </div>
    </section>
  );
};

export default RichText;

