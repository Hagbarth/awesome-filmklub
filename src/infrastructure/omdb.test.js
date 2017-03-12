import omdb from './omdb';

describe('omdb', () => {
  describe('get', () => {
    it('calls fetch with host and query', () => {
      const mockJSON = jest.fn(() =>
        Promise.resolve({ result: 'some-result' }));
      const mockFetch = jest.fn(() => Promise.resolve({ json: mockJSON }));
      const omdbInstance = omdb({ host: 'some-host', fetch: mockFetch });
      omdbInstance.get({ query: { s: 'query', key: 'val' } });
      expect(mockFetch).toHaveBeenCalledWith('some-host?s=query&key=val&');
    });

    it('returns the fetch response json', done => {
      const mockJSON = jest.fn(() =>
        Promise.resolve({ result: 'some-result' }));
      const mockFetch = jest.fn(() => Promise.resolve({ json: mockJSON }));
      const omdbInstance = omdb({ host: 'some-host', fetch: mockFetch });
      omdbInstance.get({ query: { s: 'query', key: 'val' } }).then(r => {
        expect(r).toEqual({ result: 'some-result' });
        done();
      });
    });
  });
});
