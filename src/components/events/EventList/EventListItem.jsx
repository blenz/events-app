import React, { Component } from 'react';
import { Segment, Item, Icon, List, Button, Label } from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

class EventListItem extends Component {
  render() {
    const { event } = this.props;
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size='tiny' circular src={event.hostPhotoURL} />
              <Item.Content>
                <Item.Header as='a'>{event.title}</Item.Header>
                <Item.Description>Hosted by {event.hostedBy}</Item.Description>
                {event.cancelled &&
                  <Label style={{ top: '-40px' }} ribbon='right' color='red' content='Event Cancelled'></Label>
                }
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name='marker' /> {event.venue}
            <br />
            <Icon name='clock' />
            {format(event.date.toDate(), 'EEEE LLL do')} at{' '}
            {format(event.date.toDate(), 'h:mm a')}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {event.attendees &&
              Object.values(event.attendees).map((attendee, i) => (
                <EventListAttendee key={i} attendee={attendee} />
              ))}
          </List>
        </Segment>
        <Segment clearing>
          <span>{event.description}</span>
          <Button
            as={Link}
            to={`/events/${event.id}`}
            color='teal'
            floated='right'
            content='View'
          />
        </Segment>
      </Segment.Group>
    );
  }
}

export default EventListItem;
