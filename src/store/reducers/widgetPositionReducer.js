import { SET_WIDGET_POSITION } from '../actions/widgetPositionActions'

const initialState = {
    todos: null,
    expenses: null,
    notes: null,
}

function widgetPositionReducer(state = initialState, action) {
    switch(action.type) {
        case SET_WIDGET_POSITION:
            return {
                ...state,
                [action.payload.widgetTitle]: {
                    x: action.payload.coordinates.x,
                    y: action.payload.coordinates.y,
                    width: action.payload.measurements.width,
                    height: action.payload.measurements.height
                }
            }
        default:
            return state
    }
}

export default widgetPositionReducer