import React from 'react'
import { useDrag } from 'react-dnd'

import { ITEM_TYPES } from '../../../constants/dnd-types'

const WidgetItem = ({widget}) => {
    const [{ isDragging }, drag] = useDrag({
        item: { type: ITEM_TYPES.WIDGET },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        })
    })

    return (
        <div ref={drag}>
            {widget.title}
        </div>
    )
}

export default WidgetItem