import fileReducer from './fileReducer';

describe('redux/reducers/fileReducer', () => {
  describe('given an unsupported action type', () => {
    it('returns initial state, if no state is given', () => {
      expect(fileReducer(undefined, {})).toEqual([]);
    });

    it('returns given state', () => {
      expect(fileReducer({ state: 'is a state' }, {})).toEqual({
        state: 'is a state'
      });
    });
  });

  describe('given the action type @@FIREBASE/update/directories', () => {
    it('returns the action payload.directories', () => {
      expect(
        fileReducer([], {
          type: '@@FIREBASE/update/directories',
          payload: {
            directories: [{ somedir: 'somedir' }]
          }
        })
      ).toEqual([{ somedir: 'somedir' }]);
    });

    it('returns the given state if action payload.directories is falsy', () => {
      expect(
        fileReducer([], {
          type: '@@FIREBASE/update/directories',
          payload: {}
        })
      ).toEqual([]);
    });
  });
});
