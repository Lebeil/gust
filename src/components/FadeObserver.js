"use client"
import { useEffect } from "react"

export default function FadeObserver() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      const sections = Array.from(document.querySelectorAll("main section"))
      if (!sections.length) return
  
      sections.forEach((section) => section.classList.add("fade-in"))
  
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible")
              io.unobserve(entry.target)
            }
          })
        },
        { threshold: 0 }
      )
  
      sections.forEach((section) => io.observe(section))
  
      return () => io.disconnect()
    }, 0)
  
    return () => clearTimeout(timeout)
  }, [])
  
  return null
}