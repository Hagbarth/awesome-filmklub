import React from 'react';
import { shallow } from 'enzyme';
import Tuesdays from './Tuesdays';

describe('<Tuesdays />', () => {
  it('renders', () => {
    shallow(<Tuesdays />);
  });
});
