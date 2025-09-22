"use client"
import { useEffect } from "react"
import { gsap } from "gsap"

const useSliceAnimation = (className, triggerOnce = true) => {
    useEffect(() => {
        const elements = document.querySelectorAll(className)

        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        gsap.to(entry.target, {
                            opacity: 1,
                            y: 0,
                            duration: 0.5,
                            // delay: 0.2,
                            ease: "power2.out",
                        })

                        if (triggerOnce) {
                            observer.unobserve(entry.target)
                        }
                    } else {
                        gsap.to(entry.target, {
                            opacity: 0,
                            y: 50,
                            // delay: 0.2,
                            duration: 0.5,
                            ease: "power2.in",
                        })
                    }
                })
            },
            { threshold: 0.1 }
        )

        elements.forEach((element) => observer.observe(element))

        return () => {
            elements.forEach((element) => observer.unobserve(element))
        }
    }, [className, triggerOnce])
}

export default useSliceAnimation