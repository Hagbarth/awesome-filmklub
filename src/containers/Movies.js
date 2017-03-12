import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const Movies = () => <h3>Movies</h3>;

export default Movies;

export const connectMovies = ({ movieActions }) =>
  connect(state => ({}), dispatch => ({
    movieActions: bindActionCreators(movieActions, dispatch)
  }))(Movies);
