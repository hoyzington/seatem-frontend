import { setSavedEvents, clearEvents } from './events';
import { logErrors, clearErrors } from './errors';

// Synchronous Action Creators

export const setCurrentUser = user => ({
  type: 'SET_CURRENT_USER',
  user,
});

export const clearCurrentUser = () => ({
  type: 'CLEAR_CURRENT_USER',
});

// Asynchronous Action Creators

const baseUrl = 'http://localhost:3000/api/v1';

export const signup = credentials =>
  dispatch => fetch(`${baseUrl}/signup`, {
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
      dispatch(clearErrors());
      if (json.errors) {
        dispatch(logErrors(json.errors));
      } else {
        dispatch(setCurrentUser(json));
      }
    })
    .catch(console.log);

export const login = credentials =>
  dispatch => fetch(`${baseUrl}/login`, {
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
      dispatch(clearErrors());
      if (json.errors) {
        dispatch(logErrors(json.errors));
      } else {
        const user = {
          id: json.id,
          username: json.username,
          email: json.email,
        };
        dispatch(setCurrentUser(user));
        if (json.events.length > 0) {
          dispatch(setSavedEvents(json.events));
        }
      }
    })
    .catch(console.log);

export const getCurrentUser = () =>
  dispatch => fetch(`${baseUrl}/get_current_user`, {
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
        console.log(json.error);
      } else {
        const user = {
          id: json.id,
          username: json.username,
          email: json.email,
        };
        dispatch(setCurrentUser(user));
        if (json.events.length > 0) {
          dispatch(setSavedEvents(json.events));
        }
      }
    })
    .catch(console.log);

export const logout = () =>
  dispatch => {
    dispatch(clearCurrentUser());
    dispatch(clearEvents());
    dispatch(clearErrors());
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
          alert(user.error);
        } else {
          alert(user.notice);
        }
      })
      .catch(console.log);
  };

export const editUser = user =>
  dispatch => fetch(`${baseUrl}/users/${user.id}`, {
    credentials: 'include',
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then(res => res.json())
    .then(json => {
      dispatch(clearErrors());
      if (json.errors) {
        dispatch(logErrors(json.errors));
      } else {
        dispatch(setCurrentUser(json));
        alert('Your profile has been updated');
      }
    })
    .catch(console.log);

export const deleteUser = userId =>
  dispatch => {
    dispatch(clearCurrentUser());
    return fetch(`${baseUrl}/users/${userId}`, {
      credentials: 'include',
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
          dispatch(clearCurrentUser());
          dispatch(clearEvents());
          dispatch(clearErrors());
          alert(json.notice);
        }
      })
      .catch(console.log);
  };
