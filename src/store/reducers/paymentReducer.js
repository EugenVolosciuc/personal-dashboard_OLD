import {
    ADD_PAYMENT_FAILED,
    ADD_PAYMENT_SUCCESS,
    ADD_PAYMENT_STARTED,
    GET_PAYMENTS_FAILED,
    GET_PAYMENTS_SUCCESS,
    GET_PAYMENTS_STARTED,
    DELETE_PAYMENT_STARTED,
    DELETE_PAYMENT_FAILED,
    DELETE_PAYMENT_SUCCESS,
    UPDATE_PAYMENT_STARTED,
    UPDATE_PAYMENT_FAILED,
    UPDATE_PAYMENT_SUCCESS
} from '../actions/paymentActions'

const initialState = {
    loading: false,
    payments: [],
    error: null
}

export default function paymentReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_PAYMENT_STARTED:
        case GET_PAYMENTS_STARTED:
        case DELETE_PAYMENT_STARTED:
        case UPDATE_PAYMENT_STARTED:
            return {
                ...state,
                loading: true
            }
        case ADD_PAYMENT_FAILED:
        case GET_PAYMENTS_FAILED:
        case DELETE_PAYMENT_FAILED:
        case UPDATE_PAYMENT_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case ADD_PAYMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                payments: {
                    ...state.payments,
                    [action.payload.expenseTitle]: [
                        ...state.payments[action.payload.expenseTitle], action.payload.payment
                    ]
                }
            }
        case GET_PAYMENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                payments: {
                    ...state.payments,
                    [action.payload.expenseTitle]: [...action.payload.payments]
                }
            }
        case DELETE_PAYMENT_SUCCESS:
            console.log("action.payload", action.payload)
            return {
                ...state,
                loading: false,
                payments: {
                    ...state.payments,
                    [action.payload.expenseTitle]: state.payments[action.payload.expenseTitle].filter(payment => {
                        return payment.uid !== action.payload.paymentID
                    })
                }
            }
        case UPDATE_PAYMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                payments: {
                    ...state.payments,
                    [action.expenseTitle]: state.payments[action.expenseTitle].map(payment => {
                        if (payment.uid === action.paymentID) {
                            return Object.assign({}, payment, action.payload)
                        }
                        return payment
                    })
                }
            }
        default:
            return state
    }
}