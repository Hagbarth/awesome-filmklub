import { combineReducers } from 'redux';

jest.mock('redux', () => ({
  combineReducers: jest.fn()
}));
jest.mock('./fileReducer', () => 'fileReducer');

describe('redux/reducers/index', () => {
  it('calls combineReducers with the fileReducer in an object', () => {
    require('./');
    expect(combineReducers).toHaveBeenCalledWith({
      fileReducer: 'fileReducer'
    });
  });
});
