import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Segment, Header, Divider, Grid, Button } from 'semantic-ui-react';
import DropzoneInput from './DropzoneInput';
import CropperInput from './CropperInput';
import {
  uploadProfileImage,
  deletePhoto,
  setMainPhoto
} from '../../../../actions/userActions';
import UserPhotos from './UserPhotos';

const PhotosPage = ({
  uploadProfileImage,
  loading,
  photos,
  profile,
  deletePhoto,
  setMainPhoto
}) => {
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);

  const handleUploadImage = async () => {
    await uploadProfileImage(image, files[0].name);
    handleCancelCrop();
  };

  const handleCancelCrop = () => {
    setFiles([]);
    setImage(null);
  };

  const handleDeletePhoto = async photo => {
    await deletePhoto(photo);
  };

  const handleSetMainPhoto = async photo => {
    await setMainPhoto(photo);
  };

  useEffect(() => {
    return () => {
      files.forEach(file => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <Segment>
      <Header dividing size='large' content='Your Photos' />
      <Grid>
        <Grid.Row />
        <Grid.Column width={4}>
          <Header color='teal' sub content='Step 1 - Add Photo' />
          <DropzoneInput setFiles={setFiles} />
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub color='teal' content='Step 2 - Resize image' />
          {files.length > 0 && (
            <CropperInput setImage={setImage} imagePreview={files[0].preview} />
          )}
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub color='teal' content='Step 3 - Preview & Upload' />
          {files.length > 0 && (
            <Fragment>
              <div
                className='img-preview'
                style={{
                  minHeight: '200px',
                  minWidth: '200px',
                  overflow: 'hidden'
                }}
              ></div>
              <Button.Group>
                <Button
                  onClick={handleUploadImage}
                  style={{ width: '100px' }}
                  positive
                  icon='check'
                  loading={loading}
                ></Button>
                <Button
                  onClick={handleCancelCrop}
                  style={{ width: '100px' }}
                  icon='close'
                ></Button>
              </Button.Group>
            </Fragment>
          )}
        </Grid.Column>
      </Grid>
      <UserPhotos
        photos={photos}
        profile={profile}
        deletePhoto={handleDeletePhoto}
        setMainPhoto={handleSetMainPhoto}
      />
      <Divider />
    </Segment>
  );
};

const mapState = state => ({
  loading: state.async.loading,
  auth: state.firebase.auth.isLoaded && state.firebase.auth,
  profile: state.firebase.profile,
  photos: state.firestore.ordered.photos
});

const actions = {
  uploadProfileImage,
  deletePhoto,
  setMainPhoto
};

const query = ({ auth }) => {
  return [
    {
      collection: 'users',
      doc: auth.uid,
      subcollections: [{ collection: 'photos' }],
      storeAs: 'photos'
    }
  ];
};

export default compose(
  connect(
    mapState,
    actions
  ),
  firestoreConnect(auth => query(auth))
)(PhotosPage);
