import { SET_AUTH_USER } from '../actions/sessionActions'
import _ from 'lodash'

const initialState = {
    authUser: JSON.parse(localStorage.getItem('authUser'))
}

function sessionReducer(state = initialState, action) {
    switch (action.type) {
        case SET_AUTH_USER:
            if (_.get(action, 'payload.authUser', null)) {
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

export default sessionReducer