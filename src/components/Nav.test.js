import React from 'react';
import { shallow } from 'enzyme';
import Nav from './Nav';

describe('<Nav/>', () => {
  it('renders children', () => {
    const wrapper = shallow(<Nav><div>test</div></Nav>);
    expect(wrapper.find('div').text()).toBe('test');
  });
});
