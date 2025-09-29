"use client"

import { useMemo, useState, useEffect } from "react"
import HoverVideoCard from "@/components/HoverVideoCard"
import Filters from "@/components/Filters"
import { MoreIcon } from "@/components/icons/MoreIcon"

export default function WorkFsGrid({ items = [], activeTag = null }) {
  const [selectedTags, setSelectedTags] = useState([])
  const [selectedSecteurs, setSelectedSecteurs] = useState([])

  const tagsArray = useMemo(() => {
    return Array.from(new Set(items.flatMap((i) => i.tags || []))).filter(
      (t) => (t?.toLowerCase?.() || "") !== 'sport'
    )
  }, [items])

  const secteursArray = []

  const handleTagClick = (tag) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const handleSecteurClick = () => {}

  const filteredItems = useMemo(() => {
    const selected = (selectedTags || []).filter((t) => (t?.toLowerCase?.() || "") !== 'sport')
    return items.filter((item) => {
      const matchTags = selected.length === 0 || (item.tags || []).some((t) => selected.includes(t))
      return matchTags
    })
  }, [items, selectedTags])

  useEffect(() => {
    if (!activeTag) {
      setSelectedTags([])
      return
    }
    setSelectedTags([activeTag])
  }, [activeTag])

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
            pb-4 hidden
            lg:pb-12 lg:block
          `}
        >
          <Filters
            tagsArray={tagsArray}
            selectedTags={selectedTags}
            handleTagClick={handleTagClick}
          />
        </div>

        <div
          className={`
            grid gap-[var(--tw-4)]
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
                className="block rounded-[14px] overflow-hidden aspect-[9/16] bg-white/5 hover:bg-white/10 transition-colors"
              />

              {(item.tags?.length || 0) > 0 && (
                <div
                  className={`
                    w-full p-[var(--tw-3)] absolute bottom-0 left-0
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


