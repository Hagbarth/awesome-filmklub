import React, { Component, PropTypes } from 'react';
import Nav from '../components/Nav';
import NavItem from '../components/NavItem';
import InputButton from '../components/InputButton';

export default class Files extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDir: null
    };
  }

  static propTypes = {
    directories: PropTypes.array.isRequired
  };

  componentDidMount() {
    this.props.fileActions.subscribeDirectories();
  }

  _setDir = key => this.setState({
    currentDir: key
  });

  _addDir = name => this.props.fileActions.addDirectory(name);

  render() {
    return (
      <div>
        <br />
        <div className="row">
          <div className="col-md-6">
            <InputButton onClick={this._addDir} buttonText="Opret ny mappe" />
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-3">
            <Nav>
              {this.props.directories.map(dir => (
                <NavItem
                  key={dir.id}
                  id={dir.id}
                  text={dir.name}
                  onClick={this._setDir}
                  active={this.state.currentDir === dir.id}
                />
              ))}
            </Nav>
          </div>
        </div>
      </div>
    );
  }
}
