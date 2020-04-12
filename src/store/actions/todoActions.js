const getTodosDBRef = getState => {
    const { db } = getState().firebase.firebase
    const { authUser } = getState().authUser
    const todosRef = db.collection('userTodos').doc(authUser.uid).collection('todos')

    return { db, authUser, todosRef }
}

// GET TODOS
export const GET_TODOS_STARTED = 'GET_TODOS_STARTED'
export const GET_TODOS_FAILED = 'GET_TODOS_FAILED'
export const GET_TODOS_SUCCESS = 'GET_TODOS_SUCCESS'

export const getTodos = () => (dispatch, getState) => {
    dispatch(getTodosStarted())

    const { todosRef } = getTodosDBRef(getState)
    return todosRef.get()
        .then(querySnaphot => {
            let todosList = []
            querySnaphot.forEach(doc => {
                todosList.push({ ...doc.data(), uid: doc.id })
            })

            dispatch(getTodosSuccess(todosList))
            Promise.resolve()
        })
        .catch(error => {
            dispatch(getTodosFailed(error))
            Promise.reject(error)
        })
}

const getTodosStarted = () => ({
    type: GET_TODOS_STARTED
})

const getTodosFailed = error => ({
    type: GET_TODOS_FAILED,
    payload: { error }
})

const getTodosSuccess = todos => ({
    type: GET_TODOS_SUCCESS,
    payload: todos
})

// ADD TODO
export const ADD_TODO_STARTED = 'ADD_TODO_STARTED'
export const ADD_TODO_FAILED = 'ADD_TODO_FAILED'
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS'

export const addTodo = payload => (dispatch, getState) => {
    dispatch(addTodoStarted())

    const { todosRef } = getTodosDBRef(getState)

    return todosRef.doc(payload.uid).set({
        title: payload.title,
        done: payload.done,
        createdAt: payload.createdAt,
        updatedAt: payload.updatedAt
    })
        .then(() => {
            dispatch(addTodoSuccess(payload))
            Promise.resolve()
        })
        .catch(error => {
            dispatch(addTodoFailed(error))
            Promise.reject(error)
        })
}

const addTodoStarted = () => ({
    type: ADD_TODO_STARTED
})

const addTodoFailed = error => ({
    type: ADD_TODO_FAILED,
    payload: { error }
})

const addTodoSuccess = todo => ({
    type: ADD_TODO_SUCCESS,
    payload: {
        ...todo
    }
})

// DELETE TODO
export const DELETE_TODO_STARTED = 'DELETE_TODO_STARTED'
export const DELETE_TODO_FAILED = 'DELETE_TODO_FAILED'
export const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS'

export const deleteTodo = payload => (dispatch, getState) => {
    dispatch(deleteTodoStarted())

    const { todosRef } = getTodosDBRef(getState)

    return todosRef.doc(payload)
        .delete()
        .then(() => {
            dispatch(deleteTodoSuccess(payload))
            Promise.resolve()
        })
        .catch(error => {
            dispatch(deleteTodoFailed(error))
            Promise.reject(error)
        })
}

const deleteTodoStarted = () => ({
    type: DELETE_TODO_STARTED
})

const deleteTodoFailed = error => ({
    type: DELETE_TODO_FAILED,
    payload: { error }
})

const deleteTodoSuccess = payload => ({
    type: DELETE_TODO_SUCCESS,
    payload
})

// UPDATE TODO
export const UPDATE_TODO_STARTED = 'UPDATE_TODO_STARTED'
export const UPDATE_TODO_FAILED = 'UPDATE_TODO_FAILED'
export const UPDATE_TODO_SUCCESS = 'UPDATE_TODO_SUCCESS'

export const updateTodo = (uid, payload) => (dispatch, getState) => {
    dispatch(updateTodoStarted())

    const { todosRef } = getTodosDBRef(getState)

    return todosRef.doc(uid)
        .update({ ...payload })
        .then(() => {
            dispatch(updateTodoSuccess(uid, payload))
            return Promise.resolve()
        })
        .catch(error => {
            dispatch(updateTodoFailed(error))
            Promise.reject(error)
        })
}

const updateTodoStarted = () => ({
    type: UPDATE_TODO_STARTED
})

const updateTodoFailed = error => ({
    type: UPDATE_TODO_FAILED,
    payload: { error }
})

const updateTodoSuccess = (uid, payload) => {
    return {
        type: UPDATE_TODO_SUCCESS,
        uid,
        payload
    }
}