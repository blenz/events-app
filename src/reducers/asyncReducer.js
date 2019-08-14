import {
  ASYNC_ACTION_START,
  ASYNC_ACTION_FINISH,
  ASYNC_ACTION_ERROR
} from '../actions/asyncActions';

const initialState = {
  loading: false
};

const asyncReducer = (state = initialState, { type }) => {
  switch (type) {
    case ASYNC_ACTION_START:
      return {
        loading: true
      };
    case ASYNC_ACTION_FINISH:
      return {
        loading: false
      };
    case ASYNC_ACTION_ERROR:
      return {
        loading: false
      };
    default:
      return state;
  }
};

export default asyncReducer;
