/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { JestConfigWithTsJest } from 'ts-jest'

const config: JestConfigWithTsJest = {
  clearMocks: true,
  coverageProvider: 'v8',
  preset: 'ts-jest',
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
  },
}

export default config
