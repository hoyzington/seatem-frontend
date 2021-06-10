import { setSavedEvents, clearEvents } from './events'
import { logErrors, clearErrors } from './errors'

// Synchronous Action Creators

export const setCurrentUser = (user) => {
  return {
    type: 'SET_CURRENT_USER',
    user,
  }
}

export const clearCurrentUser = () => {
  return {
    type: 'CLEAR_CURRENT_USER',
  }
}


// Asynchronous Action Creators

const baseUrl = 'http://localhost:3000/api/v1'

export const signup = (credentials) => {
  return (dispatch) => {
    return fetch(`${baseUrl}/signup`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
      .then(res => res.json())
      .then(json => {
        dispatch(clearErrors())
        if (json.errors) {
          dispatch(logErrors(json.errors))
        } else {
          dispatch(setCurrentUser(json.user))
        }
      })
      .catch(console.log)
  }
}

export const login = (credentials) => {
  return (dispatch) => {
    return fetch(`${baseUrl}/login`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
      .then(res => res.json())
      .then(json => {
        dispatch(clearErrors())
        if (json.errors) {
          dispatch(logErrors(json.errors))
        } else {
          dispatch(setCurrentUser(json.user))
          if (json.events.length > 0) {
            dispatch(setSavedEvents(json.events))
          }
        }
      })
      .catch(console.log)
  }
}

export const getCurrentUser = () => {
  return (dispatch) => {
    return fetch(`${baseUrl}/get_current_user`, {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          console.log(json.error)
        } else {
          dispatch(setCurrentUser(json.user))
          if (json.events.length > 0) {
            dispatch(setSavedEvents(json.events))
          }
        }
      })
      .catch(console.log)
  }
}

export const logout = () => {
  return (dispatch) => {
    dispatch(clearErrors())
    dispatch(clearEvents())
    dispatch(clearCurrentUser())
    return fetch(`${baseUrl}/logout`, {
      credentials: 'include',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then(res => res.json())
      .then(user => {
        if (user.error) {
          alert(user.error)
        } else {
          alert(user.notice)
        }
      })
      .catch(console.log)
  }
}

// export const editUser = (userId) => {
//   return (dispatch) => {
  // dispatch(clearErrors())
//     return fetch(`${baseUrl}/users/${userId}`, {
//       credentials: 'include',
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//       },
//     })
//       .then(res => res.json())
      // .then(user => {
      //   if (json.errors) {
      //     dispatch(logErrors(json.errors))
//         } else {
//           alert(user.notice)
//         }
//       })
//       .catch(console.log)
//   }
// }

// export const deleteUser = (userId) => {
//   return (dispatch) => {
//     dispatch(clearCurrentUser())
//     return fetch(`${baseUrl}/users/${userId}`, {
//       credentials: 'include',
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//       },
//     })
//       .then(res => res.json())
      // .then(user => {
        // if (json.errors) {
          // dispatch(logErrors(json.errors))
//         } else {
//           alert(user.notice)
//         }
//       })
//       .catch(console.log)
//   }
// }
