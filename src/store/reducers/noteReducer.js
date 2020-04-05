import {
    ADD_NOTE_STARTED,
    ADD_NOTE_FAILED,
    ADD_NOTE_SUCCESS,
    GET_NOTES_STARTED,
    GET_NOTES_FAILED,
    GET_NOTES_SUCCESS,
    DELETE_NOTE_STARTED,
    DELETE_NOTE_FAILED,
    DELETE_NOTE_SUCCESS,
    UPDATE_NOTE_STARTED,
    UPDATE_NOTE_FAILED,
    UPDATE_NOTE_SUCCESS
} from '../actions/noteActions'

const initialState = {
    loading: false,
    notes: [],
    error: null
}

export default function notesReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_NOTE_STARTED:
        case GET_NOTES_STARTED:
        case DELETE_NOTE_STARTED:
        case UPDATE_NOTE_STARTED:
            return {
                ...state,
                loading: true
            }
        case ADD_NOTE_FAILED:
        case GET_NOTES_FAILED:
        case DELETE_NOTE_FAILED:
        case UPDATE_NOTE_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case ADD_NOTE_SUCCESS:
            return {
                ...state,
                loading: false,
                notes: [...state.notes, action.payload]
            }
        case GET_NOTES_SUCCESS:
            return {
                ...state,
                loading: false,
                notes: [...action.payload]
            }
        case DELETE_NOTE_SUCCESS:
            return {
                ...state,
                loading: false,
                notes: state.notes.filter(note => {
                    return note.uid !== action.payload
                })
            }
        case UPDATE_NOTE_SUCCESS:
            return {
                ...state,
                loading: false,
                notes: state.notes.map(note => {
                    if (note.uid === action.uid) {
                        return Object.assign({}, note, action.payload)
                    }
                    return note
                })
            }
        default:
            return state
    }
}