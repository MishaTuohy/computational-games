import CoinElement from '@/components/games/coincollector/CoinElement';
import { render, screen } from '@testing-library/react';

describe('CoinElement component', () => {
    const coin = {
        x: 3,
        y: 5,
    };

    it('renders the coin element with the correct styles and class names', () => {
        render(<CoinElement coin={coin} />);

        const coinElement = screen.getByTestId('coin');
        expect(coinElement).toHaveClass('Coin');
        expect(coinElement).toHaveClass('grid_cell');
        expect(coinElement).toHaveStyle({
            left: '48px',
            top: '76px',
        });
        expect(coinElement.firstChild).toHaveClass('Coin_shadow');
        expect(coinElement.firstChild).toHaveClass('grid_cell');
        expect(coinElement.lastChild).toHaveClass('Coin_sprite');
        expect(coinElement.lastChild).toHaveClass('grid_cell');
    });
});
