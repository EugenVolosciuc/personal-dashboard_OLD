import { combineReducers } from 'redux'
import sessionReducer from './sessionReducer'
import firebaseReducer from './firebaseReducer'
import expenseReducer from './expenseReducer'

const rootReducer = combineReducers({
    authUser: sessionReducer,
    firebase: firebaseReducer,
    expenses: expenseReducer
})

export default rootReducer