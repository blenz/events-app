import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from './asyncActions';
import { fetchSampleData } from '../data/mockApi';

export const CREATE_EVENT = 'CREATE_EVENT';
export const UPDATE_EVENT = 'UPDATE_EVENT';
export const DELETE_EVENT = 'DELETE_EVENT';
export const FETCH_EVENTS = 'FETCH_EVENT';

export const createEvent = event => {
  return {
    type: CREATE_EVENT,
    payload: {
      event
    }
  };
};

export const updateEvent = event => {
  return {
    type: UPDATE_EVENT,
    payload: {
      event
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
