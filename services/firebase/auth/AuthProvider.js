import { createContext, useContext, useEffect, useState } from 'react';
import { logIn, logOut, subscribeToAuthChanges } from '../FirebaseAuthService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState({});

    useEffect(() => {
        const unsubscribe = subscribeToAuthChanges((currentUser) => {
            setUser(currentUser);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ user, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
