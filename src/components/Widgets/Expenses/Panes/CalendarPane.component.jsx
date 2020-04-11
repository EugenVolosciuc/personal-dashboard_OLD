import React from 'react'
import { Calendar } from 'antd'
import { connect } from 'react-redux'

import { withCache } from '../../../UtilityComponents'
import { getPayments } from '../../../../store/actions/paymentActions'

let expenseProp // Done to access expenseID in export

const CalendarPane = ({ expense, payments }) => {
    expenseProp = expense

    return (
        <Calendar
            mode="year" />
    )
}

const mapStateToProps = state => {
    return {
        payments: state.payments.payments
    }
}

export default connect(
    mapStateToProps
)(withCache(() => getPayments({expenseID: expenseProp.uid}), 5, 'payments')(CalendarPane))