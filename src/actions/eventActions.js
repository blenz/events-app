import { asyncActionStart, asyncActionFinish, asyncActionError } from './asyncActions';
import { fetchSampleData } from '../data/mockApi';
import { toastr } from 'react-redux-toastr';
import { createNewEvent } from '../common/util/helpers';

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

export const cancelToggle = (cancelled, eventId) => {
	return async (dispatch, getState, { getFirestore }) => {

		const firestore = getFirestore();
		const message = cancelled
			? 'Are you sure you want to cancel the event?'
			: 'This will reactivate the event, are you sure?';

		try {

			toastr.confirm(message, {
				onOk: async () => {
					await firestore.update(`events/${eventId}`, { cancelled: cancelled });
				}
			})

		} catch (error) {
			console.log(error);
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
