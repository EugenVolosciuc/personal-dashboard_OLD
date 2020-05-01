import get from 'lodash/get'

import { SET_AUTH_USER } from '../actions/sessionActions'

const initialState = {
    authUser: JSON.parse(localStorage.getItem('authUser'))
}

export default function sessionReducer(state = initialState, action) {
    switch (action.type) {
        case SET_AUTH_USER:
            if (get(action, 'payload.authUser', null)) {
                return {
                    ...state,
                    authUser: action.payload.authUser
                }
            } else {
                return {
                    ...state,
                    authUser: null
                }
            }
        default:
            return state
    }
}