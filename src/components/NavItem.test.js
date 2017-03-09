import React from 'react';
import { shallow } from 'enzyme';
import NavItem from './NavItem';

describe('<NavItem/>', () => {
  describe('given that the a i clicked', () => {
    it('calls the onClick prop with the id prop', () => {
      const onClick = jest.fn();
      const wrapper = shallow(<NavItem onClick={onClick} id="some-id" />);
      wrapper.find('li').simulate('click');
      expect(onClick).toHaveBeenCalledWith('some-id');
    });
  });

  describe('given that active is passed as a prop', () => {
    it('adds the class "active" to li and a', () => {
      const wrapper = shallow(<NavItem active />);
      expect(wrapper.find('li').hasClass('active')).toBeTruthy();
      expect(wrapper.find('a').hasClass('active')).toBeTruthy();
    });
  });

  describe('given that active is passed not as a prop', () => {
    it('does not add the class "active" to li and a', () => {
      const wrapper = shallow(<NavItem />);
      expect(wrapper.find('li').hasClass('active')).toBeFalsy();
      expect(wrapper.find('a').hasClass('active')).toBeFalsy();
    });
  });
});
