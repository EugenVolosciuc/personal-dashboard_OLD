import React from 'react'
import { connect } from 'react-redux'

import Grid from '../GridSystem/Grid.component'

const WidgetDropZone = ({ dashboardEditMode }) => {
    return (
        <div className="widget-drop-zone">
            {dashboardEditMode && <Grid />}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        dashboardEditMode: state.dashboardEditMode.editMode
    }
}

export default connect(
    mapStateToProps
)(WidgetDropZone)