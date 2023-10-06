/** @type {import('next').NextConfig} */

const nextConfig = ({ defaultConfig }) => {
    const redirects = () => {
        return [
            {
                source: '/home',
                destination: '/',
                permanent: true
            }
        ];
    };

    return {
        ...defaultConfig,
        reactStrictMode: true,
        redirects,
    };
};

module.exports = nextConfig;
