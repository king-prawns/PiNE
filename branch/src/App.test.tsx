import {shallow} from 'enzyme';
import React from 'react';

import App from './App';

jest.mock('./socket/getSocket', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    on: jest.fn()
  }))
}));

describe('App', () => {
  const props = {};

  describe('render', () => {
    it('should render without error', () => {
      expect(() => shallow(<App {...props} />)).not.toThrow();
    });
  });
});
