import React from 'react'

const iconItems = [1, 2, 3, 4]

export const OverlapIcon = () => {
    return (
        <div className='overlap icon-container'>
            {iconItems.map((_, index) => (
                <div
                    key={index}
                    className='icon-item'
                    style={{
                        animationDelay: `${index * 2}s`
                    }}
                ></div>
            ))}
        </div>
    )
}