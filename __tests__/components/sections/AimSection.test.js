import { textConfig } from '@/domain/config/text.config';
import { render } from '@testing-library/react';
import AimSection from '../../../components/sections/home/AimSection';

describe('AimSection', () => {
    const text = textConfig.PAGES.HOME.AIM;

    it('renders the component with the correct data', () => {
        const { getByText } = render(<AimSection />);
        expect(getByText(text.TITLE)).toBeInTheDocument();
        expect(getByText(text.DESC)).toBeInTheDocument();
        text.AIMS.forEach((aim) => {
            expect(getByText(aim.title)).toBeInTheDocument();
            expect(getByText(aim.desc)).toBeInTheDocument();
        });
    });
});
