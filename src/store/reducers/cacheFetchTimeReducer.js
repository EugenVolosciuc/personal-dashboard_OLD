import { SET_CACHE_FETCH_TIME } from '../actions/cacheFetchTimeActions'

const initialState = {
    lastFetchedExpenses: null,
    lastFetchedPayments: null,
    lastFetchedNotes: null
}

function cacheFetchTimeReducer(state = initialState, action) {
    switch(action.type) {
        case SET_CACHE_FETCH_TIME:
            if (!action.payload.nestedData) {
                return {
                    ...state,
                    [action.payload.updatedCache]: action.payload.lastFetched
                }
            } else {
                return {
                    ...state,
                    [action.payload.updatedCache]: {
                        ...state[action.payload.updatedCache],
                        [action.payload.nestedData]: action.payload.lastFetched
                    }
                }
            }
        default:
            return state
    }
}

export default cacheFetchTimeReducer