import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Grid } from 'semantic-ui-react';
import { firestoreConnect } from 'react-redux-firebase';
import UserDetailedHeader from './UserDetailedHeader';
import UserDetailedDescription from './UserDetailedDescription';
import UserDetailedPhotos from './UserDetailedPhotos';
import UserDetailedSideBar from './UserDetailedSideBar';
import UserDetailedEvents from './UserDetailedEvents';

class UserDetailedPage extends Component {
  render() {
    const { profile, photos } = this.props;

    return (
      <Grid>
        <UserDetailedHeader profile={profile} />
        <UserDetailedSideBar />
        <UserDetailedDescription profile={profile} />
        <UserDetailedPhotos photos={photos} />
        <UserDetailedEvents />
      </Grid>
    );
  }
}

export default compose(
  connect(state => ({
    profile: state.firebase.profile,
    auth: state.firebase.auth,
    photos: state.firestore.ordered.photos
  })),
  firestoreConnect(({ auth }) => {
    return [
      {
        collection: 'users',
        doc: auth.uid,
        subcollections: [{ collection: 'photos' }],
        storeAs: 'photos'
      }
    ];
  })
)(UserDetailedPage);
