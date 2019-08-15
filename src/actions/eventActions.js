import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from './asyncActions';
import { fetchSampleData } from '../data/mockApi';
import { toastr } from 'react-redux-toastr';

export const CREATE_EVENT = 'CREATE_EVENT';
export const UPDATE_EVENT = 'UPDATE_EVENT';
export const DELETE_EVENT = 'DELETE_EVENT';
export const FETCH_EVENTS = 'FETCH_EVENT';

export const createEvent = event => {
  return async dispatch => {
    try {
      dispatch({
        type: CREATE_EVENT,
        payload: {
          event
        }
      });

      toastr.success('Success', 'Event created');
    } catch (error) {
      toastr.error('Oops', 'Error creating event');
    }
  };
};

export const updateEvent = event => {
  return async dispatch => {
    try {
      dispatch({
        type: UPDATE_EVENT,
        payload: {
          event
        }
      });

      toastr.success('Success', 'Event updated');
    } catch (error) {
      toastr.error('Oops', 'Error updating event');
    }
  };
};

export const deleteEvent = eventId => {
  return {
    type: DELETE_EVENT,
    payload: {
      eventId
    }
  };
};

export const loadEvent = () => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      const events = await fetchSampleData();
      dispatch({ type: FETCH_EVENTS, payload: { events } });
      dispatch(asyncActionFinish());
    } catch (err) {
      console.log(err);
      dispatch(asyncActionError());
    }
  };
};
