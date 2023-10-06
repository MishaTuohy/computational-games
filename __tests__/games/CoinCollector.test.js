import { render, screen, fireEvent } from '@testing-library/react';
import { useAuth } from '@/services/firebase/auth/AuthProvider';
import useBehaviour from '@/games/coinCollector/hooks/useBehaviour';
import { CoinCollector } from '@/games/coinCollector/CoinCollector';

jest.mock('@/services/firebase/auth/AuthProvider', () => ({
    useAuth: jest.fn(),
}));

jest.mock('@/games/coinCollector/hooks/useBehaviour', () => jest.fn());

describe('CoinCollector', () => {
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
            playerState: {
                id: user.uid,
                name: 'test-name',
                color: 'red',
                coins: 0,
            },
            gameState: {
                players: [
                    {
                        id: 'test-player-id-1',
                        name: 'test-player-1',
                        color: 'blue',
                        coins: 0,
                    },
                    {
                        id: 'test-player-id-2',
                        name: 'test-player-2',
                        color: 'green',
                        coins: 0,
                    },
                ],
                coins: [
                    {
                        id: 'test-coin-id-1',
                        x: 100,
                        y: 200,
                    },
                    {
                        id: 'test-coin-id-2',
                        x: 300,
                        y: 400,
                    },
                ],
            },
            changeName: jest.fn(),
            changeColor: jest.fn(),
            exitGame: jest.fn(),
        });
    });

    it('renders the map container', () => {
        render(<CoinCollector gameID={gameID} />);
        const mapContainer = screen.getByTestId('map-container');
        expect(mapContainer).toBeInTheDocument();
    });

    it('renders the player info section with change name and color buttons', () => {
        render(<CoinCollector gameID={gameID} />);
        const changeNameButton = screen.getByText('Change Name');
        expect(changeNameButton).toBeInTheDocument();
        const changeColorButton = screen.getByText('Change Color');
        expect(changeColorButton).toBeInTheDocument();
    });

    it('renders the other players\' characters', () => {
        render(<CoinCollector gameID={gameID} />);
        const player1 = screen.getByText('test-player-1');
        expect(player1).toBeInTheDocument();
        const player2 = screen.getByText('test-player-2');
        expect(player2).toBeInTheDocument();
    });

    it('renders the current player\'s character', () => {
        render(<CoinCollector gameID={gameID} />);
        const currentPlayer = screen.getByText('test-name');
        expect(currentPlayer).toBeInTheDocument();
    });

    it('renders the coins', () => {
        render(<CoinCollector gameID={gameID} />);
        const coins = screen.getAllByTestId('coin');
        expect(coins).toHaveLength(2);
    });

    it('renders the leave game button', () => {
        render(<CoinCollector gameID={gameID} />);
        const leaveButton = screen.getByText('Leave Game');
        expect(leaveButton).toBeInTheDocument();
    });

    it('renders the invite friends modal', () => {
        render(<CoinCollector gameID={gameID} />);
        const inviteButton = screen.getByText('Invite friends');
        expect(inviteButton).toBeInTheDocument();
    });

    it('calls the changeName function when the change name button is clicked', () => {
        const changeNameMock = jest.fn();
        useBehaviour.mockReturnValue({
            ...useBehaviour(),
            changeName: changeNameMock,
        });

        render(<CoinCollector gameID={gameID} />);
        const changeNameButton = screen.getByText('Change Name');
        fireEvent.click(changeNameButton);
        expect(changeNameMock).toHaveBeenCalled();
    });

    it('calls the changeColor function when the change color button is clicked', () => {
        const changeColorMock = jest.fn();
        useBehaviour.mockReturnValue({
            ...useBehaviour(),
            changeColor: changeColorMock,
        });

        render(<CoinCollector gameID={gameID} />);
        const changeColorButton = screen.getByText('Change Color');
        fireEvent.click(changeColorButton);
        expect(changeColorMock).toHaveBeenCalled();
    });

    it('calls the exitGame function when the leave game button is clicked', () => {
        const exitGameMock = jest.fn();
        useBehaviour.mockReturnValue({
            ...useBehaviour(),
            exitGame: exitGameMock,
        });

        render(<CoinCollector gameID={gameID} />);
        const leaveButton = screen.getByText('Leave Game');
        fireEvent.click(leaveButton);
        expect(exitGameMock).toHaveBeenCalled();
    });
});
