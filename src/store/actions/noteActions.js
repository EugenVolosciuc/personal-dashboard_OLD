const getNotesDBRef = getState => {
    const { db } = getState().firebase.firebase
    const { authUser } = getState().authUser
    const notesRef = db.collection('userNotes').doc(authUser.uid).collection('notes')

    return { db, authUser, notesRef }
}

// GET NOTES
export const GET_NOTES_STARTED = 'GET_NOTES_STARTED'
export const GET_NOTES_FAILED = 'GET_NOTES_FAILED'
export const GET_NOTES_SUCCESS = 'GET_NOTES_SUCCESS'

export const getNotes = () => (dispatch, getState) => {
    dispatch(getNotesStarted())

    const { notesRef } = getNotesDBRef(getState)
    return notesRef.get()
        .then(querySnaphot => {
            let notesList = []
            querySnaphot.forEach(doc => {
                notesList.push({ ...doc.data(), uid: doc.id })
            })

            dispatch(getNotesSuccess(notesList))
            Promise.resolve()
        })
        .catch(error => {
            dispatch(getNotesFailed(error))
            Promise.reject(error)
        })
}

const getNotesStarted = () => ({
    type: GET_NOTES_STARTED
})

const getNotesFailed = error => ({
    type: GET_NOTES_FAILED,
    payload: { error }
})

const getNotesSuccess = notes => ({
    type: GET_NOTES_SUCCESS,
    payload: notes
})

// ADD NOTE
export const ADD_NOTE_STARTED = 'ADD_NOTE_STARTED'
export const ADD_NOTE_FAILED = 'ADD_NOTE_FAILED'
export const ADD_NOTE_SUCCESS = 'ADD_NOTE_SUCCESS'

export const addNote = payload => (dispatch, getState) => {
    dispatch(addNoteStarted())

    const { notesRef } = getNotesDBRef(getState)

    return notesRef.doc(payload.uid).set({
        title: payload.title,
        textContent: payload.textContent,
        createdAt: payload.createdAt,
        updatedAt: payload.updatedAt
    })
        .then(() => {
            dispatch(addNoteSuccess(payload))
            Promise.resolve()
        })
        .catch(error => {
            dispatch(addNoteFailed(error))
            Promise.reject(error)
        })
}

const addNoteStarted = () => ({
    type: ADD_NOTE_STARTED
})

const addNoteFailed = error => ({
    type: ADD_NOTE_FAILED,
    payload: { error }
})

const addNoteSuccess = note => ({
    type: ADD_NOTE_SUCCESS,
    payload: {
        ...note
    }
})

// DELETE NOTE
export const DELETE_NOTE_STARTED = 'DELETE_NOTE_STARTED'
export const DELETE_NOTE_FAILED = 'DELETE_NOTE_FAILED'
export const DELETE_NOTE_SUCCESS = 'DELETE_NOTE_SUCCESS'

export const deleteNote = payload => (dispatch, getState) => {
    dispatch(deleteNoteStarted())

    const { notesRef } = getNotesDBRef(getState)

    return notesRef.doc(payload)
        .delete()
        .then(() => {
            dispatch(deleteNoteSuccess(payload))
            Promise.resolve()
        })
        .catch(error => {
            dispatch(deleteNoteFailed(error))
            Promise.reject(error)
        })
}

const deleteNoteStarted = () => ({
    type: DELETE_NOTE_STARTED
})

const deleteNoteFailed = error => ({
    type: DELETE_NOTE_FAILED,
    payload: { error }
})

const deleteNoteSuccess = payload => ({
    type: DELETE_NOTE_SUCCESS,
    payload
})

// UPDATE NOTE
export const UPDATE_NOTE_STARTED = 'UPDATE_NOTE_STARTED'
export const UPDATE_NOTE_FAILED = 'UPDATE_NOTE_FAILED'
export const UPDATE_NOTE_SUCCESS = 'UPDATE_NOTE_SUCCESS'

export const updateNote = (uid, payload) => (dispatch, getState) => {
    dispatch(updateNoteStarted())

    const { notesRef } = getNotesDBRef(getState)

    return notesRef.doc(uid)
        .update({ ...payload })
        .then(() => {
            dispatch(updateNoteSuccess(uid, payload))
            return Promise.resolve()
        })
        .catch(error => {
            dispatch(updateNoteFailed(error))
            Promise.reject(error)
        })
}

const updateNoteStarted = () => ({
    type: UPDATE_NOTE_STARTED
})

const updateNoteFailed = error => ({
    type: UPDATE_NOTE_FAILED,
    payload: { error }
})

const updateNoteSuccess = (uid, payload) => {
    return {
        type: UPDATE_NOTE_SUCCESS,
        uid,
        payload
    }
}