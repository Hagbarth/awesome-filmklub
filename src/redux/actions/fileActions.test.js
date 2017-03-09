import fileActions from './fileActions';

describe('redux/actions/fileActions', () => {
  describe('subscribeDirectories', () => {
    it(
      'calls fileRepo.subscribeDirectories and then dispatch with a type @@FIREBASE/update/directories and the directories from the response',
      done => {
        const fileRepo = {
          subscribeDirectories: jest.fn(cb => cb({
            dir: 'some-dir'
          }))
        };
        const dispatch = jest.fn(() => {
          expect(dispatch).toHaveBeenCalledWith({
            type: '@@FIREBASE/update/directories',
            payload: {
              directories: {
                dir: 'some-dir'
              }
            }
          });
          done();
        });
        fileActions({ fileRepo }).subscribeDirectories()(dispatch);
      }
    );
  });

  describe('addDirectory', () => {
    it('calls fileRepo.addDirectory with the name', () => {
      const fileRepo = {
        addDirectory: jest.fn()
      };
      fileActions({ fileRepo }).addDirectory('some-name')();
      expect(fileRepo.addDirectory).toHaveBeenCalledWith({ name: 'some-name' });
    });
  });
});
