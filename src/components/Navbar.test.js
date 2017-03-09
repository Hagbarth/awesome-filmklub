import React from 'react';
import { shallow } from 'enzyme';
import Navbar from './Navbar';

describe('<Navbar/>', () => {
  it('renders', () => {
    const wrapper = shallow(<Navbar />);
    expect(wrapper.find('nav').prop('className')).toBe(
      'navbar navbar-light bg-faded rounded navbar-toggleable-md'
    );
  });
});
