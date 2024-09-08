// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
    apiKey: 'AIzaSyCwY7pvSnle_UzdRVOIMDXDhOnU2AViS_M',
    authDomain: 'strawberry-3d639.firebaseapp.com',
    projectId: 'strawberry-3d639',
    storageBucket: 'strawberry-3d639.appspot.com',
    messagingSenderId: '314688224691',
    appId: '1:314688224691:web:52e65205aae4bc96789fc6',
    measurementId: 'G-XKGKHLWSVP'
}

const app = initializeApp(firebaseConfig)

// const firebaseApp = initializeApp(firebaseConfig);
// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider()

// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({
    prompt: 'select_account '
})
export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
