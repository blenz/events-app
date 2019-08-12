export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export const login = creds => {
  return {
    type: LOGIN_USER,
    payload: {
      creds
    }
  };
};

export const logout = event => {
  return {
    type: LOGOUT_USER
  };
};
