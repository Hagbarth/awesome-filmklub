import { configureStore } from './create';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

jest.mock('redux', () => {
  return {
    createStore: jest.fn(() => 'returned from create store'),
    applyMiddleware: jest.fn(c => c)
  };
});

jest.mock('redux-thunk', () => 'redux-thunk');

jest.mock('./reducers', () => 'root-reducer');

describe('redux/create', () => {
  describe('configureStore', () => {
    it('calls applyMiddleware with thunk', () => {
      configureStore();
      expect(applyMiddleware).toHaveBeenCalledWith('redux-thunk');
    });

    it('returns whatever create store returns', () => {
      expect(configureStore()).toBe('returned from create store');
    });
  });
});
