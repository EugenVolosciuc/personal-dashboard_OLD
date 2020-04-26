import React, { Fragment } from 'react'
import { Menu } from 'antd'
import { useDrag } from 'react-dnd'

import TodosCard from '../../Widgets/Todos/TodosCard.component'
import NotesCard from '../../Widgets/Notes/NotesCard.component'
import ExpensesCard from '../../Widgets/Expenses/ExpensesCard.component'

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

const WidgetList = () => {
    return (
        <Fragment>
            {
                widgetList.map((widget, index) => {
                    return (
                        <Fragment key={`.${index}`}>
                            <Menu.Item>
                                {widget.title}
                            </Menu.Item>
                        </Fragment>
                    )
                })
            }
        </Fragment>
    )
}

export default WidgetList