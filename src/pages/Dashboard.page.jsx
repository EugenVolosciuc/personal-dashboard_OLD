import React, { useState } from 'react'
import { Row, Col } from 'antd'

import MainLayout from '../components/Layouts/MainLayout.component'
import ExpensesCard from '../components/Widgets/Expenses/ExpensesCard.component'
import NotesCard from '../components/Widgets/Notes/NotesCard.component'
import TodosCard from '../components/Widgets/Todos/TodosCard.component'
import withAuthentication from '../components/Auth/withAuthentication.component'
import Grid from '../components/GridSystem/Grid.component'

const Dashboard = () => {
    const [editMode, setEditMode] = useState(false)

    return (
        <MainLayout setEditMode={() => setEditMode(!editMode)} >
            {
                editMode
                    ? <Grid />
                    : <Row justify='center'>
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
            }
        </MainLayout>
    )
}

export default withAuthentication(Dashboard)