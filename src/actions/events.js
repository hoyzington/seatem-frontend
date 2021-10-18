import { logErrors, clearErrors } from './errors';

// Synchronous Action Creators

export const addEvent = event => ({
  type: 'ADD_EVENT',
  event,
});

export const showEvent = eventId => ({
  type: 'SHOW_EVENT',
  eventId,
});

export const updateEvent = (id, changes) => ({
  type: 'UPDATE_EVENT',
  id,
  changes,
});

export const setSavedEvents = events => ({
  type: 'SET_SAVED_EVENTS',
  events,
});

export const resetCurrentEvent = () => ({
  type: 'RESET_CURRENT_EVENT',
});

export const clearEvents = () => ({
  type: 'CLEAR_EVENTS',
});

export const destroyEvent = id => ({
  type: 'DESTROY_EVENT',
  id,
});

// Asynchronous Action Creators

const baseUrl = 'http://localhost:3000/api/v1';

export const createEvent = (newEvent, userId) =>
  dispatch => {
    dispatch(clearErrors());
    return fetch(`${baseUrl}/users/${userId}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(newEvent),
    })
      .then(res => res.json())
      .then(createdEvent => {
        if (createdEvent.errors) {
          dispatch(logErrors(createdEvent.errors));
        } else {
          dispatch(addEvent(createdEvent));
        }
      })
      .catch(console.log);
  };

export const editEvent = (id, changes) =>
  dispatch => fetch(`${baseUrl}/events/${id}`, {
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

export const deleteEvent = id =>
  dispatch => fetch(`${baseUrl}/events/${id}`, {
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
      } else {
        dispatch(destroyEvent(id));
      }
    })
    .catch(console.log);
