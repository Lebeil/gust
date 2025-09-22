// LoadingContext.js
"use client"
import React, { createContext, useContext, useState, useEffect } from 'react'
import { useProgress } from '@react-three/drei'

const LoadingContext = createContext()

export const LoadingProvider = ({ children }) => {
    const { progress } = useProgress()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (progress >= 100) {
            setLoading(false)
        } else {
            setLoading(true)
        }
    }, [progress])

    return (
        <LoadingContext.Provider value={{ loading, progress }}>
            {children}
        </LoadingContext.Provider>
    )
}

export const useLoading = () => useContext(LoadingContext)