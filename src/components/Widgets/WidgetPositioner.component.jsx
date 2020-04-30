import React from 'react'

const WidgetPositioner = ({children, position}) => {
    const positionStyle = {
        left: Math.round(position.x),
        top: Math.round(position.y),
        width: Math.round(position.width),
        height: Math.round(position.height)
    }

    return (
        <div className="widget-positioner" style={positionStyle}>
            {children}
        </div>
    )
}

export default WidgetPositioner