import { combineReducers } from 'redux'

import sessionReducer from './sessionReducer'
import firebaseReducer from './firebaseReducer'
import expenseReducer from './expenseReducer'
import paymentReducer from './paymentReducer'
import noteReducer from './noteReducer'
import todoReducer from './todoReducer'
import cacheFetchTimeReducer from './cacheFetchTimeReducer'
import dashboardEditModeReducer from './dashboardEditModeReducer'
import widgetPositionReducer from './widgetPositionReducer'

const rootReducer = combineReducers({
    authUser: sessionReducer,
    firebase: firebaseReducer,
    expenses: expenseReducer,
    payments: paymentReducer,
    notes: noteReducer,
    todos: todoReducer,
    cacheFetchTime: cacheFetchTimeReducer,
    dashboardEditMode: dashboardEditModeReducer,
    widgetsPosition: widgetPositionReducer
})

export default rootReducer