import React from 'react'
import iconStyles from '../../styles/Icon.module.css'

export const MoreIcon = ({ size, strokeWidth = 1, isOpen, onClick }) => {
    return (
        <div
            className={`${iconStyles.iconMoreContainer} ${isOpen ? iconStyles.expanded : ''}`}
            style={{ width: `${size}px`, height: `${size}px` }}
            onClick={onClick}
        >
            <span style={{ borderBottom: `${strokeWidth}px solid white` }}></span>
            <span style={{ borderRight: `${strokeWidth}px solid white` }}></span>
        </div>
    )
}