import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
}

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig)

        this.auth = app.auth()
        this.db = app.firestore()
    }

    // Auth API
    doCreateUserWithEmailAndPassword = (email, password, username) =>
        this.auth.createUserWithEmailAndPassword(email, password)
            .then(credential => {
                this.db.collection('users').doc(credential.user.uid).set({ username })
            })
            .catch(error => error)

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password)

    doPasswordUpdate = password => {
        this.auth.currentUser.updatePassword(password)
    }

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email)

    doSignOut = () => this.auth.signOut()

    emailAuthProvider = (email, password) => {
        return app.auth.EmailAuthProvider.credential(email, password)
    }
}

export default Firebase