import { render, screen } from '@testing-library/react';
import BaseLayout from '@/components/layout/BaseLayout';

describe('BaseLayout', () => {
    const pageTitle = 'Test Page';
    const childText = 'Test Content';

    it('renders without errors', () => {
        render(<BaseLayout pageTitle={pageTitle}>{childText}</BaseLayout>);
        const baseLayoutElement = screen.getByTestId('base-layout');
        expect(baseLayoutElement).toBeInTheDocument();
    });

    it('renders the child content within the layout', () => {
        render(<BaseLayout pageTitle={pageTitle}>{childText}</BaseLayout>);
        const childElement = screen.getByText(childText);
        expect(childElement).toBeInTheDocument();
    });

    it('renders the header component', () => {
        render(<BaseLayout pageTitle={pageTitle}>{childText}</BaseLayout>);
        const header = screen.getByTestId('header');
        expect(header).toBeInTheDocument();
    });

    it('renders the footer component', () => {
        render(<BaseLayout pageTitle={pageTitle}>{childText}</BaseLayout>);
        const footer = screen.getByTestId('footer');
        expect(footer).toBeInTheDocument();
    });
});
