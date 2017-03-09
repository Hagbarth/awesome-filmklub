import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { configureStore } from './redux/create';
import { Provider, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as infrastructure from './infrastructure/';
import * as interfaces from './interfaces/';
import * as firebase from 'firebase';
import fileActions from './redux/actions/fileActions';
import firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import './index.css';

import App from './App';
import Files from './containers/Files';
import Movies from './containers/Movies';
import Parties from './containers/Parties';
import Tuesdays from './containers/Tuesdays';

const store = configureStore();

const fb = firebase.initializeApp({
  apiKey: 'AIzaSyDIpGOs_dHi6eblPRV9sO6JdOS4jgVmu8g',
  authDomain: 'awesome-filmklub-35b71.firebaseapp.com',
  databaseURL: 'https://awesome-filmklub-35b71.firebaseio.com',
  storageBucket: 'awesome-filmklub-35b71.appspot.com',
  messagingSenderId: '657446388290'
});
const ui = new firebaseui.auth.AuthUI(firebase.auth());

// Setup infrastructure
const fbHandler = infrastructure.firebase(fb);

// Setup interfaces
const fileRepo = interfaces.fileRepo({ fbHandler });

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    ReactDOM.render(
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={App}>
            <Route
              path="files"
              component={connect(
                state => ({
                  directories: state.fileReducer
                }),
                dispatch => ({
                  fileActions: bindActionCreators(
                    fileActions({ fileRepo }),
                    dispatch
                  )
                })
              )(Files)}
            />
            <Route path="movies" component={Movies} />
            <Route path="parties" component={Parties} />
            <Route path="tuesdays" component={Tuesdays} />
          </Route>
        </Router>
      </Provider>,
      document.getElementById('root')
    );
  } else {
    ui.start('#root', {
      signInSuccessUrl: '/',
      signInOptions: [firebase.auth.FacebookAuthProvider.PROVIDER_ID]
    });
  }
});
