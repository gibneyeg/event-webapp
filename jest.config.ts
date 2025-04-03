const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});
process.env.TZ = 'UTC';
const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.(js|jsx)$': ['babel-jest', { configFile: './babel-test.config.js' }]
  }
};

module.exports = createJestConfig(customJestConfig);