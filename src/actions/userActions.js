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

export const deletePhoto = photo => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;

    try {
      await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
      await firestore.delete({
        collection: 'users',
        doc: user.uid,
        subcollections: [{ collection: 'photos', doc: photo.id }]
      });
      toastr.success('Success', 'Image was deleted');
    } catch (error) {
      toastr.error('Error', 'There was an error deleting your image');
    }
  };
};

export const setMainPhoto = photo => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();

    try {
      return firebase.updateProfile({ photoURL: photo.url });
    } catch (error) {
      toastr.error('Error', 'There was an error deleting your image');
    }
  };
};
