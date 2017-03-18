import React from 'react';
import { shallow, mount } from 'enzyme';
import Search from './Search';

describe('<Search />', () => {
  it('renders an input', () => {
    const wrapper = shallow(<Search />);
    expect(wrapper.find('input')).toHaveLength(1);
  });

  describe('given that the user inputs a movie title', () => {
    it('calls onSearch with the value', done => {
      const onSearch = jest.fn(() => {
        expect(onSearch).toHaveBeenCalledWith('some-value');
        done();
      });
      const wrapper = mount(<Search onSearch={onSearch} />);
      wrapper.find('input').node.value = 'some-value';
      wrapper.find('input').simulate('change');
    });

    it('calls clear when input blurs', done => {
      const clear = jest.fn(() => {
        expect(clear).toHaveBeenCalled();
        done();
      });
      const wrapper = mount(<Search clear={clear} />);
      wrapper.find('input').simulate('blur');
    });
  });

  describe('given an array of zero results', () => {
    it('does not render a result list', () => {
      const wrapper = shallow(<Search results={[]} />);
      expect(wrapper.find('.dropdown-menu')).toHaveLength(0);
      expect(wrapper.find('.dropdown').hasClass('show')).toBeFalsy();
    });
  });

  describe('given an array of results', () => {
    it('renders a result list', () => {
      const wrapper = shallow(
        <Search
          results={[
            {
              id: 'some-id',
              title: 'some-title'
            }
          ]}
        />
      );
      expect(wrapper.find('.dropdown-menu')).toHaveLength(1);
      expect(wrapper.find('.dropdown').hasClass('show')).toBeTruthy();
      expect(wrapper.find('a')).toHaveLength(1);
    });

    it('renders an anchor with title for each result', () => {
      const wrapper = shallow(
        <Search
          results={[
            {
              id: 'some-id',
              title: 'some-title'
            }
          ]}
        />
      );
      expect(wrapper.find('a').at(0).text()).toBe('some-title');
    });

    it('renders an image for each result that has an img prop', () => {
      const wrapper = shallow(
        <Search
          results={[
            {
              id: 'some-id',
              title: 'some-title',
              img: 'some-img'
            }
          ]}
        />
      );
      expect(wrapper.find('img').at(0).prop('src')).toBe('some-img');
      expect(wrapper.find('img').at(0).prop('alt')).toBe('some-title-poster');
    });

    describe('given that the user click a result', () => {
      it('calls the passed onPick function', () => {
        const onPick = jest.fn();
        const wrapper = shallow(
          <Search
            onPick={onPick}
            results={[
              {
                id: 'some-id',
                title: 'some-title',
                img: 'some-img'
              }
            ]}
          />
        );
        wrapper.find('a').at(0).simulate('click');
        expect(onPick).toHaveBeenCalledWith('some-id');
      });
    });
  });
});
