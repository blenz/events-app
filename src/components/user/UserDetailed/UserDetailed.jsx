import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Grid } from 'semantic-ui-react';
import { firebaseConnect } from 'react-redux-firebase';
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

const mapState = state => ({
  profile: state.firebase.profile,
  photos: state.firestore.ordered
});

export default compose(
  connect(mapState),
  firebaseConnect()
)(UserDetailedPage);
