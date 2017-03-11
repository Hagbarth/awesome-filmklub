import React from 'react';
import { shallow, mount } from 'enzyme';
import Files from './Files';
import NavItem from '../components/NavItem';
import ProgressRow from '../components/ProgressRow';

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

  it('renders the files in current dir in the table', () => {
    const dir = {
      id: 'some-id',
      name: 'some-name',
      files: [
        {
          id: 'some-key',
          key: 'some-key'
        }
      ]
    };
    let wrapper = shallow(<Files directories={[dir]} uploads={[]} />);
    wrapper.setState({ currentDir: dir.id });
    expect(wrapper.find('td')).toHaveLength(1);
    expect(wrapper.find('td').text()).toBe('some-key');
    expect(wrapper.find(ProgressRow).prop('progress')).toBeFalsy();

    wrapper = shallow(
      <Files
        directories={[dir]}
        uploads={[{ key: 'some-key', progress: 10 }]}
      />
    );
    wrapper.setState({ currentDir: dir.id });
    expect(wrapper.find(ProgressRow).prop('progress')).toBe(10);
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
    expect(wrapper.state().currentDir).toEqual('some-id');
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

  it(
    'calls props.fileActions.uploadFiles with files when onDrop is called',
    () => {
      const upload = jest.fn();
      const wrapper = shallow(
        <Files directories={[]} fileActions={{ uploadFiles: upload }} />
      );
      wrapper.setState({ currentDir: 'some-dir' });
      wrapper.instance()._onDrop(['file']);
      expect(upload).toHaveBeenCalledWith('some-dir', ['file']);
    }
  );
});
