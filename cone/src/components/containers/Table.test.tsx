import {shallow} from 'enzyme';
import React from 'react';

import Table from './Table';

describe('Table', () => {
  const props: any = {};

  describe('render', () => {
    it('should render without error', () => {
      expect(() => shallow(<Table {...props} />)).not.toThrow();
    });
  });
});
