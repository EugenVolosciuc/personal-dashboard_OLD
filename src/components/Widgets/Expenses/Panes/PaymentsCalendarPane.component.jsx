import React, { useState, Fragment } from 'react'
import { Calendar } from 'antd'
import { connect } from 'react-redux'
import _ from 'lodash'

import { withCache } from '../../../UtilityComponents'
import { getPayments } from '../../../../store/actions/paymentActions'
import EditPaymentModal from '../EditPaymentModal.component'

const PaymentsCalendarPane = ({ expense, payments }) => {
    const [showEditModal, setShowEditModal] = useState(null)

    const monthCellRender = (value) => {
        // Render all payments in year mode
        if (payments[expense.title]) {
            return payments[expense.title].map(payment => {
                if (payment.dayPaymentMade.getFullYear() === value.toDate().getFullYear() && payment.dayPaymentMade.getMonth() === value.toDate().getMonth()) {
                    return (
                        <div key={payment.uid} onClick={() => toggleShowEditModal(payment.uid)}>
                            <p>Amount: {payment.amount}</p>
                            {
                                !_.isNull(payment.notes) &&
                                <p>Notes: {payment.notes.length > 30 ? payment.notes.substring(0, 30) + '...' : payment.notes}</p>
                            }
                        </div>
                    )
                } else {
                    return null
                }
            })
        }
        return null
    }

    const toggleShowEditModal = (uid) => {
        if (!uid) {
            setShowEditModal(null)
        } else {
            setShowEditModal(uid)
        }
    }

    return (
        <Fragment>
            {showEditModal &&
                <EditPaymentModal
                    expense={expense}
                    payment={payments[expense.title].find(payment => payment.uid === showEditModal)}
                    visible={!_.isNull(showEditModal)}
                    handleCancel={() => toggleShowEditModal()} />}
            <Calendar
                mode="year"
                monthCellRender={monthCellRender} />
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        payments: state.payments.payments
    }
}

export default connect(
    mapStateToProps,
)(withCache(
    getPayments, 5, 'payments', ['expense', { expenseID: 'uid', expenseTitle: 'title' }], true
)(PaymentsCalendarPane))