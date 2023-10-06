import { textConfig } from '@/domain/config/text.config';
import { render,screen } from '@testing-library/react';
import IntroSection from '../../../components/sections/home/IntroSection';

describe('IntroSection', () => { 
    const text = textConfig.PAGES.HOME.INTRO;

    beforeEach(() => {
        render(<IntroSection />);
    });
    test('renders the title and description', () => {
        expect(screen.getByText(text.TITLE1)).toBeInTheDocument();
        expect(screen.getByText(text.TITLE2)).toBeInTheDocument();
        expect(screen.getByText(text.TITLE3)).toBeInTheDocument();
        expect(screen.getByText(text.DESC)).toBeInTheDocument();
    });

    test('renders the image', () => {
        const img = screen.getByRole('img');
        expect(img).toHaveAttribute('src', text.IMG);
        expect(img).toHaveAttribute('alt', '');
    });
});
