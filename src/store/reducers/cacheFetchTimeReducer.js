import { SET_CACHE_FETCH_TIME } from '../actions/cacheFetchTimeActions'

const initialState = {
    lastFetchedExpenses: null,
    lastFetchedNotes: null
}

function cacheFetchTimeReducer(state = initialState, action) {
    switch(action.type) {
        case SET_CACHE_FETCH_TIME:
            return {
                ...state,
                [action.payload.updatedCache]: action.payload.lastFetched
            }
        default:
            return state
    }
}

export default cacheFetchTimeReducer