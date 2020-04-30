import { TOGGLE_DASHBOARD_EDIT_MODE } from '../actions/dashboardEditModeActions'

const initialState = {
    editMode: false
}

function dashboardEditModeReducer(state = initialState, action) {
    switch(action.type) {
        case TOGGLE_DASHBOARD_EDIT_MODE:
            return {
                ...state,
                editMode: !state.editMode
            }
        default:
            return state
    }
}

export default dashboardEditModeReducer