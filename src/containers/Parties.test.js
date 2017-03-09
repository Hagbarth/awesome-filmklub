import React from 'react';
import { shallow } from 'enzyme';
import Parties from './Parties';

describe('<Parties />', () => {
  it('renders', () => {
    shallow(<Parties />);
  });
});
