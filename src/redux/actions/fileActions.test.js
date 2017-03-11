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

  describe('uploadFiles', () => {
    it('calls fileRepo.addFile for every file', () => {
      const mockDispatch = jest.fn();
      const mockOn = jest.fn();
      const fileRepo = {
        addFile: jest.fn(() => ({ on: mockOn }))
      };
      fileActions({ fileRepo }).uploadFiles('some-dir', [
        {
          name: 'file-name'
        },
        {
          name: 'another-file-name'
        }
      ])(mockDispatch);
      expect(fileRepo.addFile).toHaveBeenCalledWith({
        parentDir: 'some-dir',
        file: {
          name: 'file-name'
        },
        fileIndex: 0
      });
      expect(fileRepo.addFile).toHaveBeenCalledWith({
        parentDir: 'some-dir',
        file: {
          name: 'another-file-name'
        },
        fileIndex: 1
      });
    });

    it('calls dispatch with start', () => {
      const mockDispatch = jest.fn();
      const mockOn = jest.fn();
      const fileRepo = {
        addFile: jest.fn(() => ({ on: mockOn }))
      };
      fileActions({ fileRepo }).uploadFiles('some-dir', [
        {
          name: 'file-name'
        },
        {
          name: 'another-file-name'
        }
      ])(mockDispatch);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: '@@FIREBASE/upload/start',
        payload: {
          files: [
            {
              name: 'file-name'
            },
            {
              name: 'another-file-name'
            }
          ]
        }
      });
    });

    it('calls dispatch with progress', done => {
      const mockDispatch = jest.fn();
      const mockOn = jest.fn((str, cb) => {
        cb({
          bytesTransferred: 20,
          totalBytes: 100,
          metadata: 'file-metadata'
        });
        expect(mockDispatch).toHaveBeenCalledWith({
          type: '@@FIREBASE/upload/progress',
          payload: {
            progress: 20,
            file: 'file-metadata'
          }
        });
        done();
      });
      const fileRepo = {
        addFile: jest.fn(() => ({ on: mockOn }))
      };
      fileActions({ fileRepo }).uploadFiles('some-dir', [
        {
          name: 'file-name'
        },
        {
          name: 'another-file-name'
        }
      ])(mockDispatch);
    });

    it('calls dispatch with done', done => {
      const mockDispatch = jest.fn();
      const mockOn = jest.fn((str, cb) => {
        cb({
          bytesTransferred: 100,
          totalBytes: 100,
          metadata: 'file-metadata'
        });
        expect(mockDispatch).toHaveBeenCalledWith({
          type: '@@FIREBASE/upload/done',
          payload: {
            progress: 100,
            file: 'file-metadata'
          }
        });
        done();
      });
      const fileRepo = {
        addFile: jest.fn(() => ({ on: mockOn }))
      };
      fileActions({ fileRepo }).uploadFiles('some-dir', [
        {
          name: 'file-name'
        },
        {
          name: 'another-file-name'
        }
      ])(mockDispatch);
    });
  });
});
