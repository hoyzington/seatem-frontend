import { logErrors, clearErrors } from './errors'
// import { updateEvent } from './events'

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

// export const updateGuest = (guest) => {
//   return {
//     type: 'UPDATE_GUEST',
//     guest,
//   }
// }

export const selectGuest = (guest) => {
  return {
    type: 'SELECT_GUEST',
    guest,
  }
}

export const seatGuest = () => {
  return {
    type: 'SEAT_GUEST',
  }
}

export const unseatGuest = () => {
  return {
    type: 'UNSEAT_GUEST',
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
          // const update = {
          //   ...event,
          //   guests: [
          //     ...event.guests,
          //     savedGuest,
          //   ],
          // }
          // dispatch(updateEvent(update))
          dispatch(addGuest(savedGuest))
        }
      })
      .catch(console.log)
  }
}

export const editGuest = (guest) => {
  return (dispatch) => {
    return fetch(`${baseUrl}/guests/${guest.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(guest),
    })
      .then(res => res.json())
      .then(guest => {
        if (guest.errors) {
          dispatch(logErrors(guest.errors))
        } else {
          alert(guest.notice)
        }
      })
      .catch(console.log)
  }
}
