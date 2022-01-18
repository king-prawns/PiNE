const baseConfig = require('../../../config/jest/jest.config.base');

module.exports = {
  ...baseConfig,
  globals: {
    'ts-jest': {
      tsconfig: '../runner/config/typescript/tsconfig.json'
    }
  }
};
