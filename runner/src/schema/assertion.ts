import {JSONSchemaType} from 'ajv';

import IAssertion from '../interfaces/IAssertion';

const assertion: JSONSchemaType<IAssertion> = {
  type: 'object',
  required: ['type', 'matcher', 'expected', 'fromMs', 'toMs'],
  oneOf: [
    {
      properties: {
        type: {const: 'playerState'},
        fromMs: {type: 'integer'},
        toMs: {type: 'integer'},
        matcher: {
          enum: [
            'equal',
            'notEqual',
            'contains',
            'notContains',
            'startsWith',
            'notStartsWith',
            'endsWith',
            'notEndsWith'
          ]
        },
        expected: {
          anyOf: [
            {
              type: 'array',
              items: {
                enum: [
                  'LOADING',
                  'BUFFERING',
                  'PLAYING',
                  'PAUSED',
                  'ENDED',
                  'ERRORED'
                ]
              }
            },
            {
              enum: [
                'LOADING',
                'BUFFERING',
                'PLAYING',
                'PAUSED',
                'ENDED',
                'ERRORED'
              ]
            }
          ]
        }
      }
    },
    {
      properties: {
        type: {const: 'manifestUrl'},
        fromMs: {type: 'integer'},
        toMs: {type: 'integer'},
        matcher: {
          enum: [
            'equal',
            'notEqual',
            'contains',
            'notContains',
            'startsWith',
            'notStartsWith',
            'endsWith',
            'notEndsWith'
          ]
        },
        expected: {
          anyOf: [
            {
              type: 'array',
              items: {type: 'string'}
            },
            {type: 'string'}
          ]
        }
      }
    },
    {
      properties: {
        type: {const: 'variant'},
        fromMs: {type: 'integer'},
        toMs: {type: 'integer'},
        matcher: {
          enum: [
            'greaterThan',
            'greaterThanOrEqual',
            'lessThan',
            'lessThanOrEqual'
          ]
        },
        expected: {type: 'integer'}
      }
    },
    {
      properties: {
        type: {const: 'estimatedBandwidth'},
        fromMs: {type: 'integer'},
        toMs: {type: 'integer'},
        matcher: {
          enum: [
            'greaterThan',
            'greaterThanOrEqual',
            'lessThan',
            'lessThanOrEqual'
          ]
        },
        expected: {type: 'integer'}
      }
    },
    {
      properties: {
        type: {const: 'videoBufferInfo'},
        fromMs: {type: 'integer'},
        toMs: {type: 'integer'},
        matcher: {
          enum: [
            'greaterThan',
            'greaterThanOrEqual',
            'lessThan',
            'lessThanOrEqual'
          ]
        },
        expected: {type: 'integer'}
      }
    }
  ]
};

export default assertion;
