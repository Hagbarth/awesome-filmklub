import { combineReducers } from 'redux';
import fileReducer from './fileReducer';
import uploadReducer from './uploadReducer';

export default combineReducers({
  fileReducer,
  uploadReducer
});
