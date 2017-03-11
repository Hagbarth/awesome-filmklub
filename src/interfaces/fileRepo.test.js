import { fileRepo } from './';

function getMocks() {
  const mockSet = jest.fn(() => Promise.resolve());
  const mockPush = jest.fn(() => ({ set: mockSet }));
  const mockRef = jest.fn(() => ({ push: mockPush }));
  const mockPut = jest.fn();
  const mockChild = jest.fn(() => ({ put: mockPut }));
  const mockStorageRef = jest.fn(() => ({ child: mockChild }));
  const mockFbHandler = {
    db: {
      ref: mockRef
    },
    storage: {
      ref: mockStorageRef
    }
  };
  return {
    mockSet,
    mockPush,
    mockRef,
    mockFbHandler,
    mockPut,
    mockChild,
    mockStorageRef
  };
}

describe('fileRepo', () => {
  describe('addDirectory', () => {
    it('calls fbHandler.db.ref with "directories"', () => {
      const mocks = getMocks();
      fileRepo({ fbHandler: mocks.mockFbHandler }).addDirectory({
        name: 'some-name'
      });
      expect(mocks.mockRef).toHaveBeenCalledWith('directories');
    });

    it('calls ref.push', () => {
      const mocks = getMocks();
      fileRepo({ fbHandler: mocks.mockFbHandler }).addDirectory({
        name: 'some-name'
      });
      expect(mocks.mockPush).toHaveBeenCalled();
    });

    it('calls fbHandler ref.set with options', () => {
      const mocks = getMocks();
      fileRepo({ fbHandler: mocks.mockFbHandler }).addDirectory({
        name: 'some-name'
      });
      expect(mocks.mockSet.mock.calls[0][0].name).toBe('some-name');
      expect(mocks.mockSet.mock.calls[0][0].createdAt).toBeTruthy();
    });
  });

  describe('addFile', () => {
    it('calls fbHandler.db.ref with "directories/parentDir/files"', () => {
      const mocks = getMocks();
      fileRepo({ fbHandler: mocks.mockFbHandler }).addFile({
        parentDir: 'parentDir',
        file: {
          name: 'filename'
        }
      });
      expect(mocks.mockRef).toHaveBeenCalledWith('directories/parentDir/files');
    });

    it('calls ref.push', () => {
      const mocks = getMocks();
      fileRepo({ fbHandler: mocks.mockFbHandler }).addFile({
        parentDir: 'parentDir',
        file: {
          name: 'some-key'
        }
      });
      expect(mocks.mockPush).toHaveBeenCalled();
    });

    it('calls fbHandler ref.set with options', () => {
      const mocks = getMocks();
      fileRepo({ fbHandler: mocks.mockFbHandler }).addFile({
        parentDir: 'parentDir',
        file: {
          name: 'some-key'
        }
      });
      expect(mocks.mockSet.mock.calls[0][0].key).toBe('some-key');
      expect(mocks.mockSet.mock.calls[0][0].createdAt).toBeTruthy();
    });

    it('gets a storage ref', () => {
      const mocks = getMocks();
      fileRepo({ fbHandler: mocks.mockFbHandler }).addFile({
        parentDir: 'parentDir',
        file: {
          name: 'some-key'
        }
      });
      expect(mocks.mockStorageRef).toHaveBeenCalled();
    });

    it('calls child on the storage ref', () => {
      const mocks = getMocks();
      fileRepo({ fbHandler: mocks.mockFbHandler }).addFile({
        parentDir: 'parentDir',
        file: {
          name: 'some-key'
        }
      });
      expect(mocks.mockChild).toHaveBeenCalledWith('parentDir/some-key');
    });

    it('calls put on child', () => {
      const mocks = getMocks();
      const mockPush = jest.fn(() => ({ set: mocks.mockSet, key: 'some-key' }));
      mocks.mockFbHandler.db.ref = jest.fn(() => ({ push: mockPush }));
      fileRepo({ fbHandler: mocks.mockFbHandler }).addFile({
        parentDir: 'parentDir',
        file: {
          name: 'some-key'
        }
      });
      expect(mocks.mockPut).toHaveBeenCalledWith(
        {
          name: 'some-key'
        },
        {
          fileIndex: 0,
          key: 'some-key'
        }
      );
      fileRepo({ fbHandler: mocks.mockFbHandler }).addFile({
        parentDir: 'parentDir',
        file: {
          name: 'some-key'
        },
        fileIndex: 100
      });
      expect(mocks.mockPut).toHaveBeenCalledWith(
        {
          name: 'some-key'
        },
        {
          fileIndex: 100,
          key: 'some-key'
        }
      );
    });
  });

  describe('subscribeDirectories', () => {
    it('calls fbHandler.db.ref with "directories"', () => {
      const mocks = getMocks();
      const mockRef = jest.fn(() => ({
        on: jest.fn()
      }));
      mocks.mockFbHandler.db.ref = mockRef;
      fileRepo({ fbHandler: mocks.mockFbHandler }).subscribeDirectories();
      expect(mockRef).toHaveBeenCalledWith('directories');
    });

    it('calls the callback with an array of directories', done => {
      const mockRef = jest.fn(() => ({
        on: jest.fn((val, cb) => {
          const dirs = {
            val: () => ({
              somekey: {
                files: {
                  somekey: {
                    key: 'foo'
                  }
                }
              }
            })
          };
          cb(dirs);
        })
      }));

      fileRepo({
        fbHandler: { db: { ref: mockRef } }
      }).subscribeDirectories(dirs => {
        expect(dirs).toEqual([
          {
            id: 'somekey',
            files: [
              {
                id: 'somekey',
                key: 'foo'
              }
            ]
          }
        ]);
        done();
      });
      expect(mockRef).toHaveBeenCalledWith('directories');
    });

    it('doesn not fail when a dir does not have any files', done => {
      const mockRef = jest.fn(() => ({
        on: jest.fn((val, cb) => {
          const dirs = {
            val: () => ({
              somekey: {}
            })
          };
          cb(dirs);
        })
      }));

      fileRepo({
        fbHandler: { db: { ref: mockRef } }
      }).subscribeDirectories(dirs => {
        expect(dirs).toEqual([
          {
            id: 'somekey',
            files: []
          }
        ]);
        done();
      });
      expect(mockRef).toHaveBeenCalledWith('directories');
    });
  });
});
