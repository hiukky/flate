module.exports = {
  rootDir: '.',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageReporters: ['json', 'lcov'],
  testMatch: ['**/?(*.)+(spec).+(ts)'],
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@flate(.*)$': '<rootDir>/flate$1',
  },
}
