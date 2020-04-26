import React from 'react'
import { Layout, Menu } from 'antd'
import { AppstoreOutlined, EditOutlined } from '@ant-design/icons'

const Sidebar = ({ collapsed, setCollapsed, setEditMode }) => {
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
                <Menu.SubMenu
                    title={
                        <>
                            <AppstoreOutlined />
                            <span>Widgets</span>
                        </>
                    }>
                    <Menu.Item>
                        Expenses
                    </Menu.Item>
                    <Menu.Item>
                        Notes
                    </Menu.Item>
                    <Menu.Item>
                        Todos
                    </Menu.Item>
                </Menu.SubMenu>

                <Menu.Item onClick={setEditMode}>
                    <EditOutlined />
                    <span>Edit Mode</span>
                </Menu.Item>
            </Menu>
        </Sider>
    )
}

export default Sidebar