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

export const setSavedEvents = (events) => {
  return {
    type: 'SET_SAVED_EVENTS',
    events,
  }
}

export const clearCurrentEvent = () => {
  return {
    type: 'CLEAR_CURRENT_EVENT',
  }
}

// Asynchronous Action Creators

export const createEvent = (event) => {
  return (dispatch) => {
    return fetch('http://localhost:3000/api/v1/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(event),
    })
      .then(res => res.json())
      .then(event => {
        dispatch(addEvent(event))
      })
      .catch(console.log)
  }
}

// export const updateEvent = (event) => {
//   return (dispatch) => {
//     return fetch('http://localhost:3000/api/v1/events/ID', {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//       },
//       body: JSON.stringify(event),
//     })
//       .then(res => res.json())
//       .then(user => {
//         dispatch(setCurrentUser(user))
//       })
//       .catch(console.log)
//   }
// }
