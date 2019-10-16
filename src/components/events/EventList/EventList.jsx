import React, { Component } from 'react';
import { connect } from 'react-redux';
import EventListItem from './EventListItem';
import EventListLoader from './EventListLoader';

class EventList extends Component {
  render() {
    const { events, loading } = this.props;
    return (
      <div>
        {loading ? (
          <EventListLoader />
        ) : (
            events &&
            events.map(event => (
              <EventListItem
                key={event.id}
                event={event}
              />
            ))
          )}
      </div>
    );
  }
}

const mapState = state => ({
  loading: state.async.loading
});

export default connect(
  mapState,
  null
)(EventList);
