import {JSONSchemaType} from 'ajv';

import ITestCase from '../interfaces/ITestCase';
import assertion from './assertion';

const testCase: JSONSchemaType<ITestCase> = {
  type: 'object',
  properties: {
    it: {type: 'string'},
    assertions: {
      type: 'array',
      items: assertion
    }
  },
  required: ['it', 'assertions']
};

export default testCase;
