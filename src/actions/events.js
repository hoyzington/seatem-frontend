import { logErrors, clearErrors } from './errors'

// Synchronous Action Creators

export const addEvent = (event) => {
  return {
    type: 'ADD_EVENT',
    event,
  }
}

export const showEvent = (eventId) => {
  return {
    type: 'SHOW_EVENT',
    eventId,
  }
}

export const updateEvent = (changes) => {
  return {
    type: 'UPDATE_EVENT',
    changes,
  }
}

export const setSavedEvents = (events) => {
  return {
    type: 'SET_SAVED_EVENTS',
    events,
  }
}

export const resetCurrentEvent = () => {
  return {
    type: 'RESET_CURRENT_EVENT',
  }
}

export const clearEvents = () => {
  return {
    type: 'CLEAR_EVENTS',
  }
}

// Asynchronous Action Creators

const baseUrl = 'http://localhost:3000/api/v1'

export const createEvent = (event, userId) => {
  return (dispatch) => {
    dispatch(clearErrors())
    return fetch(`${baseUrl}/users/${userId}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(event),
    })
      .then(res => res.json())
      .then(event => {
        if (event.errors) {
          dispatch(logErrors(event.errors))
        } else {
          dispatch(addEvent(event))
        }
      })
      .catch(console.log)
  }
}

export const editEvent = (id, eventChanges, eventJson) => {
  return (dispatch) => {
    return fetch(`${baseUrl}/events/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(eventJson),
    })
      .then(res => res.json())
      .then(json => {
        if (json.errors) {
          dispatch(logErrors(json.errors))
        } else {
          dispatch(updateEvent(eventChanges))
          // alert(json.notice)
        }
      })
      .catch(console.log)
  }
}
