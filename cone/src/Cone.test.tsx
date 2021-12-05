import {shallow} from 'enzyme';
import React from 'react';

import Cone from './Cone';

describe('Cone', () => {
  const props: any = {};

  describe('render', () => {
    it('should render without error', () => {
      expect(() => shallow(<Cone {...props} />)).not.toThrow();
    });
  });
});
