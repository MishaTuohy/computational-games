import { useState, useEffect, useMemo } from 'react';
import { getFirebaseServices } from '@/services/firebase/FirebaseService';
import { doc, onSnapshot } from 'firebase/firestore';

const database = getFirebaseServices().firestore;

export default function useListenToDoc(collectionPath, documentId) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const documentRef = doc(database, collectionPath, documentId);
        const unsubscribe = onSnapshot(documentRef, (document) => {
            if (document.exists) {
                setData(document.data());
            } else {
                setData(null);
            }
        });

        return () => {
            unsubscribe();
        };
    }, [collectionPath, documentId]);

    return useMemo(() => data, [data]);
}
