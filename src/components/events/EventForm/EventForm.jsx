/*global google*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { createEvent, updateEvent, cancelToggle } from '../../../actions/eventActions';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan
} from 'revalidate';
import TextInput from '../../../common/form/TextInput';
import SelectInput from '../../../common/form/SelectInput';
import DateInput from '../../../common/form/DateInput';
import TextArea from '../../../common/form/TextArea';
import PlaceInput from '../../../common/form/PlaceInput';
import { withFirestore } from 'react-redux-firebase';

const category = [
  { key: 'drinks', text: 'Drinks', value: 'drinks' },
  { key: 'culture', text: 'Culture', value: 'culture' },
  { key: 'film', text: 'Film', value: 'film' },
  { key: 'food', text: 'Food', value: 'food' },
  { key: 'music', text: 'Music', value: 'music' },
  { key: 'travel', text: 'Travel', value: 'travel' }
];

const validate = combineValidators({
  title: isRequired({ message: 'The even title is required' }),
  category: isRequired({ message: 'The even category is required' }),
  description: composeValidators(
    isRequired({ message: 'The even category is required' }),
    hasLengthGreaterThan(4)({
      message: 'Description needs to be greater than 5 characters'
    })
  )(),
  city: isRequired('City'),
  venue: isRequired('Venue'),
  date: isRequired('Date')
});

class EventForm extends Component {

  state = {
    cityLatLng: {},
    venueLatLng: {}
  };

  async componentDidMount() {

    const { firestore, match } = this.props;
    await firestore.setListener(`events/${match.params.id}`);
  }

  async componentWillUnmount() {

    const { firestore, match } = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }

  onFormSubmit = async values => {
    values.venueLatLng = this.state.venueLatLng;

    try {

      // updating event
      if (this.props.initialValues.id) {

        // check if we have venue coords
        // if not, use the coords from our redux store
        if (Object.keys(values.venueLatLng).length === 0) {
          values.venueLatLng = this.props.event.venueLatLng;
        }

        this.props.updateEvent(values);
        this.props.history.push(`/events/${this.props.initialValues.id}`);
        return;
      }

      // creating a new event
      let createdEvent = await this.props.createEvent(values);
      this.props.history.push(`/events/${createdEvent.id}`);

    } catch (e) {
      console.log(e);
    }
  };

  handleCitySelect = selectedCity => {
    geocodeByAddress(selectedCity)
      .then(results => getLatLng(results[0]))
      .then(latlng => this.setState({ cityLatLng: latlng }))
      .then(() => this.props.change('city', selectedCity));
  };

  handleVenueSelect = selectedVenue => {
    geocodeByAddress(selectedVenue)
      .then(results => getLatLng(results[0]))
      .then(latlng => this.setState({ venueLatLng: latlng }))
      .then(() => this.props.change('venue', selectedVenue));
  };

  render() {

    const {
      history,
      initialValues,
      invalid,
      submitting,
      pristine,
      event,
      cancelToggle
    } = this.props;

    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Header sub color='teal' content='Event Details' />
            <Form
              onSubmit={this.props.handleSubmit(this.onFormSubmit)}
              autoComplete='off'
            >
              <Field
                name='title'
                component={TextInput}
                placeholder='Event Title'
              />
              <Field
                name='category'
                component={SelectInput}
                placeholder='Event Category'
                options={category}
                multiple={true}
              />
              <Field
                name='description'
                component={TextArea}
                rows={3}
                placeholder='Event Description'
              />
              <Header sub color='teal' content='Event Location Details' />
              <Field
                name='city'
                component={PlaceInput}
                placeholder='Event City'
                onSelect={this.handleCitySelect}
                options={{ types: ['(cities)'] }}
              />
              <Field
                name='venue'
                component={PlaceInput}
                placeholder='Event Venue'
                onSelect={this.handleVenueSelect}
                options={{
                  location: new google.maps.LatLng(this.state.cityLatLng),
                  radius: 1000,
                  types: ['establishment']
                }}
              />
              <Field
                name='date'
                component={DateInput}
                dateFormat='dd LLL yyyy h:mm a'
                showTimeSelect
                timeFormat='h:mm'
                placeholder='Event Date'
              />

              <Button
                disabled={invalid || submitting || pristine}
                positive
                type='submit'
              >
                Submit
              </Button>
              <Button
                onClick={
                  initialValues.id
                    ? () => history.push(`/events/${initialValues.id}`)
                    : () => history.push('/events')
                }
                type='button'
              >
                Cancel
              </Button>
              {event.id
                && <Button
                  type='button'
                  color={event.cancelled ? 'green' : 'red'}
                  floated='right'
                  content={event.cancelled ? 'Reactivate event' : 'Cancel Event'}
                  onClick={() => cancelToggle(!event.cancelled, event.id)}
                />
              }
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {};

  const events = state.firestore.ordered.events;
  if (events && events.length > 0) {
    event = events.filter(event =>
      event.id === eventId
    )[0] || {};
  }

  return {
    initialValues: event,
    event
  };
};

export default withFirestore(connect(
  mapState,
  {
    createEvent,
    updateEvent,
    cancelToggle
  }
)(reduxForm({ form: 'eventForm', validate, enableReinitialize: true })(EventForm)));
