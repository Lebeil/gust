"use client"

import { useState, useCallback, useMemo } from "react"
import WorkFsGrid from "@/components/WorkFsGrid"
import caseStudies from "@/data/caseStudies"
import ExpertisesList from "@/components/ExpertisesList"

export default function WorkClient({ items = [] }) {
  const [activeTag, setActiveTag] = useState(null)

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
      <div className="max-w-7xl mx-auto w-full px-6 md:px-10 pt-16 md:pt-24 pb-6 text-white/90 text-sm">
        <div className="w-full text-left text-base md:text-lg leading-relaxed whitespace-nowrap">
          Nous produisons de <Word>l’influence</Word>, <Word>Célébrité</Word>, <Word>Production</Word>, <Word>Social Media</Word>, de <Word>l’UGC</Word>.
        </div>
      </div>
      <div className="max-w-7xl mx-auto w-full px-6 md:px-10 pb-0">
        <WorkFsGrid items={itemsToUse} activeTag={activeTag} />
      </div>

      {/* Section Nos expertises (fidèle à la maquette fournie) */}
      <ExpertisesList />
    </div>
  )
}


