import React from 'react'
import { Layout } from 'antd';
import Navbar from '../Navigation/Navbar.component'

const { Header, Footer, Sider, Content } = Layout;

const MainLayout = ({children}) => {
    return (
        <Layout>
            <Header style={{backgroundColor: 'white', padding: '0'}}>
                <Navbar />
            </Header>
            <Content>
                {children}
            </Content>
        </Layout>
    )
}

export default MainLayout