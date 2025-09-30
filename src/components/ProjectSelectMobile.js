"use client"

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react"

const OPTION_HEIGHT = 48

const ProjectSelectMobile = ({
  id,
  name,
  options = [],
  placeholder = "Sélectionnez un type de projet",
  className = "",
}) => {
  const generatedId = useId()
  const selectId = id ?? generatedId
  const containerRef = useRef(null)
  const listboxRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const normalizedOptions = useMemo(() => {
    const rawOptions = Array.isArray(options) && options.length > 0
      ? options
      : [
          { value: "stop-scrollers", label: "Stop-Scrollers" },
          { value: "site-web", label: "Site Web" },
          { value: "app-mobile", label: "Application Mobile" },
          { value: "branding", label: "Branding" },
          { value: "autre", label: "Autre" },
        ]

    return rawOptions.map((option, index) => ({
      ...option,
      id: `${selectId}-option-${index}`,
    }))
  }, [options, selectId])

  const [selectedValue, setSelectedValue] = useState("")

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("touchstart", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen || !listboxRef.current) {
      return
    }

    const preferredIndex = Math.max(
      0,
      normalizedOptions.findIndex((option) => option.value === selectedValue)
    )

    const indexToFocus = preferredIndex >= 0 ? preferredIndex : 0
    setActiveIndex(indexToFocus)

    const node = listboxRef.current.children[indexToFocus]
    if (node) {
      requestAnimationFrame(() => {
        node.scrollIntoView({ block: "nearest" })
      })
    }
  }, [isOpen, normalizedOptions, selectedValue])

  const activeOption = normalizedOptions[activeIndex] ?? null
  const selectedOption = normalizedOptions.find((option) => option.value === selectedValue) ?? null

  const handleToggleList = useCallback(() => {
    setIsOpen((previous) => !previous)
  }, [])

  const handleSelectOption = useCallback((option) => {
    setSelectedValue(option.value)
    setIsOpen(false)
  }, [])

  const handleTriggerKeyDown = useCallback((event) => {
    if (["Enter", " ", "ArrowDown", "ArrowUp"].includes(event.key)) {
      event.preventDefault()
    }

    if (event.key === "Enter" || event.key === " ") {
      setIsOpen((previous) => !previous)
      return
    }

    if (event.key === "ArrowDown") {
      setIsOpen(true)
      setActiveIndex((previous) => Math.min(previous + 1, normalizedOptions.length - 1))
      return
    }

    if (event.key === "ArrowUp") {
      setIsOpen(true)
      setActiveIndex((previous) => Math.max(previous - 1, 0))
    }
  }, [normalizedOptions.length])

  const handleListKeyDown = useCallback((event) => {
    if (["ArrowDown", "ArrowUp", "Home", "End", "Enter", " ", "Escape"].includes(event.key)) {
      event.preventDefault()
    }

    if (event.key === "ArrowDown") {
      setActiveIndex((previous) => Math.min(previous + 1, normalizedOptions.length - 1))
      return
    }

    if (event.key === "ArrowUp") {
      setActiveIndex((previous) => Math.max(previous - 1, 0))
      return
    }

    if (event.key === "Home") {
      setActiveIndex(0)
      return
    }

    if (event.key === "End") {
      setActiveIndex(normalizedOptions.length - 1)
      return
    }

    if (event.key === "Enter" || event.key === " ") {
      const option = normalizedOptions[activeIndex]
      if (option) {
        handleSelectOption(option)
      }
      return
    }

    if (event.key === "Escape") {
      setIsOpen(false)
    }
  }, [activeIndex, handleSelectOption, normalizedOptions])

  useEffect(() => {
    if (!isOpen || !listboxRef.current) {
      return
    }

    const optionNode = listboxRef.current.children[activeIndex]
    if (optionNode) {
      optionNode.scrollIntoView({ block: "nearest" })
    }
  }, [activeIndex, isOpen])

  const buttonLabel = selectedOption?.label ?? placeholder

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
    >
      <button
        id={selectId}
        type="button"
        onClick={handleToggleList}
        onKeyDown={handleTriggerKeyDown}
        className="flex w-full items-center justify-between gap-3 rounded-[12px] border border-white/35 bg-[linear-gradient(180deg,rgba(69,91,255,0.28),rgba(11,16,61,0.82)),url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0MCcgaGVpZ2h0PSc0MCcgdmlld0JveD0nMCAwIDQwIDQwJz48ZmlsdGVyIGlkPSduJz48ZmVUdXJidWxlbmNlIHR5cGU9J2ZyYWN0YWxOb2lzZScgYmFzZUZyZXF1ZW5jeT0nMS4xJyBudW1PY3RhdmVzPSc0JyBzdGl0Y2hUaWxlcz0nc3RpdGNoJy8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9JzQwJyBoZWlnaHQ9JzQwJyBmaWx0ZXI9InVybCgnI24nKSIgb3BhY2l0eT0nMC4yNScvPjwvc3ZnPg==')] bg-blend-overlay bg-repeat px-5 py-3 text-left text-sm text-white/95 shadow-inner focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={`${selectId}-listbox`}
        tabIndex={0}
      >
        <span className={selectedOption ? "text-white/95" : "text-white/60"}>
          {buttonLabel}
        </span>
        <span aria-hidden className={`transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/70">
            <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      <input type="hidden" name={name} value={selectedValue} />

      {isOpen ? (
        <ul
          id={`${selectId}-listbox`}
          ref={listboxRef}
          role="listbox"
          aria-activedescendant={activeOption?.id ?? ""}
          className="absolute z-30 mt-2 w-full overflow-y-auto rounded-[14px] border border-white/25 bg-[linear-gradient(180deg,rgba(69,91,255,0.32),rgba(14,20,80,0.94)),url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc0MCcgaGVpZ2h0PSc0MCcgdmlld0JveD0nMCAwIDQwIDQwJz48ZmlsdGVyIGlkPSduJz48ZmVUdXJidWxlbmNlIHR5cGU9J2ZyYWN0YWxOb2lzZScgYmFzZUZyZXF1ZW5jeT0nMS4xJyBudW1PY3RhdmVzPSc0JyBzdGl0Y2hUaWxlcz0nc3RpdGNoJy8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9JzQwJyBoZWlnaHQ9JzQwJyBmaWx0ZXI9InVybCgnI24nKSIgb3BhY2l0eT0nMC4zNScvPjwvc3ZnPg==')] bg-blend-overlay bg-repeat backdrop-blur-md shadow-2xl focus:outline-none"
          style={{ maxHeight: OPTION_HEIGHT * 5 }}
          tabIndex={-1}
          onKeyDown={handleListKeyDown}
        >
          {normalizedOptions.map((option, index) => {
            const isActive = index === activeIndex
            const isSelected = option.value === selectedValue

            return (
              <li
                key={option.id}
                id={option.id}
                role="option"
                aria-selected={isSelected}
                className={`flex cursor-pointer items-center justify-between px-5 text-sm ${
                  isActive ? "bg-white/10" : "bg-transparent"
                } ${isSelected ? "text-white" : "text-white/90"}`}
                tabIndex={-1}
              >
                <button
                  type="button"
                  onClick={() => handleSelectOption(option)}
                  className="flex w-full items-center justify-between gap-4 py-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  onFocus={() => setActiveIndex(index)}
                >
                  <span>{option.label}</span>
                  {isSelected ? (
                    <span aria-hidden className="text-white">
                      ✓
                    </span>
                  ) : null}
                </button>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}

export default ProjectSelectMobile

