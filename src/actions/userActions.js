import { toastr } from 'react-redux-toastr';
import cuid from 'cuid';
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from './asyncActions';

export const updateProfile = user => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const { isLoaded, isEmpty, ...updatedUser } = user;
    try {
      await firebase.updateProfile(updatedUser);
      toastr.success('Success', 'Your profile has been updated');
    } catch (error) {
      toastr.error('Error', 'There was an error updating your profile');
    }
  };
};

export const uploadProfileImage = (file, fileName) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const imageName = cuid();

    const firebase = getFirebase();
    const firestore = getFirestore();

    const user = firebase.auth().currentUser;
    const path = `${user.uid}/user_images`;
    const options = {
      name: imageName
    };

    try {
      dispatch(asyncActionStart());

      let uploadedFile = await firebase.uploadFile(path, file, null, options);
      let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
      let userDoc = await firestore.get(`users/${user.uid}`);

      if (!userDoc.data().photoURL) {
        await firebase.updateProfile({ photoURL: downloadURL });
        await user.updateProfile({ photoURL: downloadURL });
      }

      await firestore.add(
        {
          collection: 'users',
          doc: user.uid,
          subcollections: [{ collection: 'photos' }]
        },
        {
          name: imageName,
          url: downloadURL
        }
      );

      dispatch(asyncActionFinish());

      toastr.success('Success', 'Your profile has been updated');
    } catch (error) {
      toastr.error('Error', 'There was an error uploading your profile image');
      dispatch(asyncActionError());
    }
  };
};
