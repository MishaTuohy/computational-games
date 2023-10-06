import { render } from '@testing-library/react';
import useDebounce from '@/hooks/useDebounce';
import { act } from 'react-dom/test-utils';


jest.useFakeTimers();

describe('useDebounce', () => {
    const TestComponent = ({ value, delay }) => {
        const debouncedValue = useDebounce(value, delay);
        return <div>{debouncedValue}</div>;
    };

    it('returns the initial value and updates the debounced value after the delay', () => {
        const { getByText, rerender } = render(<TestComponent value="test" delay={500} />);
        expect(getByText('test')).toBeInTheDocument();

        rerender(<TestComponent value="updated test" delay={500} />);

        act(() => {
            jest.advanceTimersByTime(500);
        });

        expect(getByText('updated test')).toBeInTheDocument();
    });
});
