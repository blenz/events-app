import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import eventReducer from './eventReducer';
import modalReducer from './modalReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  form: FormReducer,
  events: eventReducer,
  modals: modalReducer,
  auth: authReducer
});

export default rootReducer;
