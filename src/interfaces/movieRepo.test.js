import { movieRepo } from './';

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

describe('movieRepo', () => {
  describe('addMovie', () => {
    it('calls fbHandler.db.ref with "movies"', () => {
      const mocks = getMocks();
      movieRepo({ fbHandler: mocks.mockFbHandler }).addMovie({
        name: 'some-name'
      });
      expect(mocks.mockRef).toHaveBeenCalledWith('movies');
    });

    it('calls ref.push', () => {
      const mocks = getMocks();
      movieRepo({ fbHandler: mocks.mockFbHandler }).addMovie({
        title: 'some-name'
      });
      expect(mocks.mockPush).toHaveBeenCalled();
    });

    it('calls fbHandler ref.set with options', () => {
      const mocks = getMocks();
      movieRepo({ fbHandler: mocks.mockFbHandler }).addMovie({
        title: 'some-name'
      });
      expect(mocks.mockSet.mock.calls[0][0].title).toBe('some-name');
      expect(mocks.mockSet.mock.calls[0][0].createdAt).toBeTruthy();
    });
  });
});
