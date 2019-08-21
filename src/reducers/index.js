import { combineReducers } from 'redux';

import { reducer as FormReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';

import eventReducer from './eventReducer';
import modalReducer from './modalReducer';
import asyncReducer from './asyncReducer';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
  form: FormReducer,
  events: eventReducer,
  modals: modalReducer,
  async: asyncReducer,
  toastr: toastrReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

export default rootReducer;
