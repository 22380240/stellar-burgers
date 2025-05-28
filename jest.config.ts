import type { JestConfigWithTsJest } from 'ts-jest';

export default {
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {}]
  },
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8'
} satisfies JestConfigWithTsJest;
