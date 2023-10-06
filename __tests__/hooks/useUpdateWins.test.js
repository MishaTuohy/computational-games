import React from 'react';
import { render, act } from '@testing-library/react';
import { useUpdateWins } from '@/hooks/games/tictactoe/useUpdateWins';

function TestComponent({ gameState, user }) {
    const { wins } = useUpdateWins(gameState, user);
    return (
        <div>
            <span data-testid="my-wins">{wins.me}</span>
            <span data-testid="other-wins">{wins.other}</span>
        </div>
    );
}

describe('useUpdateWins', () => {
    const initialGameState = {
        winner: null,
    };

    const user = {
        uid: 'user1',
    };

    test('should update wins based on gameState and user', async () => {
        const { rerender, getByTestId } = render(
            <TestComponent gameState={initialGameState} user={user} />
        );

        expect(getByTestId('my-wins').textContent).toBe('0');
        expect(getByTestId('other-wins').textContent).toBe('0');

        const updatedGameState1 = { winner: 'user1' };

        await act(async () => {
            rerender(<TestComponent gameState={updatedGameState1} user={user} />);
        });

        expect(getByTestId('my-wins').textContent).toBe('1');
        expect(getByTestId('other-wins').textContent).toBe('0');

        const updatedGameState2 = { winner: 'user2' };

        await act(async () => {
            rerender(<TestComponent gameState={updatedGameState2} user={user} />);
        });

        expect(getByTestId('my-wins').textContent).toBe('1');
        expect(getByTestId('other-wins').textContent).toBe('1');
    });
});
