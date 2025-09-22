"use client"
import { SliceZone } from "@prismicio/react"
import { components } from "@/slices"

export function Footer({ footer, settings, pageType }) {
  return (
    <footer className={`footer ${pageType}`}>
      <div className="px-[var(--tw-4)] md:px-[var(--tw-12)]">
        <div
          className="
            h-[66.66svh]
            w-full flex flex-col items-center 
            md:justify-center
          "
        >
          <div className="w-full border-t-2 border-white border-opacity-20 self-start lg:self-end"></div>
          <SliceZone slices={footer.data.slices} components={components} />
        </div>
      </div>
    </footer >
  )
}