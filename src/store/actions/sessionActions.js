export const SET_AUTH_USER = 'SET_AUTH_USER'

function setAuthUser(payload) {
    return {
        type: SET_AUTH_USER,
        payload
    }
}

export { setAuthUser }