import React from 'react'
import { useDrag } from 'react-dnd'

import { ITEM_TYPES } from '../../../constants/dnd-types'

const getStyles = isDragging => {
    return {
        position: 'absolute',
        display: isDragging ? 'none' : 'initial',
        width: '100%',
        height: '100%',
        paddingLeft: '50%',
        marginLeft: '-50%',
        borderRadius: '50px'
    }
}

const WidgetListItem = ({ widget }) => {
    const [{ isDragging }, drag] = useDrag({
        item: {
            type: ITEM_TYPES.WIDGET,
            title: widget.title,
            component: widget.component
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        })
    })

    return (
        <div ref={drag} style={getStyles(isDragging)}>
            {widget.title}
        </div>
    )
}

export default WidgetListItem