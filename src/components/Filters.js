"use client"
import { useState, useEffect, useRef, useMemo } from "react"
import { MoreIcon } from "./icons/MoreIcon"
import { VscClose } from "react-icons/vsc"

const Filters = ({ tagsArray, selectedTags, handleTagClick }) => {
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

  return (
    <div
      className="
        relative grid gap-6 
        lg:px-36 lg:grid-cols-[0.5fr_1.5fr] lg:items-baseline "
      ref={ref}
      onClick={() => handleClick(isOpen)}
    >
      <div className="h-max flex gap-2 items-center cursor-pointer">
        <span className="uppercase">Filters</span>
        <MoreIcon size={12} isOpen={isOpen} />
      </div>

      <div  className="grid gap-[var(--tw-6)] sitems-baseline relative">

        <div className={`${visibleSelectedTags.length === 0 && !isOpen ? "hidden" : "grid"} gap-[var(--tw-6)]`}>
          {
            visibleSelectedTags.length === 0 && !isOpen ? "" : <span className="uppercase tracking-[1px]">Expertises</span>
          }

          {
            isOpen ? (
              <ul className="flex flex-wrap gap-[var(--tw-2)] p-0 m-0 list-none">
                {visibleTagsArray.map((tag, index) => (
                  <li key={index} className="list-none">
                    <button
                      onClick={(e) => {
                        handleFilterClick(e)
                        handleTagClick(tag)
                      }}
                      className={`flex items-center gap-2 px-[var(--tw-4)] py-1 rounded-lg bg-white bg-opacity-20 cursor-pointer transition-all duration-200 ease-in-out border border-transparent ${selectedTags.includes(tag)
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
                      className={`flex items-center gap-2 px-4 py-1 rounded-lg bg-white bg-opacity-20 cursor-pointer transition-all duration-200 ease-in-out border border-transparent ${selectedTags.includes(tag)
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


        
      </div>

    </div>
  )
}

export default Filters

