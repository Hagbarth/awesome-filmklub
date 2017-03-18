import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Search from '../components/Search';

export default class Movies extends Component {
  render() {
    const { movieActions, searchResults } = this.props;
    return (
      <Search
        clear={movieActions.clearSearch}
        onSearch={movieActions.search}
        results={searchResults}
      />
    );
  }
}

export const connectMovies = ({ movieActions }) => connect(state => ({
  searchResults: state.movieReducer.searchResults.map(m => ({
    id: m.imdbID,
    title: m.title,
    img: m.poster !== 'N/A' && m.poster
  }))
}), dispatch => ({
  movieActions: bindActionCreators(movieActions, dispatch)
}))(Movies);
