module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.test.js', '**/*.test.js'],
  collectCoverageFrom: [
    '**/*.html',
    '!**/node_modules/**',
    '!**/coverage/**'
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/coverage/'
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(@exodus/bytes|jsdom)/)'
  ]
};
