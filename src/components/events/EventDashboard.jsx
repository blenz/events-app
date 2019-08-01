import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import EventList from './EventList/EventList';
import { connect } from 'react-redux';
import {
  createEvent,
  updateEvent,
  deleteEvent
} from '../../actions/eventActions';

const mapState = state => ({
  events: state.events
});

const actions = {
  createEvent,
  updateEvent,
  deleteEvent
};

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
          <h2>Activity Feed</h2>
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapState,
  actions
)(EventDashboard);
