import React from 'react'
import { Menu } from 'antd'
import { AppstoreOutlined } from '@ant-design/icons'


import TodosCard from '../../Widgets/Todos/TodosCard.component'
import NotesCard from '../../Widgets/Notes/NotesCard.component'
import ExpensesCard from '../../Widgets/Expenses/ExpensesCard.component'
import WidgetListItem from './WidgetListItem.component'

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