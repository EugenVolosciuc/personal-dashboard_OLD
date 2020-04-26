import React, { useState } from 'react'
import { Layout } from 'antd'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'

import Navbar from '../Navigation/Navbar.component'
import Sidebar from '../Navigation/Sidebar/Sidebar.component'

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

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar 
                collapsed={collapsed} 
                setCollapsed={setCollapsed}
                setEditMode={setEditMode} />
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