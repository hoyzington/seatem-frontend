import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import events from './reducers/events'
import currentUser from './reducers/currentUser'
import thunk from 'redux-thunk'

const reducers = combineReducers({
  events,
  currentUser,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducers, composeEnhancer(applyMiddleware(thunk)))

export default store
