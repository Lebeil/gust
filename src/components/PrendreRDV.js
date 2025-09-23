import React, { useEffect, useState } from "react"
import { usePathname } from 'next/navigation'
import calendlyStyles from "@/styles/Calendly.module.css"

const localeLabels = {
    "en-us": "EN",
    "fr-fr": "FR",
}

const OpenCalendly = () => {
    const openCalendlyInNewPage = () => {
        const calendlyUrl = "https://calendly.com/alexandrevelardocchio?hide_gdpr_banner=1"
        window.open(calendlyUrl, "_blank")
    }

    return (

        <button
            className={`${calendlyStyles.calendlyButton}`}
            onClick={openCalendlyInNewPage}
        >
            <div className={calendlyStyles.buttonCircles}>
                <span className={calendlyStyles.circle}></span>
                <span className={calendlyStyles.circle}></span>
            </div>
            <span className={calendlyStyles.buttonCirclesLabel}>
                Prendre rendez-vous
            </span>
        </button>
    )
}

export default function PrendreRDV() {
    const [currentTime, setCurrentTime] = useState("")
    const pathname = usePathname()

    useEffect(() => {
        const updateTime = () => {
            const now = new Date()
            const hours = String(now.getHours()).padStart(2, '0')
            const minutes = String(now.getMinutes()).padStart(2, '0')
            const seconds = String(now.getSeconds()).padStart(2, '0')
            const milliseconds = String(now.getMilliseconds()).padStart(3, '0')
            const formattedTime = `${hours} : ${minutes} : ${seconds}.${milliseconds}`
            setCurrentTime(formattedTime)
        }

        updateTime()
        const intervalId = setInterval(updateTime, 100)

        return () => clearInterval(intervalId)
    }, [])

    return (
        <section className={`relative`}>
            <div
                className={`
                    fixed bottom-0 right-0 w-auto
                    p-[var(--tw-6)]
                    md:p-[var(--tw-12)]
                    pb-2
                    md:pb-4
                    z-30
                `}
            >

                <div
                    className={`
                        w-auto
                        flex flex-col items-end gap-[var(--tw-4)]
                        lg:flex-row lg:justify-between
                    `}
                >

                    <div className="grid gap-[var(--tw-2)] w-max">
                        {/* Horloge déplacée vers la navbar */}
                    </div>

                    <OpenCalendly />
                </div>
            </div>
        </section>
    )
}