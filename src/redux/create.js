import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistState } from 'redux-devtools';
import rootReducer from './reducers';

export function configureStore(initialState = {}) {
  const enhancer = compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
    persistState(window.location.href.match(/[?&]debug_session=([^&#]+)\b/))
  );
  return createStore(rootReducer, initialState, enhancer);
}
