import React from 'react'
import { useDrag } from 'react-dnd'
import { connect } from 'react-redux'

import { ITEM_TYPES } from '../../../constants/dnd-types'
import { toggleDashboardEditMode } from '../../../store/actions/dashboardEditModeActions'

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

const WidgetListItem = ({ widget, ...otherProps }) => {
    const [{ isDragging }, drag] = useDrag({
        item: {
            type: ITEM_TYPES.WIDGET,
            title: widget.title,
            component: widget.component
        },
        begin: () => {
            otherProps.toggleDashboardEditMode()
        },
        end: () => {
            otherProps.toggleDashboardEditMode()
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        })
    })

    return (
        <div ref={drag} style={getStyles(isDragging)}>
            {widget.title}
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        toggleDashboardEditMode: () => {
            dispatch(toggleDashboardEditMode())
        }
    }
}

export default connect(
    null,
    mapDispatchToProps
)(WidgetListItem)