import { render, screen } from '@testing-library/react';
import Loader from '@/components/loaders/Loader';

describe('Loader', () => {
    it('renders without errors', () => {
        render(<Loader />);
        const loaderElement = screen.getByTestId('loader');
        expect(loaderElement).toBeInTheDocument();
    });

    it('renders in the bottom left corner of the screen', () => {
        render(<Loader />);
        const loaderElement = screen.getByRole('status').parentElement;
        expect(loaderElement).toHaveClass('fixed-bottom');
        expect(loaderElement).toHaveClass('fixed-left');
        expect(loaderElement).toHaveClass('m-3');
    });
});
