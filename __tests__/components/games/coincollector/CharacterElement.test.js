import { render, screen } from '@testing-library/react';
import CharacterElement from '@/components/games/coincollector/CharacterElement';

describe('CharacterElement', () => {
    const player = {
        id: 'test-player-id',
        x: 0,
        y: 0,
        name: 'Test Player',
        color: 'red',
        coins: 5,
        direction: 'right',
    };

    it('renders the character element with the correct styles and attributes', () => {
        render(<CharacterElement player={player} playerId="test-player-id" />);

        const character = screen.getByTestId('character');
        expect(character).toHaveClass('grid_cell');
        expect(character).toHaveStyle({
            left: '0px',
            top: '-4px',
        });
        expect(character).toHaveAttribute('datacolor', 'red');
        expect(character).toHaveAttribute('datadirection', 'right');
    });

    it('renders player name and coins', () => {
        render(<CharacterElement player={player} playerId="test-player-id" />);
    
        const playerName = screen.getByText('Test Player');
        expect(playerName).toBeInTheDocument();
    
        const playerCoins = screen.getByText('5');
        expect(playerCoins).toBeInTheDocument();
    });
});
