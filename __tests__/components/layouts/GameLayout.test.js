import { render, screen } from '@testing-library/react';
import GameLayout from '@/components/layout/GameLayout';

describe('BaseLayout', () => {
    const pageTitle = 'Test Page';
    const childText = 'Test Content';

    it('renders without errors', () => {
        render(<GameLayout pageTitle={pageTitle}>{childText}</GameLayout>);
        const baseLayoutElement = screen.getByTestId('base-layout');
        expect(baseLayoutElement).toBeInTheDocument();
    });

    it('renders the child content within the layout', () => {
        render(<GameLayout pageTitle={pageTitle}>{childText}</GameLayout>);
        const childElement = screen.getByText(childText);
        expect(childElement).toBeInTheDocument();
    });
});
