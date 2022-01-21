import {JSONSchemaType} from 'ajv';

import IActiveFilter from '../shared/interfaces/IActiveFilter';
import IDuration from '../shared/interfaces/IDuration';

const filter: JSONSchemaType<IActiveFilter & IDuration> = {
  type: 'object',
  required: ['type', 'fromMs', 'toMs'],
  oneOf: [
    {
      properties: {
        type: {const: ['offline']},
        fromMs: {type: 'integer'},
        toMs: {type: 'integer'}
      }
    },
    {
      properties: {
        type: {const: ['reject']},
        regex: {type: 'string'},
        code: {type: 'integer'},
        fromMs: {type: 'integer'},
        toMs: {type: 'integer'}
      },
      required: ['regex', 'code']
    },
    {
      properties: {
        type: {const: ['latency']},
        delayMs: {type: 'integer'},
        fromMs: {type: 'integer'},
        toMs: {type: 'integer'}
      },
      required: ['delayMs']
    },
    {
      properties: {
        type: {const: ['jitter']},
        delayMs: {type: 'integer'},
        jitterMs: {type: 'integer'},
        fromMs: {type: 'integer'},
        toMs: {type: 'integer'}
      },
      required: ['delayMs', 'jitterMs']
    },
    {
      properties: {
        type: {const: ['throttle']},
        bandwidthKbps: {type: 'integer'},
        fromMs: {type: 'integer'},
        toMs: {type: 'integer'}
      },
      required: ['bandwidthKbps']
    }
  ]
};

export default filter;
