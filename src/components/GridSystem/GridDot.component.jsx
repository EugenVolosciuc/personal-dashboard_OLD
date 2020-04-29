import React from 'react'
import { useDrop } from 'react-dnd'

import { getWidthHeightPositionOfWidget } from '../../utils/grid'
import { ITEM_TYPES } from '../../constants/dnd-types'

const hoverDragStyling = {
    transform: 'scale(1.5)'
}

const GridDot = () => {
    const [{ hovered, canDrop }, drop] = useDrop({
        accept: ITEM_TYPES.WIDGET,
        drop: item => console.log("DROPPED!", item), // this is where I will fire the redux action to store the widget coordinates
        collect: (monitor) => ({
            hovered: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    })

    const handleClick = (event) => {
        event.persist()
        console.log(getWidthHeightPositionOfWidget(event.target))
    }

    return (
        <span 
            ref={drop} 
            style={hovered ? hoverDragStyling : null}
            onClick={handleClick} 
            className="grid-dot"
        />
    )
}

export default GridDot