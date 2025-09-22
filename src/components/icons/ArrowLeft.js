import React from 'react'
import { IoIosArrowRoundBack } from "react-icons/io"
import iconStyles from "../../styles/Icon.module.css"

export const ArrowLeft = ({ size }) => {
    return (
        <div className={iconStyles.iconArrowContainer} style={{ width: `${size}px`, height: `${size}px` }}>
            <IoIosArrowRoundBack />
        </div>
    )
}