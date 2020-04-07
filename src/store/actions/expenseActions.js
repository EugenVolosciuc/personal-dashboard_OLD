const getExpensesDBRef = getState => {
    const { db } = getState().firebase.firebase
    const { authUser } = getState().authUser
    const expensesRef = db.collection('userExpenses').doc(authUser.uid).collection('expenses')

    return { db, authUser, expensesRef }
}

// GET EXPENSES
export const GET_EXPENSES_STARTED = 'GET_EXPENSES_STARTED'
export const GET_EXPENSES_FAILED = 'GET_EXPENSES_FAILED'
export const GET_EXPENSES_SUCCESS = 'GET_EXPENSES_SUCCESS'

export const getExpenses = () => (dispatch, getState) => {
    dispatch(getExpensesStarted())

    const { expensesRef } = getExpensesDBRef(getState)

    return expensesRef.get()
        .then(querySnapshot => {
            let expensesList = []
            querySnapshot.forEach(doc => {
                expensesList.push({ ...doc.data(), uid: doc.id })
            })

            dispatch(getExpensesSuccess(expensesList))
            Promise.resolve()
        })
        .catch(error => {
            dispatch(getExpensesFailed(error))
            Promise.reject(error)
        })
}

const getExpensesStarted = () => ({
    type: GET_EXPENSES_STARTED
})

const getExpensesFailed = error => ({
    type: GET_EXPENSES_FAILED,
    payload: { error }
})

const getExpensesSuccess = expenses => ({
    type: GET_EXPENSES_SUCCESS,
    payload: expenses
})


// ADD EXPENSE
export const ADD_EXPENSE_STARTED = 'ADD_EXPENSE_STARTED'
export const ADD_EXPENSE_FAILED = 'ADD_EXPENSE_FAILED'
export const ADD_EXPENSE_SUCCESS = 'ADD_EXPENSE_SUCCESS'

export const addExpense = payload => (dispatch, getState) => {
    dispatch(addExpenseStarted())

    const { expensesRef } = getExpensesDBRef(getState)

    return expensesRef.doc(payload.uid).set({
        title: payload.title,
        payDay: payload.payDay,
        amount: payload.amount
    })
        .then(() => {
            dispatch(addExpenseSuccess(payload))
            Promise.resolve()
        })
        .catch(error => {
            dispatch(addExpenseFailed(error))
            Promise.reject(error)
        })
}

const addExpenseStarted = () => ({
    type: ADD_EXPENSE_STARTED
})

const addExpenseFailed = error => ({
    type: ADD_EXPENSE_FAILED,
    payload: { error }
})

const addExpenseSuccess = expense => ({
    type: ADD_EXPENSE_SUCCESS,
    payload: {
        ...expense
    }
})

// DELETE EXPENSE
export const DELETE_EXPENSE_STARTED = 'DELETE_EXPENSE_STARTED'
export const DELETE_EXPENSE_FAILED = 'DELETE_EXPENSE_FAILED'
export const DELETE_EXPENSE_SUCCESS = 'DELETE_EXPENSE_SUCCESS'

export const deleteExpense = payload => (dispatch, getState) => {
    dispatch(deleteExpenseStarted())

    const { expensesRef } = getExpensesDBRef(getState)

    return expensesRef.doc(payload)
        .delete()
        .then(() => {
            dispatch(deleteExpenseSuccess(payload))
            Promise.resolve()
        })
        .catch(error => {
            dispatch(deleteExpenseFailed(error))
            Promise.reject(error)
        })
}

const deleteExpenseStarted = () => ({
    type: DELETE_EXPENSE_STARTED
})

const deleteExpenseFailed = error => ({
    type: DELETE_EXPENSE_FAILED,
    payload: { error }
})

const deleteExpenseSuccess = payload => ({
    type: DELETE_EXPENSE_SUCCESS,
    payload
})

// UPDATE EXPENSE
export const UPDATE_EXPENSE_STARTED = 'UPDATE_EXPENSE_STARTED'
export const UPDATE_EXPENSE_FAILED = 'UPDATE_EXPENSE_FAILED'
export const UPDATE_EXPENSE_SUCCESS = 'UPDATE_EXPENSE_SUCCESS'

export const updateExpense = (uid, payload) => (dispatch, getState) => {
    dispatch(updateExpenseStarted())

    const { expensesRef } = getExpensesDBRef(getState)

    return expensesRef.doc(uid)
        .update({ ...payload })
        .then(() => {
            dispatch(updateExpenseSuccess(uid, payload))
            Promise.resolve()
        })
        .catch(error => {
            dispatch(updateExpenseFailed(error))
            Promise.reject(error)
        })
}

const updateExpenseStarted = () => ({
    type: UPDATE_EXPENSE_STARTED
})

const updateExpenseFailed = error => ({
    type: UPDATE_EXPENSE_FAILED,
    payload: { error }
})

const updateExpenseSuccess = (uid, payload) => {
    return {
        type: UPDATE_EXPENSE_SUCCESS,
        uid,
        payload
    }
}