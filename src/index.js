import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import ScrollToTop from './common/util/ScrollToTop';

import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import './index.css';

import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { getFirebase, reactReduxFirebase } from 'react-redux-firebase';
import { getFirestore, reduxFirestore } from 'redux-firestore';
import firebase from './config/firebase';

import thunk from 'redux-thunk';

import rootReducer from './reducers';
import ReduxToastr from 'react-redux-toastr';

import { loadEvent } from './actions/eventActions';

const reactReduxFirebaseConfig = {
  userProfile: 'users',
  attachAuthIsReady: true,
  useFireStoreForProfile: true
};

const middlewares = [thunk.withExtraArgument({ getFirebase, getFirestore })];

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(...middlewares),
    reactReduxFirebase(firebase, reactReduxFirebaseConfig),
    reduxFirestore(firebase)
  )
);

console.log(process.env);

store.dispatch(loadEvent());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop>
        <ReduxToastr
          position='bottom-right'
          transitionIn='fadeIn'
          transitionOut='fadeOut'
        />
        <App />
      </ScrollToTop>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
