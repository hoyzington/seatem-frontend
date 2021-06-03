// Synchronous Action Creators

export const addEvent = (event) => {
  return {
    type: 'ADD_EVENT',
    event,
  }
}



// Asynchronous Action Creators

export const createEvent = (eventObj) => {
  return (dispatch) => {
    return fetch('http://localhost:3000/api/v1/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(eventObj),
    })
      .then(res => res.json())
      .then(json => {
        dispatch(addEvent(json))
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
