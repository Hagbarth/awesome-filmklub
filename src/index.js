import 'firebaseui/dist/firebaseui.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { configureStore } from './redux/create';
import { Provider } from 'react-redux';
import firebaseui from 'firebaseui';
import * as firebase from 'firebase';

import * as infrastructure from './infrastructure/';
import * as interfaces from './interfaces/';
import * as actions from './redux/actions/';

import App from './App';
import { connectFiles } from './containers/Files';
import { connectMovies } from './containers/Movies';
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
const omdb = infrastructure.omdb({ host: 'http://www.omdbapi.com/', fetch });

// Setup interfaces
const fileRepo = interfaces.fileRepo({ fbHandler });
const movieGetter = interfaces.movieGetter({ omdb });

// Setup actions
const fileActions = actions.fileActions({ fileRepo });
const movieActions = actions.movieActions({ movieGetter });

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    ReactDOM.render(
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={App}>
            <Route path="files" component={connectFiles({ fileActions })} />
            <Route path="movies" component={connectMovies({ movieActions })} />
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
