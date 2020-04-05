import React from 'react'
import MainLayout from '../components/Layouts/MainLayout.component'
import ExpensesCard from '../components/Widgets/Expenses/ExpensesCard.component'
import withAuthentication from '../components/Auth/withAuthentication.component'

const Dashboard = () => {
    return (
        <MainLayout>
            <ExpensesCard />
        </MainLayout>
    )
}

export default withAuthentication(Dashboard)