"use client"
import React, { useState, useMemo, useEffect } from "react"
import { usePathname } from "next/navigation"
import { PrismicText } from "@prismicio/react"
import { MoreIcon } from "./icons/MoreIcon"
import useViewport from "@/lib/hooks/useViewport"
import { PrismicNextImage } from "@prismicio/next"
import Link from "next/link"
import { getLocalizedPath } from "@/lib/localizePath"

export function Header({ header, settings, page_type, locales }) {
  const slices = useMemo(() => [...header.data.slices], [header.data.slices])
  const pathname = usePathname()
  const viewport = useViewport()
  const showBurger = viewport.isMobile || viewport.isTablet
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => setIsOpen(!isOpen)
  const handleMouseEnter = () => setIsOpen(true)
  const handleMouseLeave = () => setIsOpen(false)

  const getActiveSubPageLabel = (item) => {
    const subMenuItems = item.primary.sub_menu || []
    const activeSubPage = subMenuItems.find(
      (subItem) => pathname === getLocalizedPath(subItem.sub_link?.url, currentLang)
    )
    return activeSubPage?.sub_label?.[0]?.text || null
  }

  useEffect(() => {
    if (showBurger) {
      document.body.style.overflow = isOpen ? "hidden" : "auto"
    }
  }, [isOpen, showBurger])

  const currentLang = locales?.currentLang || ""

  return (
    <header className="relative z-20">
      <nav className="fixed top-0 w-full max-w-[inherit] grid grid-cols-2 gap-[var(--tw-12)] items-center px-[var(--tw-4)] py-[var(--tw-6)] md:p-[var(--tw-12)]">
        <Link href={getLocalizedPath("/", currentLang)} className="z-10">
          <figure className="max-w-24">
            <PrismicNextImage field={settings.data.logo_1} priority />
          </figure>
        </Link>

        <ul className="hidden lg:flex lg:justify-between uppercase m-0">
          {slices.map((item, index) => {
            const baseUrl = item.primary.link?.url || ""
            const localizedUrl = getLocalizedPath(baseUrl, currentLang)
            const isActive = pathname === localizedUrl || (pathname === "/" && localizedUrl === "/")
            const hasSubMenu = item.variation === "withSubMenu"
            const subMenuItems = item.primary.sub_menu || []
            const activeSubPageLabel = hasSubMenu ? getActiveSubPageLabel(item) : null

            return (
              <li
                onMouseEnter={hasSubMenu ? handleMouseEnter : undefined}
                onMouseLeave={hasSubMenu ? handleMouseLeave : undefined}
                key={index}
                className={`
                  text-md font-avenir relative flex gap-2 items-center group hover:opacity-100 cursor-pointer
                  ${(!hasSubMenu && isActive) || (hasSubMenu && activeSubPageLabel)
                    ? "opacity-100"
                    : "opacity-50"
                  }`}
              >
                {hasSubMenu && activeSubPageLabel ? (
                  <div className="flex gap-2.5 items-center">
                    <span>{activeSubPageLabel}</span>
                    <MoreIcon onMouseEnter={handleClick} isOpen={isOpen} size={12} />
                  </div>
                ) : (
                  <Link href={localizedUrl} className="flex items-center gap-2.5">
                    <PrismicText field={item.primary.label} />
                    {hasSubMenu && (
                      <MoreIcon onMouseEnter={handleClick} isOpen={isOpen} size={12} />
                    )}
                  </Link>
                )}

                {hasSubMenu && subMenuItems.length > 0 && (
                  <ul className={`absolute left-0 top-0 pt-10 ${isOpen ? "block" : "hidden"}`}>
                    {subMenuItems.map((subItem, subIndex) => {
                      const subUrl = getLocalizedPath(subItem.sub_link?.url, currentLang)
                      const isSubActive = pathname === subUrl
                      return (
                        <li
                          key={subIndex}
                          className={`pb-2 min-w-max hover:opacity-100 ${isSubActive ? "opacity-100" : "opacity-50"}`}
                        >
                          <Link href={subUrl}>
                            <PrismicText field={subItem.sub_label} />
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>

        <div
          onClick={() => setIsOpen(false)}
          className={`
            fixed top-0 left-0 w-full h-full z-5
            bg-black transition-opacity duration-500 ease-in-out
            ${isOpen ? "opacity-50 pointer-events-auto" : "opacity-0 pointer-events-none"}
            lg:hidden
          `}
        />

        <div
          className={`
            fixed top-0 left-0 w-full h-[75svh]
            bg-black transition-all duration-500 ease-in-out
            ${isOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-[66.66svh] opacity-0 pointer-events-none"}
            lg:hidden
          `}
        >
          <div className="flex flex-col justify-around h-full p-[var(--tw-4)] md:p-[var(--tw-12)]">
            <ul className="flex flex-col gap-6 font-bold text-white uppercase">
              {slices.map((item, index) => {
                const baseUrl = item.primary.link?.url || ""
                const localizedUrl = getLocalizedPath(baseUrl, currentLang)
                const isActive = pathname === localizedUrl
                const hasSubMenu = item.variation === "withSubMenu"
                const subMenuItems = item.primary.sub_menu || []

                return (
                  <li
                    key={index}
                    style={{ transitionDelay: `${0.05 * index}s` }}
                    className={`
                      transition-all duration-500
                      ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                    `}
                  >
                    {!hasSubMenu && (
                      <Link href={localizedUrl} className={`transition-colors duration-300 ${isActive ? "opacity-100" : "opacity-50"}`}>
                        <PrismicText field={item.primary.label} />
                      </Link>
                    )}
                    {hasSubMenu && subMenuItems.length > 0 && (
                      <ul className="flex flex-col gap-2 mt-2">
                        {subMenuItems.map((subItem, subIndex) => {
                          const subUrl = getLocalizedPath(subItem.sub_link?.url, currentLang)
                          const isSubActive = pathname === subUrl
                          return (
                            <li
                              key={subIndex}
                              className={`min-w-max transition-opacity duration-300 ${isSubActive ? "opacity-100" : "opacity-50"}`}
                            >
                              <Link href={subUrl}>
                                <PrismicText field={subItem.sub_label} />
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="lg:hidden flex justify-end cursor-pointer">
          <MoreIcon onClick={handleClick} size={30} strokeWidth={2} isOpen={isOpen} />
        </div>
      </nav>
    </header>
  )
}