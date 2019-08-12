import { LOGIN_USER, LOGOUT_USER } from '../actions/authActions';

const initialState = {
  authenticated: false,
  currentUser: null
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_USER:
      return {
        authenticated: true,
        currentUser: payload.creds.email
      };
    case LOGOUT_USER:
      return {
        authenticated: false,
        currentUser: null
      };
    default:
      return state;
  }
};

export default authReducer;
