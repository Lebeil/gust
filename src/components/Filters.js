"use client"
import { useState, useEffect, useRef, useMemo } from "react"
import { MoreIcon } from "./icons/MoreIcon"
import { VscClose } from "react-icons/vsc"

const Filters = ({ tagsArray, sectorsArray, selectedTags, selectedSectors, handleTagClick, handleSectorClick }) => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])

  const handleClick = () => setIsOpen(prevState => !prevState)

  const handleFilterClick = (e) => {
    e.stopPropagation()
  }

  const visibleTagsArray = useMemo(() => (tagsArray || []).filter(tag => (tag?.toLowerCase?.() || "") !== 'sport'), [tagsArray])
  const visibleSelectedTags = useMemo(() => (selectedTags || []).filter(tag => (tag?.toLowerCase?.() || "") !== 'sport'), [selectedTags])
  const visibleSectorsArray = useMemo(() => (sectorsArray || []), [sectorsArray])
  const visibleSelectedSectors = useMemo(() => (selectedSectors || []), [selectedSectors])

  return (
    <div
      className="relative flex items-center gap-4"
      ref={ref}
      onClick={() => handleClick(isOpen)}
    >
      <div className="h-max flex gap-2 items-center cursor-pointer">
        <span className="uppercase">Filters</span>
        <MoreIcon size={12} isOpen={isOpen} />
      </div>

      <div className={`${isOpen || visibleSelectedTags.length > 0 || visibleSelectedSectors.length > 0 ? 'block' : 'hidden'} 
        fixed inset-0 w-screen h-[100dvh] z-50 px-4 pt-[8vh] pb-8 rounded-none 
        md:absolute md:top-full md:right-0 md:mt-2 md:min-w-80 md:w-auto md:h-auto md:rounded-lg md:p-4 md:pt-4 md:pb-4
        bg-black/20 backdrop-blur-md border border-white/10`} style={{
        background: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        backgroundImage: `
          radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.03) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.02) 0%, transparent 50%)
        `,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      }}>

        {/* Décalage du contenu via padding-top; suppression de l'entête mobile */}

        {/* Bouton fermer est rendu dans la section Secteurs ci-dessous (mobile) */}

        <div className={`${visibleSelectedTags.length === 0 && visibleSelectedSectors.length === 0 && !isOpen ? "hidden" : "grid"} gap-4`}>
          {/* Section Expertises */}
          {(visibleSelectedTags.length > 0 || isOpen) && (
            <div className="grid gap-2">
              <span className="uppercase tracking-[1px] text-xs text-white/60">Expertises</span>

          {
            isOpen ? (
              <ul className="flex flex-wrap gap-2 p-0 m-0 list-none">
                {visibleTagsArray.map((tag, index) => (
                  <li key={index} className="list-none">
                    <button
                      onClick={(e) => {
                        handleFilterClick(e)
                        handleTagClick(tag)
                      }}
                      className={`flex items-center gap-2 px-5 py-2 text-base rounded-lg bg-white bg-opacity-20 cursor-pointer transition-all duration-200 ease-in-out border border-transparent ${selectedTags.includes(tag)
                        ? 'border-white'
                        : 'text-white hover:border-white'
                        }`}
                    >
                      {tag} {selectedTags.includes(tag) ? <VscClose /> : null}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className={`${selectedTags.length === 0 && !isOpen ? "hidden" : "flex"} flex-wrap gap-2 max-w-96 p-0 m-0 list-none`}>
                {visibleSelectedTags.map((tag, index) => (
                  <li key={index} className="list-none">
                    <button
                      onClick={(e) => {
                        handleFilterClick(e)
                        handleTagClick(tag)
                      }}
                      className={`flex items-center gap-2 px-5 py-2 text-base rounded-lg bg-white bg-opacity-20 cursor-pointer transition-all duration-200 ease-in-out border border-transparent ${selectedTags.includes(tag)
                        ? 'border-white'
                        : 'text-white hover:border-white'
                        }`}
                    >
                      {tag}<VscClose />
                    </button>
                  </li>
                ))}
              </ul>
            )
          }
            </div>
          )}

          {/* Section Secteurs */}
          {(visibleSelectedSectors.length > 0 || isOpen) && (
            <div className="grid gap-2">
              <span className="uppercase tracking-[1px] text-xs text-white/60">Secteurs</span>
              {
                isOpen ? (
                  <ul className="flex flex-wrap gap-2 p-0 m-0 list-none">
                    {visibleSectorsArray.map((sector, index) => (
                      <li key={index} className="list-none">
                        <button
                          onClick={(e) => {
                            handleFilterClick(e)
                            handleSectorClick(sector)
                          }}
                          className={`flex items-center gap-2 px-5 py-2 text-base rounded-lg bg-white bg-opacity-20 cursor-pointer transition-all duration-200 ease-in-out border border-transparent ${selectedSectors.includes(sector)
                            ? 'border-white'
                            : 'text-white hover:border-white'
                            }`}
                        >
                          {sector} {selectedSectors.includes(sector) ? <VscClose /> : null}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className={`${selectedSectors.length === 0 && !isOpen ? "hidden" : "flex"} flex-wrap gap-2 max-w-96 p-0 m-0 list-none`}>
                    {visibleSelectedSectors.map((sector, index) => (
                      <li key={index} className="list-none">
                        <button
                          onClick={(e) => {
                            handleFilterClick(e)
                            handleSectorClick(sector)
                          }}
                          className={`flex items-center gap-2 px-5 py-2 text-base rounded-lg bg-white bg-opacity-20 cursor-pointer transition-all duration-200 ease-in-out border border-transparent ${selectedSectors.includes(sector)
                            ? 'border-white'
                            : 'text-white hover:border-white'
                            }`}
                        >
                          {sector}<VscClose />
                        </button>
                      </li>
                    ))}
                  </ul>
                )
              }

              {/* Bouton fermer à la toute fin des badges (mobile uniquement) */}
              <div className="md:hidden flex justify-center mt-6">
                <button
                  type="button"
                  aria-label="Fermer les filtres"
                  className="p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-xl border border-white/30"
                  onClick={(e) => { e.stopPropagation(); setIsOpen(false) }}
                >
                  <VscClose size={18} />
                </button>
              </div>
            </div>
          )}
        </div>


        
      </div>

    </div>
  )
}

export default Filters

