import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { getGame } from '@/services/games/GameService';
import { useAuth } from '@/services/firebase/auth/AuthProvider';
import { useRouter } from 'next/router';
import JoinGameButton from '@/components/buttons/JoinGameButton';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));
  
jest.mock('@/services/firebase/auth/AuthProvider', () => ({
    useAuth: jest.fn(),
}));
  
jest.mock('@/services/games/GameService', () => ({
    getGame: jest.fn(),
}));

describe('JoinGameButton', () => {
    let logInMock, useRouterMock, getGameMock;
  
    beforeEach(() => {
        useRouterMock = jest.fn();
        logInMock = jest.fn().mockResolvedValue({});
        getGameMock = jest.fn().mockResolvedValue(true);
        useRouter.mockReturnValue({ push: useRouterMock });
        useAuth.mockReturnValue({ logIn: logInMock });
        getGame.mockReturnValue(getGameMock);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('renders a button', () => {
        render(<JoinGameButton game="testGame" />);
        const button = screen.getByTestId('join-game-button');
        expect(button).toBeInTheDocument();
        expect(button.textContent).toBe('JoinGame');
    });

    it('calls getGame, logIn, and useRouter with the correct values when the button is clicked', async () => {
        render(<JoinGameButton game="testGame" />);
        const button = screen.getByTestId('join-game-button');
    
        // Enter a game code and click the button
        window.prompt = jest.fn().mockReturnValueOnce('testGameCode');
        fireEvent.click(button);
    
        // Check that the correct functions were called with the correct arguments
        expect(getGame).toHaveBeenCalledWith('testGameCode');

        await waitFor(() => {
            expect(logInMock).toHaveBeenCalled();
        });
        expect(useRouterMock).toHaveBeenCalledWith({ 
            pathname: '/testGame/testGameCode' 
        });
    });

    it('displays an error message if the game code is invalid', async () => {
        render(<JoinGameButton game="testGame" />);
        const button = screen.getByRole('button');
    
        // Enter an invalid game code and click the button
        window.prompt = jest.fn().mockReturnValueOnce('invalidGameCode');
        fireEvent.click(button);

        await waitFor(() => {
            expect(getGame).toHaveBeenCalledWith('invalidGameCode');
            expect(logInMock).not.toHaveBeenCalled();
            expect(useRouterMock).not.toHaveBeenCalled();
        });
    });

    it('does not call logIn or useRouter if the game code prompt is cancelled', () => {
        render(<JoinGameButton game="testGame" />);
        const button = screen.getByRole('button');
    
        // Cancel the prompt and click the button
        window.prompt = jest.fn().mockReturnValueOnce(null);
        fireEvent.click(button);
    
        // Check that no functions were called
        expect(getGame).not.toHaveBeenCalled();
        expect(logInMock).not.toHaveBeenCalled();
        expect(useRouterMock).not.toHaveBeenCalled();
    });
});
