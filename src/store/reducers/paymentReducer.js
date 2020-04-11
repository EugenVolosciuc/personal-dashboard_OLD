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
                payments: [...state.payments, action.payload]
            }
        case GET_PAYMENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                payments: [...action.payload]
            }
        case DELETE_PAYMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                payments: state.payments.filter(payment => {
                    return payment.uid !== action.payload
                })
            }
        case UPDATE_PAYMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                payments: state.payments.map(payment => {
                    if (payment.uid === action.uid) {
                        return Object.assign({}, payment, action.payload)
                    }
                    return payment
                })
            }
        default:
            return state
    }
}