import {shallow} from 'enzyme';
import React from 'react';

import Branch from './Branch';

jest.mock('./socket/getSocket', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    on: jest.fn()
  }))
}));

jest.mock('@king-prawns/pine-cone', () => ({
  Cone: jest.fn()
}));

describe('App', () => {
  const props: any = {};

  describe('render', () => {
    it('should render without error', () => {
      expect(() => shallow(<Branch {...props} />)).not.toThrow();
    });
  });
});
