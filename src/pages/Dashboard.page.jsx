import React from 'react'
import { Row, Col } from 'antd'

import MainLayout from '../components/Layouts/MainLayout.component'
import ExpensesCard from '../components/Widgets/Expenses/ExpensesCard.component'
import NotesCard from '../components/Widgets/Notes/NotesCard.component'
import TodosCard from '../components/Widgets/Todos/TodosCard.component'
import withAuthentication from '../components/Auth/withAuthentication.component'

const Dashboard = () => {
    return (
        <MainLayout>
            <Row justify='center'>
                <Col span={8}>
                    <ExpensesCard />
                </Col>
                <Col span={8}>
                    <NotesCard />
                </Col>
                <Col span={8}>
                    <TodosCard />
                </Col>
            </Row>
        </MainLayout>
    )
}

export default withAuthentication(Dashboard)