import { combineReducers } from 'redux';
import fileReducer from './fileReducer';
import uploadReducer from './uploadReducer';
import movieReducer from './movieReducer';

export default combineReducers({
  fileReducer,
  uploadReducer,
  movieReducer
});
