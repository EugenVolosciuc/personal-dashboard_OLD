import React from 'react'

const WidgetPositioner = ({children, position}) => {
    const positionStyle = {
        left: `${Math.round(position.x)}px`,
        top: `${Math.round(position.y)}px`,
        width: `${Math.round(position.width)}px`,
        height: `${Math.round(position.height)}px`
    }

    console.log("position", positionStyle)
    console.log("position.x", position.x)

    return (
        <div className="widget-positioner" style={positionStyle}>
            {children}
        </div>
    )
}

export default WidgetPositioner