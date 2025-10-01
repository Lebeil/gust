"use client"

import { useState, useCallback, useMemo } from "react"
import WorkFsGrid from "@/components/WorkFsGrid"
import MobileServiceRows from "@/components/MobileServiceRows"
import caseStudies from "@/data/caseStudies"
import ExpertisesList from "@/components/ExpertisesList"
import Filters from "@/components/Filters"

export default function WorkClient({ items = [] }) {
  const [activeTag, setActiveTag] = useState(null)
  const [selectedTags, setSelectedTags] = useState([])
  const [selectedSectors, setSelectedSectors] = useState([])

  const mapToTag = useCallback((label) => {
    const key = (label || "").toLowerCase()
    if (key.includes("influence")) return "Influence"
    if (key.includes("célébrit") || key.includes("celebrite")) return "Célébrité"
    if (key.includes("production")) return "Production"
    if (key.includes("social")) return "Social média"
    if (key.includes("ugc")) return "Ugc"
    return null
  }, [])

  const onClickWord = (label) => {
    const tag = mapToTag(label)
    setActiveTag((prev) => (prev === tag ? null : tag))
  }

  const itemsToUse = useMemo(() => {
    // Si le parent fournit déjà des items (via lecture du dossier), on les garde.
    // Sinon, fallback vers la liste centralisée (identique à la section "Nos case studies").
    return (items && items.length > 0) ? items : caseStudies
  }, [items])

  const tagsArray = useMemo(() => {
    return Array.from(new Set(itemsToUse.flatMap((i) => i.tags || []))).filter(
      (t) => (t?.toLowerCase?.() || "") !== 'sport'
    )
  }, [itemsToUse])

  const sectorsArray = useMemo(() => {
    return Array.from(new Set(itemsToUse.flatMap((i) => i.sectors || [])))
  }, [itemsToUse])

  const handleTagClick = useCallback((tag) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
    setActiveTag((prev) => (prev === tag ? null : tag))
  }, [])

  const handleSectorClick = useCallback((sector) => {
    setSelectedSectors((prev) => (prev.includes(sector) ? prev.filter((s) => s !== sector) : [...prev, sector]))
  }, [])

  const Word = ({ children }) => (
    <button
      type="button"
      onClick={() => onClickWord(children)}
      className="font-semibold underline decoration-transparent hover:decoration-white/80 transition-[text-decoration-color] duration-200 cursor-pointer focus:outline-none focus-visible:underline"
    >
      {children}
    </button>
  )

  return (
    <div className="text-white">
      <div className="max-w-7xl mx-auto w-full">
        <div className="px-[var(--tw-4)] pt-16 md:pt-24 pb-6 lg:px-[var(--tw-12)] text-white/90 text-sm">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="text-left text-base md:text-lg leading-relaxed text-pretty">
              Nous produisons de <Word>l&apos;influence</Word>, <Word>Célébrité</Word>, <Word>Production</Word>, <Word>Social Media</Word>, de <Word>l&apos;UGC</Word>.
            </div>
            <div className="lg:block hidden">
              <Filters
                tagsArray={tagsArray}
                sectorsArray={sectorsArray}
                selectedTags={selectedTags}
                selectedSectors={selectedSectors}
                handleTagClick={handleTagClick}
                handleSectorClick={handleSectorClick}
              />
            </div>
          </div>
          <div className="mt-4 lg:hidden">
            <Filters
              tagsArray={tagsArray}
              sectorsArray={sectorsArray}
              selectedTags={selectedTags}
              selectedSectors={selectedSectors}
              handleTagClick={handleTagClick}
              handleSectorClick={handleSectorClick}
            />
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto w-full pb-0">
        <div className="hidden md:block">
          <WorkFsGrid items={itemsToUse} activeTag={activeTag} selectedTags={selectedTags} selectedSectors={selectedSectors} />
        </div>
        <MobileServiceRows items={itemsToUse} />
      </div>

      {/* Section Nos expertises (fidèle à la maquette fournie) */}
      <ExpertisesList />
    </div>
  )
}


