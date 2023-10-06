import { getFirebaseServices } from '../firebase/FirebaseService';
import { onAuthStateChanged, signOut, signInAnonymously } from 'firebase/auth';

const auth = getFirebaseServices().auth;

export async function logIn() {
    try {
        const userCredential = await signInAnonymously(auth);
        return userCredential.user;
    } catch (error) {
        console.error('Failed to log in anonymously', error);
        throw error;
    }
}

export async function logOut() {
    try {
        return await signOut(auth);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export function subscribeToAuthChanges(callback) {
    return onAuthStateChanged(auth, callback);
}
