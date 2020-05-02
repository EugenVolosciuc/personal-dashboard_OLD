const getUserSettingsDBRef = getState => {
    const { db } = getState().firebase.firebase
    const { authUser } = getState().authUser
    const userSettingsRef = db.collection('userSettings').doc(authUser.uid)

    return { db, authUser, userSettingsRef }
}

// GET USER SETTINGS
export const GET_USER_SETTINGS_STARTED = 'GET_USER_SETTINGS_STARTED'
export const GET_USER_SETTINGS_FAILED = 'GET_USER_SETTINGS_FAILED'
export const GET_USER_SETTINGS_SUCCESS = 'GET_USER_SETTINGS_SUCCESS'

export const getUserSettings = () => (dispatch, getState) => {
    dispatch(getUserSettingsStarted())

    const { userSettingsRef } = getUserSettingsDBRef(getState)
    return userSettingsRef.get()
        .then(queryDocumentSnapshot => {
            dispatch(getUserSettingsSuccess(queryDocumentSnapshot.data()))
            Promise.resolve()
        })
        .catch(error => {
            dispatch(getUserSettingsFailed(error))
            Promise.reject(error)
        })
}

const getUserSettingsStarted = () => ({
    type: GET_USER_SETTINGS_STARTED
})

const getUserSettingsFailed = error => ({
    type: GET_USER_SETTINGS_FAILED,
    payload: { error }
})

const getUserSettingsSuccess = userSettings => ({
    type: GET_USER_SETTINGS_SUCCESS,
    payload: userSettings
})

// UPDATE USER SETTINGS
export const UPDATE_USER_SETTINGS_STARTED = 'UPDATE_USER_SETTINGS_STARTED'
export const UPDATE_USER_SETTINGS_FAILED = 'UPDATE_USER_SETTINGS_FAILED'
export const UPDATE_USER_SETTINGS_SUCCESS = 'UPDATE_USER_SETTINGS_SUCCESS'

export const UPDATE_TYPES = {
    SETTINGS_WIDGET_POSITIONS: 'SETTINGS_WIDGET_POSITIONS'
}

export const updateUserSettings = (updateType, payload) => (dispatch, getState) => {
    dispatch(updateUserSettingsStarted())

    const { userSettingsRef } = getUserSettingsDBRef(getState)

    switch (updateType) {
        case UPDATE_TYPES.SETTINGS_WIDGET_POSITIONS:
            userSettingsRef
                .set({
                    widgetPositions: {
                        [payload.widgetTitle]: { ...payload }
                    }
                }, { merge: true })
                .then(() => {
                    dispatch(updateUserSettingsSuccess(updateType, payload))
                    Promise.resolve()
                })
                .catch(error => {
                    dispatch(updateUserSettingsFailed(error))
                    Promise.reject()
                })
        default:
            dispatch(updateUserSettingsFailed({ message: 'No update type provided' }))
            Promise.reject()
    }
}

const updateUserSettingsStarted = () => ({
    type: UPDATE_USER_SETTINGS_STARTED
})

const updateUserSettingsFailed = error => ({
    type: UPDATE_USER_SETTINGS_FAILED,
    payload: { error }
})

const updateUserSettingsSuccess = (updateType, payload) => {
    return {
        type: UPDATE_USER_SETTINGS_SUCCESS,
        payload,
        updateType
    }
}