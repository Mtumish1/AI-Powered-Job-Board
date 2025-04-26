/** @type {import('ts-jest').JestConfigWithTsJest} **/

module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/src/__tests__'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
};


