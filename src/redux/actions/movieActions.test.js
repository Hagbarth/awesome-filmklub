import movieActions from './movieActions';

describe('redux/actions/movieActions', () => {
  describe('search', () => {
    it('dispatches action with result from movieGetter', done => {
      const mockDispatch = jest.fn(action => {
        expect(action).toEqual({
          type: '@@OMDB/search',
          payload: {
            movies: 'result'
          }
        });
        done();
      });
      const searchMock = jest.fn(() => Promise.resolve('result'));
      const movieGetter = {
        search: searchMock
      };
      movieActions({ movieGetter }).search('')(mockDispatch);
    });
  });
});
