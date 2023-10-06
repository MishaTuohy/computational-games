import { getAuth } from 'firebase/auth';
import { getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFirebaseServices } from '@/services/firebase/FirebaseService';
import { firebaseConfig } from '@/domain/config/firebase/firebase.config';

jest.mock('firebase/app', () => ({ getApps: jest.fn(() => []), initializeApp: jest.fn(), }));
jest.mock('firebase/auth', () => ({ getAuth: jest.fn(), }));
jest.mock('firebase/firestore', () => ({ getFirestore: jest.fn(), }));
jest.mock('firebase/storage', () => ({ getStorage: jest.fn(), }));

describe('Firebase Services', () => {
    it('Should initialize Firebase App with provided config', () => {
        getFirebaseServices();
        expect(initializeApp).toHaveBeenCalledWith(firebaseConfig);
    });

    it('Should return initialized Firebase services', () => {
        const expectedAuth = {};
        const expectedFirestore = {};
        const expectedStorage = {};

        getAuth.mockReturnValueOnce(expectedAuth);
        getFirestore.mockReturnValueOnce(expectedFirestore);
        getStorage.mockReturnValueOnce(expectedStorage);

        const { auth, firestore, storage } = getFirebaseServices();

        expect(auth).toBe(expectedAuth);
        expect(firestore).toBe(expectedFirestore);
        expect(storage).toBe(expectedStorage);
    });

    it('Should return isConfigured as true when Firebase is initialized', () => {
        getApps.mockReturnValueOnce([{}]);

        const { isConfigured } = getFirebaseServices();

        expect(isConfigured).toBe(true);
    });

    it('Should return isConfigured as false when Firebase is not initialized', () => {
        getApps.mockReturnValueOnce([]);

        const { isConfigured } = getFirebaseServices();

        expect(isConfigured).toBe(false);
    });
});
