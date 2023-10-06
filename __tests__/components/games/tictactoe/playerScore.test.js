import PlayerScore from '@/components/games/tictactoe/PlayerScore';
import { render } from '@testing-library/react';

describe('PlayerScore component', () => {
    it('renders player names and scores', () => {
        const props = {
            wins: {
                me: 3,
                other: 2,
            },
            state: {
                playerOne: '123',
                playerTwo: '456',
            },
            id: '123',
        };

        const { getByText } = render(<PlayerScore {...props} />);

        const playerOneName = getByText('X:');
        expect(playerOneName).toBeInTheDocument();
        const playerOneScore = getByText('3');
        expect(playerOneScore).toBeInTheDocument();

        const playerTwoName = getByText('O:');
        expect(playerTwoName).toBeInTheDocument();
        const playerTwoScore = getByText('2');
        expect(playerTwoScore).toBeInTheDocument();
    });

    it('renders player names and scores when only one player is present', () => {
        const props = {
            wins: {
                me: 3,
                other: 2,
            },
            state: {
                playerOne: '123',
            },
            id: '123',
        };

        const { getByText } = render(<PlayerScore {...props} />);

        const playerOneName = getByText('X:');
        expect(playerOneName).toBeInTheDocument();
        const playerOneScore = getByText('3');
        expect(playerOneScore).toBeInTheDocument();

        const playerTwoName = getByText('Waiting:');
        expect(playerTwoName).toBeInTheDocument();
        const playerTwoScore = getByText('2');
        expect(playerTwoScore).toBeInTheDocument();
    });
});
