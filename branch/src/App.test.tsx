import {shallow} from 'enzyme';
import React from 'react';

import App from './App';

describe('App', () => {
  const props = {};

  describe('render', () => {
    it('should render without error', () => {
      expect(() => shallow(<App {...props} />)).not.toThrow();
    });
  });
});
