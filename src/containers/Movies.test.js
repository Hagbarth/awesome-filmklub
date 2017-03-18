import React from 'react';
import { shallow } from 'enzyme';
import Movies from './Movies';

describe('<Movies />', () => {
  it('renders', () => {
    shallow(<Movies movieActions={{ clearSearch: jest.fn() }} />);
  });
});
