import React from 'react';
import { shallow } from 'enzyme';
import ProgressRow from './ProgressRow';

describe('<ProgressRow />', () => {
  it('renders children', () => {
    const wrapper = shallow(<ProgressRow><p /></ProgressRow>);
    expect(wrapper.find('p')).toHaveLength(1);
  });

  it('does not add progress style when no progress', () => {
    const wrapper = shallow(<ProgressRow />);
    expect(wrapper.find('tr').prop('style')).toBeFalsy();
  });

  it('does not adds progress style when progress', () => {
    const wrapper = shallow(<ProgressRow progress={40} />);
    expect(wrapper.find('tr').prop('style')).toEqual({
      background: 'linear-gradient(to right, #45C99B 40%, #FFF 40%)'
    });
  });
});
