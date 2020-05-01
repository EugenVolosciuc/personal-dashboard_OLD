export const SET_AUTH_USER = 'SET_AUTH_USER'

export const setAuthUser = (payload) => {
    return {
        type: SET_AUTH_USER,
        payload
    }
}