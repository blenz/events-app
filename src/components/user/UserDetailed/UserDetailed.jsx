import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Grid } from 'semantic-ui-react';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import UserDetailedHeader from './UserDetailedHeader';
import UserDetailedDescription from './UserDetailedDescription';
import UserDetailedPhotos from './UserDetailedPhotos';
import UserDetailedSideBar from './UserDetailedSideBar';
import UserDetailedEvents from './UserDetailedEvents';
import { userDetailedQuery } from '../userQueries';

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

const mapState = (state, ownProps) => {

  let userUid = null;
  let profile = {};

  if (ownProps.match.params.id === state.firebase.auth.uid) {
    profile = state.firebase.profile;
  } else {
    profile = isEmpty(state.firebase.ordered.profile)
      && state.firebase.ordered.profile[0];

    userUid = ownProps.match.params.id;
  }

  return {
    profile,
    userUid,
    auth: state.firebase.auth,
    photos: state.firestore.ordered.photos
  }
}

export default compose(
  connect(mapState),
  firestoreConnect((auth, userUid) => userDetailedQuery(auth, userUid))
)(UserDetailedPage);
