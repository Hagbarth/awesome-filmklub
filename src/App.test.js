import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import NavBar from './components/Navbar';

describe('<App />', () => {
  it('renders', () => {
    shallow(<App />);
  });

  it('renders children', () => {
    const wrapper = shallow(<App><div /></App>);
    expect(wrapper.find('div')).toHaveLength(2);
  });

  it('renders NavBar', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(NavBar)).toHaveLength(1);
  });
});
