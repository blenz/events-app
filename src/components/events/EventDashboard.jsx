import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {
  createEvent,
  updateEvent
} from '../../actions/eventActions';
import EventList from './EventList/EventList';
import EventActivity from './EventActivity/EventActivity';
import { firestoreConnect } from 'react-redux-firebase';

class EventDashboard extends Component {
  render() {
    const { events } = this.props;

    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList events={events} />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventActivity />
        </Grid.Column>
      </Grid>
    );
  }
}

const mapState = state => ({
  events: state.firestore.ordered.events
});

export default connect(
  mapState,
  {
    createEvent,
    updateEvent
  }
)(firestoreConnect([{ collection: 'events' }])(EventDashboard));
