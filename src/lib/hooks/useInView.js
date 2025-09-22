import { useState, useEffect } from 'react'

const useInView = (ref, options = { rootMargin: "0px", threshold: 0.5 }) => {
    const [isInView, setIsInView] = useState(false)

    useEffect(() => {
        const currentRef = ref.current

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0]
                setIsInView(entry.isIntersecting)
            },
            options
        )

        if (currentRef) {
            observer.observe(currentRef)
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef)
            }
        }
    }, [ref, options])

    return isInView
}

export default useInView