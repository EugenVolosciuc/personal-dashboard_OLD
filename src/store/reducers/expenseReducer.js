import {
    ADD_EXPENSE_FAILED,
    ADD_EXPENSE_SUCCESS,
    ADD_EXPENSE_STARTED,
    GET_EXPENSES_FAILED,
    GET_EXPENSES_SUCCESS,
    GET_EXPENSES_STARTED,
    DELETE_EXPENSE_STARTED,
    DELETE_EXPENSE_FAILED,
    DELETE_EXPENSE_SUCCESS,
    UPDATE_EXPENSE_STARTED,
    UPDATE_EXPENSE_FAILED,
    UPDATE_EXPENSE_SUCCESS
} from '../actions/expenseActions'

const initialState = {
    loading: false,
    expenses: [],
    error: null
}

export default function expenseReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_EXPENSE_STARTED:
        case GET_EXPENSES_STARTED:
        case DELETE_EXPENSE_STARTED:
        case UPDATE_EXPENSE_STARTED:
            return {
                ...state,
                loading: true
            }
        case ADD_EXPENSE_FAILED:
        case GET_EXPENSES_FAILED:
        case DELETE_EXPENSE_FAILED:
        case UPDATE_EXPENSE_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case ADD_EXPENSE_SUCCESS:
            return {
                ...state,
                loading: false,
                expenses: [...state.expenses, action.payload]
            }
        case GET_EXPENSES_SUCCESS:
            return {
                ...state,
                loading: false,
                expenses: [...action.payload]
            }
        case DELETE_EXPENSE_SUCCESS:
            return {
                ...state,
                loading: false,
                expenses: state.expenses.filter(expense => {
                    return expense.uid !== action.payload
                })
            }
        case UPDATE_EXPENSE_SUCCESS:
            return {
                ...state,
                loading: false,
                expenses: state.expenses.map(expense => {
                    if (expense.uid === action.uid) {
                        return Object.assign({}, expense, action.payload)
                    }
                    return expense
                })
            }
        default:
            return state
    }
}