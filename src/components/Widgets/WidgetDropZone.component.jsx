import React from 'react'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'


import WidgetPositioner from './WidgetPositioner.component'
import { widgetList } from '../../utils/widgetList'
import Grid from '../GridSystem/Grid.component'

const WidgetDropZone = ({ dashboardEditMode, widgetsPosition }) => {
    return (
        <div className="widget-drop-zone">
            {dashboardEditMode && <Grid />}
            {
                widgetList.map(widget => {
                    if (!isEmpty(widgetsPosition[widget.title.toLowerCase()])) {
                        return (
                            <WidgetPositioner key={`${widget.title} widget`} position={widgetsPosition[widget.title.toLowerCase()]}>
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
    console.log(state)
    return {
        dashboardEditMode: state.dashboardEditMode.editMode,
        widgetsPosition: state.widgetsPosition
    }
}

export default connect(
    mapStateToProps
)(WidgetDropZone)