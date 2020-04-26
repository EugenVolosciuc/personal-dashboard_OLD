import React, { useState, useEffect } from 'react'
import { Layout, Menu } from 'antd'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { AppstoreOutlined, EditOutlined } from '@ant-design/icons'

import Navbar from '../Navigation/Navbar.component'

const { Header, Content } = Layout;

const MainLayout = ({ authUser, children, setEditMode }) => {
    const location = useLocation()

    const getLayoutToShow = () => {
        if (authUser) {
            if (location.pathname === '/dashboard') {
                return <LoggedInMainLayout setEditMode={setEditMode}>{children}</LoggedInMainLayout>
            } else {
                return <LoggedOutMainLayout>{children}</LoggedOutMainLayout>
            }
        } else {
            return <LoggedOutMainLayout>{children}</LoggedOutMainLayout>
        }
    }

    return <>{getLayoutToShow()}</>
}

const LoggedInMainLayout = ({ children, setEditMode }) => {
    const [collapsed, setCollapsed] = useState(false)

    const { Sider } = Layout
    return (
        <Layout style={{ minHeight: '100vh' }}>
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
            <Layout
                style={{ marginLeft: collapsed ? 80 : 200 }}>
                <Header style={{ backgroundColor: 'white', padding: '0' }}>
                    <Navbar />
                </Header>
                <Content>
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}

const LoggedOutMainLayout = ({ children }) => {
    return (
        <Layout>
            <Header style={{ backgroundColor: 'white', padding: '0' }}>
                <Navbar />
            </Header>
            <Content>
                {children}
            </Content>
        </Layout>
    )
}

const mapStateToProps = state => {
    return {
        authUser: state.authUser.authUser
    }
}

export default connect(
    mapStateToProps
)(MainLayout)