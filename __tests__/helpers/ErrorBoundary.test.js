import ErrorBoundary from '@/helpers/ErrorBoundary';
import { render, screen } from '@testing-library/react';

function ErrorComponent() {
    throw new Error('Error occurred');
}

function TestComponent() {
    return <div>Test component</div>;
}


describe('ErrorBoundary', () => {
    it('wraps children in ErrorBoundary', () => {
        const { getByText } = render(
            <ErrorBoundary>
                <TestComponent />
            </ErrorBoundary>
        );

        expect(getByText(/Test component/i)).toBeInTheDocument();
    });

    it('generates an error message when an error is caught', () => {
        const logSpy = jest.spyOn(global.console, 'error');
        render(
            <ErrorBoundary>
                <ErrorComponent />
            </ErrorBoundary>
        );

        expect(logSpy).toHaveBeenCalled();
    });

    it('does not render child components when an error occurs', async () => {
        render(
            <ErrorBoundary>
                <ErrorComponent />
                <TestComponent />
            </ErrorBoundary>
        );

        expect(screen.queryByText('Test component')).not.toBeInTheDocument();
    });
});
