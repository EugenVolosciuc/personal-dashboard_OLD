export const SET_CACHE_FETCH_TIME = 'SET_CACHE_FETCH_TIME'

function setCacheFetchTime(payload) {
    return {
        type: SET_CACHE_FETCH_TIME,
        payload
    }
}

export { setCacheFetchTime }