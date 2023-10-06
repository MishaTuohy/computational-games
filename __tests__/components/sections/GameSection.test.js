import { render, screen } from '@testing-library/react';
import { textConfig } from '@/domain/config/text.config';
import GameSection from '@/components/sections/home/GameSection';

jest.mock('firebase/auth', () => ({ getAuth: jest.fn(), }));

describe('GameSection', () => {
    const text = textConfig.PAGES.HOME.GAMES;
    const games = text.GAMES_LIST;

    beforeEach(() => {
        render(<GameSection />);
    });

    it('renders the GameSection component', () => {
        const titleElement = screen.getByText(text.TITLE);
        const supportElement = screen.getByText(text.GAMES_SUPPORT);

        expect(titleElement).toBeInTheDocument();
        expect(supportElement).toBeInTheDocument();
    });

    it('renders the games list', () => {
        games.forEach((game) => {
            const titleElement = screen.getByText(game.title);
            const descElement = screen.getByText(game.desc);
            const buttonTextElements = screen.getAllByText(game.buttonText);

            expect(buttonTextElements.length).toBeGreaterThan(0);
            expect(titleElement).toBeInTheDocument();
            expect(descElement).toBeInTheDocument();
        });
    });
});
