import { getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from '@/domain/config/firebase/firebase.config';

function initializeServices() {
    const isConfigured = getApps().length > 0;
    const firebaseApp = initializeApp(firebaseConfig);
    const auth = getAuth(firebaseApp);
    const firestore = getFirestore(firebaseApp);
    const storage = getStorage(firebaseApp);
    return { isConfigured, auth, firebaseApp, firestore, storage };
}

export function getFirebaseServices() {
    return initializeServices();
}
