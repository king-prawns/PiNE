import {JSONSchemaType} from 'ajv';

import ITestScenario from '../interfaces/ITestScenario';
import filter from './filter';
import testCase from './testCase';

const testScenario: JSONSchemaType<ITestScenario> = {
  type: 'object',
  properties: {
    describe: {type: 'string'},
    durationMs: {type: 'integer'},
    filters: {
      type: 'array',
      items: filter
    },
    testCases: {
      type: 'array',
      items: testCase
    }
  },
  required: ['describe', 'durationMs', 'filters', 'testCases'],
  additionalProperties: false
};

export default testScenario;
