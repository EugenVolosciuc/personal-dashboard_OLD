import React from 'react'
import { Menu } from 'antd'
import { AppstoreOutlined } from '@ant-design/icons'

import WidgetListItem from './WidgetListItem.component'
import { widgetList } from '../../../utils/widgetList'

const WidgetList = (props) => {
    return (
        <Menu.SubMenu
            {...props}
            title={
                <>
                    <AppstoreOutlined />
                    <span>Widgets</span>
                </>
            }>
            {
                widgetList.map((widget, index) => {
                    return (
                        <Menu.Item key={`.${index}`} >
                            <WidgetListItem widget={widget} />
                        </Menu.Item>
                    )
                })
            }
        </Menu.SubMenu>
    )
}

export default WidgetList