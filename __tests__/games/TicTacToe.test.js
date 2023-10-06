import { render, screen, fireEvent } from '@testing-library/react';
import { TicTacToe } from '@/games/ticTacToe/TicTacToe';
import { useAuth } from '@/services/firebase/auth/AuthProvider';
import { useBehaviour } from '@/games/ticTacToe/hooks/useBehaviour';

jest.mock('@/services/firebase/auth/AuthProvider', () => ({
    useAuth: jest.fn(),
}));

jest.mock('@/hooks/games/tictactoe/useBehaviour', () => ({
    useBehaviour: jest.fn(),
}));

describe('TicTacToe', () => {
    const gameID = 'test-game-id';
    const user = {
        uid: 'test-user-id',
    };

    beforeEach(() => {
        useAuth.mockReturnValue({
            user,
            logOut: jest.fn(),
        });
    
        useBehaviour.mockReturnValue({
            gameSession: true,
            gameState: {
                board: Array(9).fill(0),
                winner: null,
                draw: false,
            },
            wins: 0,
            mark: jest.fn(),
            restart: jest.fn(),
            exitGame: jest.fn(),
        });
    });

    it('renders the game board', () => {
        render(<TicTacToe gameID={gameID} />);
        const gameBoard = screen.getByTestId('game-board');
        expect(gameBoard).toBeInTheDocument();
    });

    it('marks a square', () => {
        const markMock = jest.fn();
        useBehaviour.mockReturnValue({
            ...useBehaviour(),
            mark: markMock,
        });
  
        render(<TicTacToe gameID={gameID} />);
        const square = screen.getAllByTestId('square')[0];
        fireEvent.click(square);
        expect(markMock).toHaveBeenCalledWith(1);
    });

    it('displays the winner message when there is a winner', () => {
        useBehaviour.mockReturnValue({
            ...useBehaviour(),
            gameState: {
                ...useBehaviour().gameState,
                winner: user.uid,
            },
        });
  
        render(<TicTacToe gameID={gameID} />);
        const winnerMessage = screen.getByText('You won!');
        expect(winnerMessage).toBeInTheDocument();
    });

    it('displays the draw message when there\'s a draw', () => {
        useBehaviour.mockReturnValue({
            ...useBehaviour(),
            gameState: {
                ...useBehaviour().gameState,
                draw: true,
            },
        });
  
        render(<TicTacToe gameID={gameID} />);
        const drawMessage = screen.getByText('Its a draw!');
        expect(drawMessage).toBeInTheDocument();
    });

    it('displays the restart button when there is a winner or a draw', () => {
        useBehaviour.mockReturnValue({
            ...useBehaviour(),
            gameState: {
                ...useBehaviour().gameState,
                winner: user.uid,
            },
        });
  
        render(<TicTacToe gameID={gameID} />);
        const restartButton = screen.getByText('Restart');
        expect(restartButton).toBeInTheDocument();
    });

    it('calls the restart function when the restart button is clicked', () => {
        const restartMock = jest.fn();
        useBehaviour.mockReturnValue({
            ...useBehaviour(),
            gameState: {
                ...useBehaviour().gameState,
                winner: user.uid,
            },
            restart: restartMock,
        });
  
        render(<TicTacToe gameID={gameID} />);
        const restartButton = screen.getByText('Restart');
        fireEvent.click(restartButton);
        expect(restartMock).toHaveBeenCalled();
    });

    it('calls the exitGame function when the exitGame button is clicked', () => {
        const exitMock = jest.fn();
        useBehaviour.mockReturnValue({
            ...useBehaviour(),
            exitGame: exitMock,
        });
  
        render(<TicTacToe gameID={gameID} />);
        const leaveButton = screen.getByText('Leave');
        fireEvent.click(leaveButton);
        expect(exitMock).toHaveBeenCalled();
    });
});
