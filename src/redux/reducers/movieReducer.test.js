import movieReducer from './movieReducer';

describe('redux/reducers/movieReducer', () => {
  describe('given an unsupported action type', () => {
    it('returns initial state, if no state is given', () => {
      expect(movieReducer(undefined, {})).toEqual({ searchResults: [] });
    });

    it('returns given state', () => {
      expect(movieReducer({ state: 'is a state' }, {})).toEqual({
        state: 'is a state'
      });
    });
  });

  describe('given the action @@OMDB/search', () => {
    it('returns a state with search results from action', () => {
      expect(
        movieReducer([], {
          type: '@@OMDB/search',
          payload: { movies: ['some-movie'] }
        })
      ).toEqual({ searchResults: ['some-movie'] });
    });
  });
});
