const baseConfig = require('../../../config/jest/jest.config.base');

module.exports = {
  ...baseConfig,
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsconfig: '../branch/config/typescript/tsconfig.json'
    }
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleNameMapper: {
    '\\.(css)$': `${__dirname}/mockCSS.ts`
  },
  setupFiles: [`${__dirname}/setup.ts`]
};
