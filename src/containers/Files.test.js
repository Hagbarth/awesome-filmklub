import React from 'react';
import { shallow, mount } from 'enzyme';
import Files from './Files';
import NavItem from '../components/NavItem';

describe('<Files />', () => {
  it('renders', () => {
    shallow(<Files directories={[]} />);
  });

  it('renders the same number of NavItems as dirs', () => {
    const wrapper = shallow(
      <Files
        directories={[
          {
            id: 'some-id',
            name: 'some-name'
          }
        ]}
      />
    );
    expect(wrapper.find(NavItem)).toHaveLength(1);
  });

  it('calls subscribeDirectories on mount', () => {
    const mockSub = jest.fn();
    const wrapper = mount(
      <Files directories={[]} fileActions={{ subscribeDirectories: mockSub }} />
    );
    expect(mockSub).toHaveBeenCalled();
  });

  it('sets current dir when NavItem is clicked', () => {
    const wrapper = mount(
      <Files
        directories={[
          {
            id: 'some-id',
            name: 'some-name'
          }
        ]}
        fileActions={{ subscribeDirectories: jest.fn() }}
      />
    );
    wrapper.find(NavItem).simulate('click');
    expect(wrapper.state().currentDir).toBe('some-id');
  });

  it(
    'calls props.fileActions.addDirectory with the name when _addDir is called',
    () => {
      const mockAddDir = jest.fn();
      const wrapper = shallow(
        <Files directories={[]} fileActions={{ addDirectory: mockAddDir }} />
      );
      wrapper.instance()._addDir('some-name');
      expect(mockAddDir).toHaveBeenCalledWith('some-name');
    }
  );
});
