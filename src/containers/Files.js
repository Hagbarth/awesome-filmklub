import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';
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
    currentDir: this.props.directories.filter(dir => dir.id === key)[0]
  });

  _addDir = name => this.props.fileActions.addDirectory(name);

  _onDrop = files => {
    this.props.fileActions.uploadFiles(this.state.currentDir.id, files);
  };

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
                  active={
                    this.state.currentDir && this.state.currentDir.id === dir.id
                  }
                />
              ))}
            </Nav>
          </div>
          <div className="col-md-9">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {this.state.currentDir &&
                  this.state.currentDir.files &&
                  this.state.currentDir.files.map(file => (
                    <tr key={file.id}><td>{file.key}</td></tr>
                  ))}
              </tbody>
            </table>
            {this.state.currentDir !== null
              ? <Dropzone
                  disableClick
                  onDrop={this._onDrop}
                  style={{
                    width: '100%',
                    border: '1px dashed black',
                    borderRadius: '3px',
                    padding: '10px'
                  }}
                  activeStyle={{}}
                >
                  {({ isDragActive }) => (
                    <div>
                      {isDragActive ? 'Slip' : 'Træk filer ind her.'}
                    </div>
                  )}
                </Dropzone>
              : null}
          </div>
        </div>
      </div>
    );
  }
}
