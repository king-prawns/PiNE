import {JSONSchemaType} from 'ajv';

import IActiveFilter from '../shared/interfaces/IActiveFilter';
import IDuration from '../shared/interfaces/IDuration';

const filter: JSONSchemaType<IActiveFilter & IDuration> = {
  type: 'object',
  required: ['type', 'fromMs', 'toMs'],
  oneOf: [
    {
      properties: {
        type: {enum: ['offline']},
        fromMs: {type: 'integer'},
        toMs: {type: 'integer'}
      }
    },
    {
      properties: {
        type: {enum: ['reject']},
        regex: {type: 'string'},
        code: {type: 'integer'},
        fromMs: {type: 'integer'},
        toMs: {type: 'integer'}
      },
      required: ['regex', 'code']
    },
    {
      properties: {
        type: {enum: ['latency']},
        delayMs: {type: 'integer'},
        fromMs: {type: 'integer'},
        toMs: {type: 'integer'}
      },
      required: ['delayMs']
    },
    {
      properties: {
        type: {enum: ['jitter']},
        delayMs: {type: 'integer'},
        jitterMs: {type: 'integer'},
        fromMs: {type: 'integer'},
        toMs: {type: 'integer'}
      },
      required: ['delayMs', 'jitterMs']
    },
    {
      properties: {
        type: {enum: ['throttle']},
        bandwidthKbps: {type: 'integer'},
        fromMs: {type: 'integer'},
        toMs: {type: 'integer'}
      },
      required: ['bandwidthKbps']
    }
  ]
};

export default filter;
