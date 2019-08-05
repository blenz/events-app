import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import eventReducer from './eventReducer';
import modalReducer from './modalReducer';

const rootReducer = combineReducers({
  form: FormReducer,
  events: eventReducer,
  modals: modalReducer
});

export default rootReducer;
