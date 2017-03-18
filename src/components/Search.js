import React, { Component } from 'react';
import debounce from 'lodash.debounce';

export default class Search extends Component {
  _search = () => this.props.onSearch(this.input.value);

  render() {
    const { results, clear, onPick } = this.props;
    return (
      <div className={`dropdown ${results && results.length > 0 && 'show'}`}>
        <input
          className="form-control"
          type="text"
          placeholder="søg efter ny film..."
          onChange={debounce(this._search, 200)}
          ref={r => this.input = r}
          onBlur={clear}
        />
        {results &&
          results.length > 0 &&
          <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            {results.map(r => (
              <a
                key={r.id}
                className="dropdown-item"
                onClick={() => onPick(r.id)}
              >
                {r.img &&
                  <img
                    alt={`${r.title}-poster`}
                    style={{ maxHeight: '200px' }}
                    src={r.img}
                  />}
                {r.title}
              </a>
            ))}
          </div>}
      </div>
    );
  }
}
