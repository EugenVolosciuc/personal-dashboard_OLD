import React, { useState, useEffect } from 'react'
import { Layout, Menu } from 'antd'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { AppstoreOutlined, EditOutlined } from '@ant-design/icons'

import Navbar from '../Navigation/Navbar.component'

const { Header, Content } = Layout;

const MainLayout = ({ authUser, children }) => {
    const location = useLocation()
    
    const getLayoutToShow = () => {
        if (authUser) {
            if (location.pathname === '/dashboard') {
                return <LoggedInMainLayout>{children}</LoggedInMainLayout>
            } else {
                return <LoggedOutMainLayout>{children}</LoggedOutMainLayout>
            }
        } else {
            return <LoggedOutMainLayout>{children}</LoggedOutMainLayout>
        }
    }

    return <>{getLayoutToShow()}</>
}

const LoggedInMainLayout = ({ children }) => {
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
                <Menu theme="dark">
                    <Menu.Item>
                        <AppstoreOutlined />
                        <span>Widgets</span>
                    </Menu.Item>
                    <Menu.Item>
                        <EditOutlined />
                        <span>Enter Edit Mode</span>
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