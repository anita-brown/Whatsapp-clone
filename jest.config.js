/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
//   coverageDirectory: 'coverage',
//   collectCoverageFrom: ['src/**/*.{js,ts}'],
//   moduleDirectories: ['node_modules', 'src'],
// };

module.exports = {
  roots: ['<rootDir>/src'],

  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },

  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
};
