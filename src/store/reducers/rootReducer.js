import { combineReducers } from 'redux'
import sessionReducer from './sessionReducer'
import firebaseReducer from './firebaseReducer'
import expenseReducer from './expenseReducer'
import cacheFetchTimeReducer from './cacheFetchTimeReducer'

const rootReducer = combineReducers({
    authUser: sessionReducer,
    firebase: firebaseReducer,
    expenses: expenseReducer,
    cacheFetchTime: cacheFetchTimeReducer
})

export default rootReducer