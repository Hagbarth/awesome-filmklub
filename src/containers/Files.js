import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import Nav from '../components/Nav';
import NavItem from '../components/NavItem';
import InputButton from '../components/InputButton';
import ProgressRow from '../components/ProgressRow';

export default class Files extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDir: null
    };
  }

  static propTypes = {
    directories: PropTypes.array.isRequired,
    uploads: PropTypes.array.isRequired
  };

  componentDidMount() {
    this.props.fileActions.subscribeDirectories();
  }

  _setDir = key => this.setState({
    currentDir: this.props.directories.filter(dir => dir.id === key)[0].id
  });

  _addDir = name => this.props.fileActions.addDirectory(name);

  _onDrop = files => {
    this.props.fileActions.uploadFiles(this.state.currentDir, files);
  };

  render() {
    const currentDir = this.state.currentDir &&
      this.props.directories.filter(dir => dir.id === this.state.currentDir)[0];
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
                    this.state.currentDir && this.state.currentDir === dir.id
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
                {currentDir &&
                  currentDir.files &&
                  currentDir.files.map(file => {
                    const uploading = this.props.uploads.filter(
                      u => u.key === file.id
                    )[0];
                    return (
                      <ProgressRow
                        progress={uploading ? uploading.progress : undefined}
                        key={file.id}
                      >
                        <td>{file.key}</td>
                      </ProgressRow>
                    );
                  })}
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
