import { setSavedEvents } from './events'

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

export const signup = (credentials) => {
  return (dispatch) => {
    return fetch('http://localhost:3000/api/v1/signup', {
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
        if (json.errors) {
          dispatch(setCurrentUser(json))
        } else {
          dispatch(setCurrentUser(json.user))
        }
      })
      .catch(console.log)
  }
}

export const login = (credentials) => {
  return (dispatch) => {
    return fetch('http://localhost:3000/api/v1/login', {
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
        if (json.error) {
          dispatch(setCurrentUser(json))
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
    return fetch('http://localhost:3000/api/v1/get_current_user', {
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
    dispatch(clearCurrentUser())
    return fetch('http://localhost:3000/api/v1/logout', {
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
