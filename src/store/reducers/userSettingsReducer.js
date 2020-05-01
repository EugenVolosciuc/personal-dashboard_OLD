import {
    GET_USER_SETTINGS_STARTED,
    GET_USER_SETTINGS_FAILED,
    GET_USER_SETTINGS_SUCCESS,
    UPDATE_USER_SETTINGS_STARTED,
    UPDATE_USER_SETTINGS_FAILED,
    UPDATE_USER_SETTINGS_SUCCESS,
    UPDATE_TYPES
} from '../actions/userSettingsActions'

import { widgetList } from '../../utils/widgetList'

const initialState = {
    loading: false,
    error: null,
    settings: {
        widgetPositions: widgetList.map(widget => widget.title.toLowerCase()).reduce((a, b) => (a[b] = null, a), {})
    }
}

export default function userSettingsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_SETTINGS_STARTED:
        case UPDATE_USER_SETTINGS_STARTED:
            return {
                ...state,
                loading: true,
                error: null
            }
        case GET_USER_SETTINGS_FAILED:
        case UPDATE_USER_SETTINGS_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case GET_USER_SETTINGS_SUCCESS:
            console.log("USER SETTINGS", action.payload)
            return {
                ...state,
                loading: false,
                error: null,
                settings: {
                    ...state.settings,
                    widgetPositions: !action.payload ? {} : { ...action.payload.widgetPositions }
                }

            }
        case UPDATE_USER_SETTINGS_SUCCESS:
            switch (action.updateType) {
                case UPDATE_TYPES.SETTINGS_WIDGET_POSITIONS:
                    return {
                        ...state,
                        loading: false,
                        error: null,
                        settings: {
                            ...state.settings,
                            widgetPositions: {
                                ...state.settings.widgetPositions,
                                [action.payload.widgetTitle]: {
                                    x: action.payload.coordinates.x,
                                    y: action.payload.coordinates.y,
                                    width: action.payload.measurements.width,
                                    height: action.payload.measurements.height
                                }
                            }
                        }
                    }
                default:
                    return state
            }
        default:
            return state
    }
}