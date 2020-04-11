import React, { useState, useEffect, Fragment } from 'react'
import moment from 'moment'
import { Calendar } from 'antd'
import { connect } from 'react-redux'
import _ from 'lodash'

// TO DO: add caching to payment types
// import { withCache } from '../../../UtilityComponents'
import { getPayments } from '../../../../store/actions/paymentActions'
import EditPaymentModal from '../EditPaymentModal.component'

const CalendarPane = ({ expense, payments, getPayments }) => {
    const [showEditModal, setShowEditModal] = useState(null)

    useEffect(() => {
        getPayments({ expenseID: expense.uid, expenseTitle: expense.title })
    }, [])

    const monthCellRender = (value) => {
        // Render all payments in year mode
        if (payments[expense.title]) {
            return payments[expense.title].map(payment => {
                if (payment.dayPaymentMade.getFullYear() === value.toDate().getFullYear()) {
                    if (payment.dayPaymentMade.getMonth() === value.toDate().getMonth()) {
                        return (
                            <div key={payment.uid} onClick={() => toggleShowEditModal(payment.uid)}>
                                <p>Amount: {payment.amount}</p>
                                {
                                    !_.isNull(payment.notes) &&
                                    <p>Notes: {payment.notes.length > 20 ? payment.notes.substring(0, 20) + '...' : payment.notes}</p>
                                }
                            </div>
                        )
                    }
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

const mapDispatchToProps = dispatch => {
    return {
        getPayments: (payload) => dispatch(getPayments(payload)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CalendarPane)