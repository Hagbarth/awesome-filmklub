import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Navbar = () => (
  <nav className="navbar navbar-light bg-faded rounded navbar-toggleable-md">
    <button
      className="navbar-toggler navbar-toggler-right"
      type="button"
      data-toggle="collapse"
      data-target="#containerNavbar"
      aria-controls="containerNavbar"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <Link activeClassName="active" to="/" className="navbar-brand">
      Awesome Filmklub
    </Link>
    <div className="collapse navbar-collapse" id="containerNavbar">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link activeClassName="active" to="tuesdays" className="nav-link">
            Tirsdage <span className="sr-only">(current)</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link activeClassName="active" to="movies" className="nav-link">
            Film
          </Link>
        </li>
        <li className="nav-item">
          <Link activeClassName="active" to="parties" className="nav-link">
            Fester
          </Link>
        </li>
        <li className="nav-item">
          <Link activeClassName="active" to="files" className="nav-link">
            Filer
          </Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
