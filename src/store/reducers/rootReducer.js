import { combineReducers } from 'redux'

import firebaseReducer from './firebaseReducer'
import expenseReducer from './expenseReducer'
import paymentReducer from './paymentReducer'
import noteReducer from './noteReducer'
import todoReducer from './todoReducer'
import cacheFetchTimeReducer from './cacheFetchTimeReducer'
import dashboardEditModeReducer from './dashboardEditModeReducer'
import userSettingsReducer from './userSettingsReducer'
import sessionReducer from './sessionReducer'

const rootReducer = combineReducers({
    authUser: sessionReducer,
    userSettings: userSettingsReducer,
    firebase: firebaseReducer,
    expenses: expenseReducer,
    payments: paymentReducer,
    notes: noteReducer,
    todos: todoReducer,
    cacheFetchTime: cacheFetchTimeReducer,
    dashboardEditMode: dashboardEditModeReducer,
})

export default rootReducer