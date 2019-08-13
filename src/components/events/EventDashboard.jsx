import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {
  createEvent,
  updateEvent,
  deleteEvent
} from '../../actions/eventActions';
import EventList from './EventList/EventList';
import EventLoader from './EventList/EventLoader';

class EventDashboard extends Component {
  handleDeleteEvent = deletedId => {
    this.props.deleteEvent(deletedId);
  };

  render() {
    const { events, loading } = this.props;

    return (
      <Grid>
        <Grid.Column width={10}>
          {loading ? (
            <EventLoader />
          ) : (
            <EventList events={events} deleteEvent={this.handleDeleteEvent} />
          )}
        </Grid.Column>
        <Grid.Column width={6}>
          <h2>Activity Feed</h2>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapState = state => ({
  events: state.events,
  loading: state.async.loading
});

export default connect(
  mapState,
  {
    createEvent,
    updateEvent,
    deleteEvent
  }
)(EventDashboard);
