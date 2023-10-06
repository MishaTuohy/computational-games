import Header from '@/components/layout/Header';
import { render, screen } from '@testing-library/react';

describe('Header', () => {
    it('renders without errors', () => {
        render(<Header />);
        const headerElement = screen.getByTestId('header');
        expect(headerElement).toBeInTheDocument();
    });

    it('renders a logo', () => {
        render(<Header />);
        const logoElement = screen.getByAltText('logo');
        expect(logoElement).toBeInTheDocument();
    });
});
