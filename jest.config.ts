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
  },
  // Add this line to exclude the e2e directory- was running e2e tests when doing npm test which dosent work
  testPathIgnorePatterns: [
    '/node_modules/',
    '/.next/',
    '/e2e/'
  ]
};

module.exports = createJestConfig(customJestConfig);