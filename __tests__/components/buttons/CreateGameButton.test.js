import { render, fireEvent, waitFor } from '@testing-library/react';
import CreateGameButton from '@/components/buttons/CreateGameButton';
import { initialiseGame } from '@/services/games/GameService';
import { useAuth } from '@/services/firebase/auth/AuthProvider';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

jest.mock('@/services/firebase/auth/AuthProvider', () => ({
    useAuth: jest.fn(),
}));

jest.mock('@/services/games/GameService', () => ({
    initialiseGame: jest.fn(),
}));

describe('CreateGameButton', () => {
    CreateGameButton;
    let logInMock, useRouterMock;

    beforeEach(() => {
        useRouterMock = jest.fn();
        logInMock = jest.fn().mockResolvedValue({});
        useRouter.mockReturnValue({ push: useRouterMock });
        useAuth.mockReturnValue({ logIn: logInMock });
        initialiseGame.mockReset();
    });

    it('renders a button', () => {
        const { getByRole } = render(<CreateGameButton game="testGame" />);
        const button = getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button.textContent).toBe('CreateGame');
    });

    it('calls initialiseGame, logIn, and useRouter with the correct values when the button is clicked', async () => {
        const mockGameId = 'abc123';
        initialiseGame.mockResolvedValue(mockGameId);

        const { getByRole } = render(<CreateGameButton game="testGame" />);
        const button = getByRole('button');
        fireEvent.click(button);

        expect(initialiseGame).toHaveBeenCalledWith('testGame');

        await waitFor(() => {
            expect(logInMock).toHaveBeenCalled();
            expect(useRouterMock).toHaveBeenCalledWith({
                pathname: `/testGame/${mockGameId}`,
            });
        });
    });
});
