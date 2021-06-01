// Synchronous Action Creators

export const setCurrentUser = (user) => {
  return {
    type: 'SET_CURRENT_USER',
    user,
  }
}


// Asynchronous Action Creators

export const signup = (credentials) => {
  return dispatch => {
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
      .then(user => {
        if (user.error) {
          alert(user.error)
        } else {
          dispatch(setCurrentUser(user))
        }
      })
      .catch(console.log)
  }
}

export const login = (credentials) => {
  return dispatch => {
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
      .then(user => {
        if (user.error) {
          alert(user.error)
        } else {
          dispatch(setCurrentUser(user))
        }
      })
      .catch(console.log)
  }
}

export const getCurrentUser = () => {
  return dispatch => {
    return fetch('http://localhost:3000/api/v1/get_current_user', {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then(res => res.json())
      .then(user => {
        if (user.error) {
          console.log(user.error)
        } else {
          dispatch(setCurrentUser(user))
        }
      })
      .catch(console.log)
  }
}
