import { render } from '@testing-library/react';
import { textConfig } from '@/domain/config/text.config';
import Footer from '@/components/layout/Footer';

describe('Footer component', () => {
    it('renders university name correctly', () => {
        const { getByText } = render(<Footer />);
        const university = getByText(textConfig.COMMON.FOOTER.UNIVERSITY);
        expect(university).toBeInTheDocument();
    });
});
