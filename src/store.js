import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import currentUser from './reducers/currentUser';
import events from './reducers/events';
import errors from './reducers/errors';
import thunk from 'redux-thunk';

const reducers = combineReducers({
	currentUser,
	events,
	errors,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancer(applyMiddleware(thunk)));

export default store;
