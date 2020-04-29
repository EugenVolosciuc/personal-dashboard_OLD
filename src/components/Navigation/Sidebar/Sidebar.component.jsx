import React from 'react'
import { Layout, Menu } from 'antd'
// import { EditOutlined } from '@ant-design/icons'

import WidgetList from './WidgetList.component'

const Sidebar = ({ collapsed, setCollapsed, ...otherProps }) => {
    const { Sider } = Layout

    return (
        <Sider
            style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
            }}
            collapsible
            collapsed={collapsed}
            onCollapse={() => setCollapsed(!collapsed)}>
            <div className="logo">{collapsed ? "D" : "Dashboard"}</div>
            <Menu theme="dark" mode="inline">
                <WidgetList />
                {/* <Menu.Item onClick={() => otherProps.toggleDashboardEditMode()}>
                    <EditOutlined />
                    <span>Edit Mode</span>
                </Menu.Item> */}
            </Menu>
        </Sider>
    )
}

export default Sidebar