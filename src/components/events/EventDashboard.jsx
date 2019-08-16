import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {
  createEvent,
  updateEvent,
  deleteEvent
} from '../../actions/eventActions';
import EventList from './EventList/EventList';
import EventActivity from './EventActivity/EventActivity';
import { firestoreConnect } from 'react-redux-firebase';

class EventDashboard extends Component {
  handleDeleteEvent = deletedId => {
    this.props.deleteEvent(deletedId);
  };

  render() {
    const { events } = this.props;

    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList events={events} deleteEvent={this.handleDeleteEvent} />
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
    updateEvent,
    deleteEvent
  }
)(firestoreConnect([{ collection: 'events' }])(EventDashboard));
