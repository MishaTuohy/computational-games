import AimSection from '@/components/sections/home/AimSection';
import GameSection from '@/components/sections/home/GameSection';
import IntroSection from '@/components/sections/home/IntroSection';
import BaseLayout from '@/components/layout/BaseLayout';
import AboutSection from '@/components/sections/home/AboutSection';

export default function index() {
    return (
        <>
            <main >
                <IntroSection />
                <AimSection />
                <GameSection />
                <AboutSection />
            </main>
        </>
    );
}

index.getLayout = function getLayout(page) {
    return (
        <BaseLayout>
            {page}
        </BaseLayout>
    );
};
