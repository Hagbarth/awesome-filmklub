import React, { Component, PropTypes } from 'react';
import Navbar from './components/Navbar';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  static propTypes = {
    children: PropTypes.element
  };
  render() {
    return (
      <div className="container">
        <Navbar />
        {this.props.children}
      </div>
    );
  }
}

export default App;
