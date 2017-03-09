import React, { Component } from 'react';

export default class InputButton extends Component {
  _onClick = () => {
    this.props.onClick(this.input.value);
    this.input.value = '';
  };

  render() {
    return (
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Mappe navn"
          ref={ref => this.input = ref}
        />
        <span className="input-group-btn">
          <button
            className="btn btn-secondary"
            type="button"
            onClick={this._onClick}
          >
            {this.props.buttonText}
          </button>
        </span>
      </div>
    );
  }
}
