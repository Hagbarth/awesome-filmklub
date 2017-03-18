export default function movieActions({ movieGetter, movieRepo }) {
  return {
    search: query => dispatch => {
      movieGetter.search(query).then(result => dispatch({
        type: '@@OMDB/search',
        payload: {
          movies: result
        }
      }));
    },
    clearSearch: () => ({
      type: '@@OMDB/clear'
    })
  };
}
