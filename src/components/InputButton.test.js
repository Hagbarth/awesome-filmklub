import React from 'react';
import { mount } from 'enzyme';
import Input from './InputButton';

describe('<Input/>', () => {
  it('calls onClick prop with the input value, when button is clicked', () => {
    const onClick = jest.fn();
    const wrapper = mount(<Input onClick={onClick} />);
    wrapper.find('input').node.value = 'some-value';
    wrapper.find('button').simulate('click');
    expect(onClick).toHaveBeenCalledWith('some-value');
  });
});
