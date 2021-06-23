import { logErrors, clearErrors } from './errors'

// Synchronous Action Creators

export const addGuest = (guest) => {
  return {
    type: 'ADD_GUEST',
    guest,
  }
}

export const showGuest = (guest) => {
  return {
    type: 'SHOW_GUEST',
    guest,
  }
}

export const updateGuest = (guest) => {
  return {
    type: 'UPDATE_GUEST',
    guest,
  }
}

export const selectGuest = (guestId) => {
  return {
    type: 'SELECT_GUEST',
    guestId,
  }
}

export const unselectGuest = (guestId) => {
  return {
    type: 'UNSELECT_GUEST',
    guestId,
  }
}

export const checkForIssues = () => {
  return {
    type: 'CHECK_FOR_ISSUES',
  }
}

// Asynchronous Action Creators

const baseUrl = 'http://localhost:3000/api/v1'

export const createGuest = (newGuest, event) => {
  return (dispatch) => {
    dispatch(clearErrors())
    return fetch(`${baseUrl}/events/${event.id}/guests`, {
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
          dispatch(logErrors(savedGuest.errors))
        } else {
          dispatch(addGuest(savedGuest))
        }
      })
      .catch(console.log)
  }
}

export const editGuest = (id, changes) => {
  return (dispatch) => {
    return fetch(`${baseUrl}/guests/${id}`, {
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
          dispatch(logErrors(json.errors))
        } else {
          // alert(json.notice)
        }
      })
      .catch(console.log)
  }
}

export const deleteGuest = (id) => {
  return (dispatch) => {
    return fetch(`${baseUrl}/guests/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then(res => res.json())
      .then(json => {
        if (json.errors) {
          dispatch(logErrors(json.errors))
        } else {
          // alert(json.notice)
        }
      })
      .catch(console.log)
  }
}
