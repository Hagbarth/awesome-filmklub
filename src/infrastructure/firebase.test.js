import { firebase } from './';

describe('interfaces/firebase', () => {
  describe('db', () => {
    describe('given that ref is called with a path', () => {
      it('calls the firebase database.ref with the path', () => {
        const mockRef = jest.fn();
        const mockDb = jest.fn(() => ({
          ref: mockRef
        }));
        const mockFb = {
          database: mockDb,
          storage: jest.fn()
        };
        firebase(mockFb).db.ref('some-ref');
        expect(mockRef).toHaveBeenCalledWith('some-ref');
      });
    });
  });

  describe('storage', () => {
    describe('given that ref is called', () => {
      it('calls the firebase storage.ref', () => {
        const mockRef = jest.fn();
        const mockStorage = jest.fn(() => ({
          ref: mockRef
        }));
        const mockFb = {
          database: jest.fn(),
          storage: mockStorage
        };
        firebase(mockFb).storage.ref();
        expect(mockRef).toHaveBeenCalled();
      });
    });
  });
});
