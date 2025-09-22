import { useState, useEffect } from 'react'

const breakpoints = {
    isMobile: 480,
    isTablet: 780,
    isDesktop: 1080,
}

const useViewport = () => {
    const [viewport, setViewport] = useState({
        isMobile: false,
        isTablet: false,
        isDesktop: false,
    })

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth
            const newViewport = {
                isMobile: width < breakpoints.isMobile,
                isTablet: width >= breakpoints.isMobile && width < breakpoints.isTablet,
                isDesktop: width >= breakpoints.isTablet,
            }
            setViewport(newViewport)
        }

        window.addEventListener('resize', handleResize)
        handleResize()

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return viewport
}

export default useViewport