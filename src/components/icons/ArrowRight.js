import React from 'react'
import { IoIosArrowRoundForward } from "react-icons/io"

import iconStyles from "../../styles/Icon.module.css"


export const ArrowRight = ({ size }) => {
    return (
        <div className={iconStyles.iconArrowContainer} style={{ width: `${size}px`, height: `${size}px` }}>
            <IoIosArrowRoundForward />
        </div>
    )
}