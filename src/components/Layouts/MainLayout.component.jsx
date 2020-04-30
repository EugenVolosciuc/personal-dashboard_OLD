import React, { useState } from 'react'
import { Layout } from 'antd'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'

import Navbar from '../Navigation/Navbar.component'
import Sidebar from '../Navigation/Sidebar/Sidebar.component'

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

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar 
                collapsed={collapsed} 
                setCollapsed={setCollapsed}/>
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
        <Layout className="relative">
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