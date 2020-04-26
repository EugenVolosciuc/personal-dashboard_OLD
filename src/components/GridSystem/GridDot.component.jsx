import React from 'react'
import { getWidthHeightPositionOfWidget } from '../../utils/grid'

const GridDot = () => {
    const handleClick = (event) => {
        event.persist()
        console.log(getWidthHeightPositionOfWidget(event.target))
    }

    return (
        <span onClick={handleClick} className="grid-dot"></span>
    )
}

export default GridDot