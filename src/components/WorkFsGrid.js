"use client"

import { useMemo } from "react"
import HoverVideoCard from "@/components/HoverVideoCard"
import { MoreIcon } from "@/components/icons/MoreIcon"

export default function WorkFsGrid({ items = [], activeTag = null, selectedTags = [], selectedSectors = [] }) {

  const filteredItems = useMemo(() => {
    const selectedTagsFiltered = (selectedTags || []).filter((t) => (t?.toLowerCase?.() || "") !== 'sport')
    const selectedSectorsFiltered = (selectedSectors || [])
    
    return items.filter((item) => {
      const matchTags = selectedTagsFiltered.length === 0 || (item.tags || []).some((t) => selectedTagsFiltered.includes(t))
      const matchSectors = selectedSectorsFiltered.length === 0 || (item.sectors || []).some((s) => selectedSectorsFiltered.includes(s))
      return matchTags && matchSectors
    })
  }, [items, selectedTags, selectedSectors])


  return (
    <section className="work_overview">
      <div
        className={`
          px-[var(--tw-4)] pb-[var(--tw-24)]
          lg:px-[var(--tw-12)] lg:pb-[var(--tw-48)]
        `}
      >

        <div
          className={`
            grid grid-cols-1 justify-items-center gap-[24px]
            md:grid-cols-2
            lg:grid-cols-4 lg:gap-8
          `}
        >
          {filteredItems.map((item, idx) => (
            <div key={idx} className="relative">
              <div className="absolute top-2 right-2 z-10">
                <MoreIcon size={14} strokeWidth={1} isOpen={false} />
              </div>
              <HoverVideoCard
                href={item.href}
                title={item.title}
                posterSrc={item.posterSrc}
                className="block overflow-hidden bg-white/5 hover:bg-white/10 transition-colors rounded-[20px] md:rounded-[14px] md:w-auto md:h-auto md:aspect-[9/16]"
                style={{ width: "min(328px, calc(100vw - 48px))", height: "min(328px, calc(100vw - 48px))" }}
              />

              {(item.tags?.length || 0) > 0 && (
                <div
                  className={`
                    hidden md:block w-full p-[var(--tw-3)] absolute bottom-0 left-0
                    md:p-[var(--tw-4)]
                  `}
                >
                  <ul
                    className="
                      flex flex-wrap gap-1.5 p-0
                      md:gap-2
                    "
                  >
                    {item.tags.map((tag, tIndex) => (
                      <li
                        key={tIndex}
                        className={`text-[0.7rem] md:text-sm px-3 py-0.5 rounded-lg bg-white bg-opacity-20 backdrop-brightness-50`}
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


