import { combineReducers } from 'redux'

import sessionReducer from './sessionReducer'
import firebaseReducer from './firebaseReducer'
import cacheFetchTimeReducer from './cacheFetchTimeReducer'
import expenseReducer from './expenseReducer'
import paymentReducer from './paymentReducer'
import noteReducer from './noteReducer'
import todoReducer from './todoReducer'
import dashboardEditModeReducer from './dashboardEditModeReducer'

const rootReducer = combineReducers({
    authUser: sessionReducer,
    firebase: firebaseReducer,
    cacheFetchTime: cacheFetchTimeReducer,
    expenses: expenseReducer,
    payments: paymentReducer,
    notes: noteReducer,
    todos: todoReducer,
    dashboardEditMode: dashboardEditModeReducer
})

export default rootReducer