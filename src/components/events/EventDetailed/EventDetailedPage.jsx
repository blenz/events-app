import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSidebar from './EventDetailedSidebar';
import { withFirestore } from 'react-redux-firebase';
import { toastr } from 'react-redux-toastr';
import { objectToArray } from '../../../common/util/helpers';

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {};

  const events = state.firestore.ordered.events;
  if (events && events.length > 0) {
    event = events.filter(event => event.id === eventId)[0] || {};
  }

  return {
    event,
    auth: state.firebase.auth
  };
};

class EventDetailedPage extends Component {
  async componentDidMount() {
    const { firestore, match, history } = this.props;

    let event = await firestore.get(`events/${match.params.id}`);

    if (!event.exists) {
      history.push('/events');
      toastr.error('Event does not exist');
    }
  }

  render() {
    const { event, auth } = this.props;

    const attendees =
      event && event.attendees && objectToArray(event.attendees);
    const isHost = event.hostUid === auth.uid;
    const isGoing = attendees && attendees.some(a => a.id === auth.uid);

    return (
      <Grid>
        <Grid.Column width={10}>
          <EventDetailedHeader
            event={event}
            isGoing={isGoing}
            isHost={isHost}
          />
          <EventDetailedInfo event={event} />
          <EventDetailedChat />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventDetailedSidebar attendees={attendees} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default withFirestore(connect(mapState)(EventDetailedPage));
