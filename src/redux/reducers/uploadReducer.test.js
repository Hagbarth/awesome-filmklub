import uploadReducer from './uploadReducer';

describe('redux/reducers/fileReducer', () => {
  describe('given an unsupported action type', () => {
    it('returns initial state, if no state is given', () => {
      expect(uploadReducer(undefined, {})).toEqual([]);
    });

    it('returns given state', () => {
      expect(uploadReducer({ state: 'is a state' }, {})).toEqual({
        state: 'is a state'
      });
    });
  });

  describe('given the action @@FIREBASE/upload/start', () => {
    it('returns an array with files all of progress zero', () => {
      expect(
        uploadReducer([], {
          type: '@@FIREBASE/upload/start',
          payload: { files: [{}] }
        })
      ).toEqual([{ progress: 0 }]);
    });
  });

  describe('given the action @@FIREBASE/upload/done', () => {
    it(
      'returns a new array where the file with the index provided is removed',
      () => {
        expect(
          uploadReducer(['first', 'second', 'third'], {
            type: '@@FIREBASE/upload/done',
            payload: {
              file: {
                fileIndex: 1
              }
            }
          })
        ).toEqual(['first', 'third']);
      }
    );
  });

  describe('given the action @@FIREBASE/upload/progress', () => {
    it(
      'returns a new array where the file with the index provided has progress and key updated',
      () => {
        expect(
          uploadReducer([{ progress: 0 }, { progress: 0 }], {
            type: '@@FIREBASE/upload/progress',
            payload: {
              progress: 40,
              file: {
                fileIndex: 1,
                key: 'some-key'
              }
            }
          })
        ).toEqual([{ progress: 0 }, { progress: 40, key: 'some-key' }]);
      }
    );
  });
});
