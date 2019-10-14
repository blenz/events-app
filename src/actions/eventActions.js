import { asyncActionStart, asyncActionFinish, asyncActionError } from './asyncActions';
import { fetchSampleData } from '../data/mockApi';
import { toastr } from 'react-redux-toastr';
import { createNewEvent } from '../common/util/helpers';

export const CREATE_EVENT = 'CREATE_EVENT';
export const UPDATE_EVENT = 'UPDATE_EVENT';
export const DELETE_EVENT = 'DELETE_EVENT';
export const FETCH_EVENTS = 'FETCH_EVENT';

export const createEvent = (event) => {
	return async (dispatch, getState, { getFirestore, getFirebase }) => {

		const firestore = getFirestore();
		const firebase = getFirebase();
		const user = firebase.auth().currentUser;

		const photoURL = getState().firebase.profile.photoURL;
		const newEvent = createNewEvent(user, photoURL, event);

		try {

			// create the event
			let createdEvent = await firestore.add('events', newEvent);

			// add host to event
			await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`,
				{
					eventId: createdEvent.id,
					userUid: user.uid,
					eventDate: event.date,
					host: true
				}
			);

			toastr.success('Success', 'Event created');

			return createdEvent;

		} catch (error) {
			toastr.error('Oops', 'Error creating event');
		}
	};
};

export const updateEvent = (event) => {
	return async (dispatch, getState, { getFirestore }) => {

		const firestore = getFirestore();

		try {
			await firestore.update(`events/${event.id}`, event);
			toastr.success('Success', 'Event updated');
		} catch (error) {
			toastr.error('Oops', 'Error updating event');
		}
	};
};

export const deleteEvent = (eventId) => {
	return {
		type: DELETE_EVENT,
		payload: {
			eventId
		}
	};
};

export const loadEvent = () => {
	return async (dispatch) => {
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
