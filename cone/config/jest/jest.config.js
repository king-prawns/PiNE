const baseConfig = require('../../../config/jest/jest.config.base');

module.exports = {
  ...baseConfig,
  globals: {
    'ts-jest': {
      tsconfig: '../cone/config/typescript/tsconfig.json'
    }
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  setupFiles: [`${__dirname}/setup.ts`]
};