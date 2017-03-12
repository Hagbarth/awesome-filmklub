import movieGetter from './movieGetter';

describe('movieGetter', () => {
  describe('search', () => {
    it('returns an array of movies', done => {
      const mockOmdb = {
        get: jest.fn(() => Promise.resolve({
          Search: [
            {
              Title: 'Star Wars: Episode IV - A New Hope',
              Year: '1977',
              imdbID: 'tt0076759',
              Type: 'movie',
              Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BYzQ2OTk4N2QtOGQwNy00MmI3LWEwNmEtOTk0OTY3NDk2MGJkL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg'
            },
            {
              Title: 'Star Wars: Episode V - The Empire Strikes Back',
              Year: '1980',
              imdbID: 'tt0080684',
              Type: 'movie',
              Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BYmViY2M2MTYtY2MzOS00YjQ1LWIzYmEtOTBiNjhlMGM0NjZjXkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_SX300.jpg'
            }
          ]
        }))
      };
      movieGetter({ omdb: mockOmdb }).search('').then(r => {
        done();
        expect(r).toEqual([
          {
            title: 'Star Wars: Episode IV - A New Hope',
            year: '1977',
            imdbID: 'tt0076759',
            type: 'movie',
            poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BYzQ2OTk4N2QtOGQwNy00MmI3LWEwNmEtOTk0OTY3NDk2MGJkL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg'
          },
          {
            title: 'Star Wars: Episode V - The Empire Strikes Back',
            year: '1980',
            imdbID: 'tt0080684',
            type: 'movie',
            poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BYmViY2M2MTYtY2MzOS00YjQ1LWIzYmEtOTBiNjhlMGM0NjZjXkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_SX300.jpg'
          }
        ]);
        done();
      });
    });
  });
});
