import Firebase from '../../components/Firebase'
export const INITIALIZE_FIREBASE = 'INITIALIZE_FIREBASE'

function initializeFirebase() {
    return {
        type: INITIALIZE_FIREBASE,
        payload: {
            firebase: new Firebase()
        }
    }
}

export { initializeFirebase }