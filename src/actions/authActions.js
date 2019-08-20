import { closeModal } from './modalActions';

import { SubmissionError } from 'redux-form';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export const login = creds => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(creds.email, creds.password);

      dispatch(closeModal());
    } catch (error) {
      throw new SubmissionError({
        _error: 'Incorrect email or password'
      });
    }
  };
};

export const registerUser = user => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    try {
      let createdUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password);

      console.log(createdUser);

      await createdUser.user.updateProfile({
        displayName: user.displayName
      });

      let newUser = {
        displayName: user.displayName,
        createdAt: firestore.FieldValue.serverTimestamp()
      };

      await firestore.set(`users/${createdUser.user.uid}`, { ...newUser });

      dispatch(closeModal());
    } catch (error) {
      throw new SubmissionError({
        _error: error.message
      });
    }
  };
};
