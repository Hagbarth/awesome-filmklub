import { fileRepo } from './';

function getMocks() {
  const mockSet = jest.fn();
  const mockPush = jest.fn(() => ({ set: mockSet }));
  const mockRef = jest.fn(() => ({ push: mockPush }));
  const mockFbHandler = {
    db: {
      ref: mockRef
    }
  };
  return {
    mockSet,
    mockPush,
    mockRef,
    mockFbHandler
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
        parentDir: 'parentDir'
      });
      expect(mocks.mockRef).toHaveBeenCalledWith('directories/parentDir/files');
    });

    it('calls ref.push', () => {
      const mocks = getMocks();
      fileRepo({ fbHandler: mocks.mockFbHandler }).addFile({});
      expect(mocks.mockPush).toHaveBeenCalled();
    });

    it('calls fbHandler ref.set with options', () => {
      const mocks = getMocks();
      fileRepo({ fbHandler: mocks.mockFbHandler }).addFile({
        parentDir: 'parentDir',
        key: 'some-key'
      });
      expect(mocks.mockSet.mock.calls[0][0].key).toBe('some-key');
      expect(mocks.mockSet.mock.calls[0][0].createdAt).toBeTruthy();
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
            files: {
              somekey: {
                key: 'foo'
              }
            }
          }
        ]);
        done();
      });
      expect(mockRef).toHaveBeenCalledWith('directories');
    });
  });
});
