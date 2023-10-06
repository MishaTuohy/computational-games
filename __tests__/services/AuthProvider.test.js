import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { logIn, logOut, subscribeToAuthChanges } from '@/services/firebase/FirebaseAuthService';
import { AuthProvider, useAuth } from '@/services/firebase/auth/AuthProvider';

jest.mock('firebase/auth', () => ({ getAuth: jest.fn(), }));
jest.mock('@/services/firebase/FirebaseAuthService');

const TestComponent = () => {
    const { user, logIn, logOut } = useAuth();
    return (
        <div>
            <span>{user?.email || 'No user'}</span>
            <button onClick={logIn}>Log In</button>
            <button onClick={logOut}>Log Out</button>
        </div>
    );
};

describe('AuthService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('subscribes to auth changes and sets the user state', async () => {
        const fakeUser = { email: 'test@example.com' };
        const unsubscribe = jest.fn();
        subscribeToAuthChanges.mockImplementationOnce((cb) => {
            cb(fakeUser);
            return unsubscribe;
        });
      
        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );
      
        expect(screen.getByText(fakeUser.email)).toBeInTheDocument();
        expect(subscribeToAuthChanges).toHaveBeenCalledTimes(1);
        expect(subscribeToAuthChanges).toHaveBeenCalledWith(expect.any(Function));
      
        await act(async () => {
            fireEvent.click(screen.getByText('Log Out'));
        });
      
        expect(logOut).toHaveBeenCalledTimes(1);
      
        await act(async () => {
            fireEvent.click(screen.getByText('Log In'));
        });
      
        expect(logIn).toHaveBeenCalledTimes(1);
    });
});
