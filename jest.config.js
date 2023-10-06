// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({ 
    dir: './' 
});

const customJestConfig = {
    silent: true,
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    clearMocks: true,
    moduleNameMapper: {
        '@/(.*)$': '<rootDir>/$1',
    },
    coverageThreshold: {
        global: {
            statements: 100,
            branches: 100,
            functions: 100,
            lines: 100,
        },
    },
};

module.exports = createJestConfig(customJestConfig);
