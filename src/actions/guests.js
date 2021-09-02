import { logErrors, clearErrors } from './errors';

// Synchronous Action Creators

export const addGuest = guest => ({
	type: 'ADD_GUEST',
	guest,
});

export const showGuest = guest => ({
	type: 'SHOW_GUEST',
	guest,
});

export const updateGuest = guest => ({
	type: 'UPDATE_GUEST',
	guest,
});

export const selectGuest = guestId => ({
	type: 'SELECT_GUEST',
	guestId,
});

export const unselectGuest = guestId => ({
	type: 'UNSELECT_GUEST',
	guestId,
});

export const checkForIssues = affectedGuests => ({
	type: 'CHECK_FOR_ISSUES',
	affectedGuests,
});

export const clearNewlyAffectedGuests = () => ({
	type: 'CLEAR_NEWLY_AFFECTED_GUESTS',
});

// Asynchronous Action Creators

const baseUrl = 'http://localhost:3000/api/v1';

export const createGuest = (newGuest, eventId) =>
	dispatch => {
		dispatch(clearErrors());
		return fetch(`${baseUrl}/events/${eventId}/guests`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
			body: JSON.stringify(newGuest),
		})
			.then(res => res.json())
			.then(savedGuest => {
				if (savedGuest.errors) {
					dispatch(logErrors(savedGuest.errors));
				} else {
					dispatch(addGuest(savedGuest));
				}
			})
			.catch(console.log);
	};

export const editGuest = (id, changes) =>
	dispatch =>
		fetch(`${baseUrl}/guests/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
			body: JSON.stringify(changes),
		})
			.then(res => res.json())
			.then(json => {
				if (json.errors) {
					dispatch(logErrors(json.errors));
				}
			})
			.catch(console.log);

export const deleteGuest = id =>
	dispatch =>
		fetch(`${baseUrl}/guests/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
		})
			.then(res => res.json())
			.then(json => {
				if (json.errors) {
					dispatch(logErrors(json.errors));
				}
			})
			.catch(console.log);
