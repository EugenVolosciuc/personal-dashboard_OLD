import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import isNil from 'lodash/isNil'

import WidgetPositioner from './WidgetPositioner.component'
import { widgetList } from '../../utils/widgetList'
import Grid from '../GridSystem/Grid.component'

const WidgetDropZone = ({ dashboardEditMode, widgetPositions }) => {
    const [positionsNotNull, setPositionsNotNull] = useState(false)

    useEffect(() => {

    }, [])

    return (
        <div className="widget-drop-zone">
            {dashboardEditMode && <Grid />}
            {
                widgetList.map(widget => {
                    if (!isNil(widgetPositions[widget.title.toLowerCase()])) {
                        console.log("THIS THING", widgetPositions[widget.title.toLowerCase()])
                        return (
                            <WidgetPositioner key={`${widget.title} widget`} position={widgetPositions[widget.title.toLowerCase()]}>
                                <widget.component />
                            </WidgetPositioner>
                        )
                    }
                })
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        dashboardEditMode: state.dashboardEditMode.editMode,
        widgetPositions: state.userSettings.settings.widgetPositions
    }
}

export default connect(
    mapStateToProps
)(WidgetDropZone)