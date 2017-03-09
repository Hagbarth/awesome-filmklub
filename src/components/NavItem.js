import React, { Component } from 'react';

export default class NavItem extends Component {
  _onClick = () => this.props.onClick(this.props.id);

  render() {
    const { text, active } = this.props;
    return (
      <li
        className={`nav-item ${active ? 'active' : ''}`}
        onClick={this._onClick}
      >
        <a className={`nav-link ${active ? 'active' : ''}`}>{text}</a>
      </li>
    );
  }
}
