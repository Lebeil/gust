import React from 'react'

const iconItems = [1, 2]

export const InfluenceIcon = () => {
    return (
        <div className='influence icon-container'>
            {iconItems.map((_, index) => (
                <div
                    key={index}
                    className='icon-item'
                    style={{ animationDelay: `${index * 0.4}s` }}
                ></div>
            ))}
        </div>
    )
}