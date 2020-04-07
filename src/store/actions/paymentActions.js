const getPaymentsDBRef = (expenseID, getState) => {
    const { db } = getState().firebase.firebase
    const { authUser } = getState().authUser
    const paymentsRef = db.collection('userExpenses').doc(authUser.uid).collection('expenses').doc(expenseID).collection('payments')

    return { db, authUser, paymentsRef }
}

// GET PAYMENTS
export const GET_PAYMENTS_STARTED = 'GET_PAYMENTS_STARTED'
export const GET_PAYMENTS_FAILED = 'GET_PAYMENTS_FAILED'
export const GET_PAYMENTS_SUCCESS = 'GET_PAYMENTS_SUCCESS'

export const getPayments = payload => (dispatch, getState) => {
    dispatch(getPaymentsStarted())

    const { paymentsRef } = getPaymentsDBRef(payload.expenseID, getState)

    return paymentsRef.get()
        .then(querySnapshot => {
            let paymentsList = []
            querySnapshot.forEach(doc => {
                paymentsList.push({ ...doc.data(), uid: doc.id })
            })

            dispatch(getPaymentsSuccess(paymentsList))
            Promise.resolve()
        })
        .catch(error => {
            dispatch(getPaymentsFailed(error))
            Promise.reject(error)
        })
}

const getPaymentsStarted = () => ({
    type: GET_PAYMENTS_STARTED
})

const getPaymentsFailed = error => ({
    type: GET_PAYMENTS_FAILED,
    payload: { error }
})

const getPaymentsSuccess = expenses => ({
    type: GET_PAYMENTS_SUCCESS,
    payload: expenses
})

// ADD PAYMENT
export const ADD_PAYMENT_STARTED = 'ADD_PAYMENT_STARTED'
export const ADD_PAYMENT_FAILED = 'ADD_PAYMENT_FAILED'
export const ADD_PAYMENT_SUCCESS = 'ADD_PAYMENT_SUCCESS'

export const addPayment = payload => (dispatch, getState) => {
    dispatch(addPaymentStarted())

    const { paymentRef } = getPaymentsDBRef(payload.expenseID, getState)

    return paymentRef.doc(payload.newPayment.uid).set({
        amount: payload.newPayment.amount,
        dayPaymentMade: payload.newPayment.dayPaymentMade,
        notes: payload.newPayment.notes
    })
        .then(() => {
            dispatch(addPaymentSuccess(payload.newPayment))
            Promise.resolve()
        })
        .catch(error => {
            dispatch(addPaymentFailed(error))
            Promise.reject(error)
        })
}

const addPaymentStarted = () => ({
    type: ADD_PAYMENT_STARTED
})

const addPaymentFailed = error => ({
    type: ADD_PAYMENT_FAILED,
    payload: { error }
})

const addPaymentSuccess = payment => ({
    type: ADD_PAYMENT_SUCCESS,
    payload: {
        ...payment
    }
})

// DELETE PAYMENT
export const DELETE_PAYMENT_STARTED = 'DELETE_PAYMENT_STARTED'
export const DELETE_PAYMENT_FAILED = 'DELETE_PAYMENT_FAILED'
export const DELETE_PAYMENT_SUCCESS = 'DELETE_PAYMENT_SUCCESS'

export const deletePayment = payload => (dispatch, getState) => {
    dispatch(deletePaymentStarted())

    const { paymentRef } = getPaymentsDBRef(payload.expenseID, getState)

    return paymentRef.doc(payload.paymentID)
        .delete()
        .then(() => {
            dispatch(deletePaymentSuccess(payload.paymentID))
            Promise.resolve()
        })
        .catch(error => {
            dispatch(deletePaymentFailed(error))
            Promise.reject(error)
        })
}

const deletePaymentStarted = () => ({
    type: DELETE_PAYMENT_STARTED
})

const deletePaymentFailed = error => ({
    type: DELETE_PAYMENT_FAILED,
    payload: { error }
})

const deletePaymentSuccess = payload => ({
    type: DELETE_PAYMENT_SUCCESS,
    payload
})

// UPDATE PAYMENT
export const UPDATE_PAYMENT_STARTED = 'UPDATE_PAYMENT_STARTED'
export const UPDATE_PAYMENT_FAILED = 'UPDATE_PAYMENT_FAILED'
export const UPDATE_PAYMENT_SUCCESS = 'UPDATE_PAYMENT_SUCCESS'

export const updatePayment = (expenseID, paymentID, payload) => (dispatch, getState) => {
    dispatch(updatePaymentStarted())

    const { paymentRef } = getPaymentsDBRef(expenseID, getState)

    return paymentRef.doc(paymentID)
        .update({ ...payload })
        .then(() => {
            dispatch(updatePaymentSuccess(paymentID, payload))
            Promise.resolve()
        })
        .catch(error => {
            dispatch(updatePaymentFailed(error))
            Promise.reject(error)
        })

}

const updatePaymentStarted = () => ({
    type: UPDATE_PAYMENT_STARTED
})

const updatePaymentFailed = error => ({
    type: UPDATE_PAYMENT_FAILED,
    payload: { error }
})

const updatePaymentSuccess = (paymentID, payload) => {
    return {
        type: UPDATE_PAYMENT_SUCCESS,
        paymentID,
        payload
    }
}