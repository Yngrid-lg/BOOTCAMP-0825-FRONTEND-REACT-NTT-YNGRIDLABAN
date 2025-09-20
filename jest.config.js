/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',

  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },

  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      useESM: true,
      babelConfig: {
        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
      },
    }],
  },

  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'],
};

export default config;