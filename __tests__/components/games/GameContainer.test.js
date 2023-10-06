import { render, screen } from '@testing-library/react';
import GameContainer from '@/components/games/GameContainer';
import styles from '@/styles/games/Game.module.css';

describe('GameContainer', () => {
    it('renders the page content', () => {
        const testPage = <div data-testid="test-page">Test Page</div>;
        render(<GameContainer page={testPage} />);
        const pageContent = screen.getByTestId('test-page');
        expect(pageContent).toBeInTheDocument();
    });

    it('applies the game container style', () => {
        const testPage = <div data-testid="test-page">Test Page</div>;
        render(<GameContainer page={testPage} />);
        const containerElement = screen.getByTestId('map-container');
        expect(containerElement).toHaveClass(styles.gameContainer);
    });
});
