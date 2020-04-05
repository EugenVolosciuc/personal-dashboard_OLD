import { INITIALIZE_FIREBASE } from '../actions/firebaseActions'

const initialState = {
    firebase: null
}

function firebaseReducer(state = initialState, action) {
    switch (action.type) {
        case INITIALIZE_FIREBASE:
            return {
                ...state,
                firebase: action.payload.firebase
            }
        default:
            return state
    }
}

export default firebaseReducer