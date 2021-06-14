import { logErrors } from './errors'

// Synchronous Action Creators

export const addEvent = (event) => {
  return {
    type: 'ADD_EVENT',
    event,
  }
}

export const showEvent = (event) => {
  return {
    type: 'SHOW_EVENT',
    event,
  }
}

export const updateEvent = (event) => {
  return {
    type: 'UPDATE_EVENT',
    event,
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

const baseUrl = 'http://localhost:3000/api/v1/events'

export const createEvent = (event) => {
  return (dispatch) => {
    return fetch(baseUrl, {
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

export const editEvent = (event) => {
  return (dispatch) => {
    return fetch(baseUrl + event.id, {
      method: 'PATCH',
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
          alert(event.notice)
        }
      })
      .catch(console.log)
  }
}
