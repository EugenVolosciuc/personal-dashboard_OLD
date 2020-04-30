import React from 'react'

import MainLayout from '../components/Layouts/MainLayout.component'
import withAuthentication from '../components/Auth/withAuthentication.component'
import WidgetDropZone from '../components/Widgets/WidgetDropZone.component'

const Dashboard = () => {
    return (
        <MainLayout>
            <WidgetDropZone />
        </MainLayout>
    )
}

export default withAuthentication(Dashboard)