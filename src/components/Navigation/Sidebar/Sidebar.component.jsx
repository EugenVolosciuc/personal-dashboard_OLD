import React from 'react'
import { Layout, Menu } from 'antd'
import { AppstoreOutlined, EditOutlined } from '@ant-design/icons'

import TodosCard from '../../Widgets/Todos/TodosCard.component'
import NotesCard from '../../Widgets/Notes/NotesCard.component'
import ExpensesCard from '../../Widgets/Expenses/ExpensesCard.component'
import WidgetItem from './WidgetItem.component'

const widgetList = [
    {
        title: 'Todos',
        component: TodosCard
    },
    {
        title: 'Expenses',
        component: ExpensesCard
    },
    {
        title: 'Notes',
        component: NotesCard
    }
]

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
                    {
                        widgetList.map((widget, index) => {
                            return (
                                <Menu.Item key={`.${index}`}>
                                    <WidgetItem widget={widget}/>
                                </Menu.Item>
                            )
                        })
                    }
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