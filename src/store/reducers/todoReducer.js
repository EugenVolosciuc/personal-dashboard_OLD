import {
    ADD_TODO_STARTED,
    ADD_TODO_FAILED,
    ADD_TODO_SUCCESS,
    GET_TODOS_STARTED,
    GET_TODOS_FAILED,
    GET_TODOS_SUCCESS,
    DELETE_TODO_STARTED,
    DELETE_TODO_FAILED,
    DELETE_TODO_SUCCESS,
    UPDATE_TODO_STARTED,
    UPDATE_TODO_FAILED,
    UPDATE_TODO_SUCCESS
} from '../actions/todoActions'

const initialState = {
    loading: false,
    todos: [],
    error: null
}

export default function todoReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TODO_STARTED:
        case GET_TODOS_STARTED:
        case DELETE_TODO_STARTED:
        case UPDATE_TODO_STARTED:
            return {
                ...state,
                loading: true
            }
        case ADD_TODO_FAILED:
        case GET_TODOS_FAILED:
        case DELETE_TODO_FAILED:
        case UPDATE_TODO_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }
        case ADD_TODO_SUCCESS:
            return {
                ...state,
                loading: false,
                todos: [...state.todos, action.payload]
            }
        case GET_TODOS_SUCCESS:
            return {
                ...state,
                loading: false,
                todos: [...action.payload]
            }
        case DELETE_TODO_SUCCESS:
            return {
                ...state,
                loading: false,
                todos: state.todos.filter(todo => {
                    return todo.uid !== action.payload
                })
            }
        case UPDATE_TODO_SUCCESS:
            return {
                ...state,
                loading: false,
                todos: state.todos.map(todo => {
                    if (todo.uid === action.uid) {
                        return Object.assign({}, todo, action.payload)
                    }
                    return todo
                })
            }
        default:
            return state
    }
}