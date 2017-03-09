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
          database: mockDb
        };
        firebase(mockFb).db.ref('some-ref');
        expect(mockRef).toHaveBeenCalledWith('some-ref');
      });
    });
  });
});
