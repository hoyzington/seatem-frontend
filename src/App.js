import React from 'react';
import PropTypes from 'prop-types';
import {
	BrowserRouter as Router,
	Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import NavBar from './components/NavBar';
import FormArea from './containers/FormArea';
import NonEventArea from './containers/NonEventArea';
import EventArea from './containers/EventArea';
import Footer from './components/Footer';
import './styles/App.css';

class App extends React.Component {
	renderCurrentEvent() {
		const { currentEvent } = this.props;
		if (currentEvent) {
			return (
				<>
					<NonEventArea table={currentEvent.table} />
					<EventArea event={currentEvent} />
				</>
			);
		}
	}

	render() {
		const { user, currentEvent, errors } = this.props;
		return (
			<Router>
				<>
					<NavBar user={user} event={currentEvent} />
					<Route exact path="/" />
					<FormArea user={user} currentEvent={currentEvent} errors={errors} />
					{this.renderCurrentEvent()}
					<Footer />
				</>
			</Router>
		);
	}
}

App.propTypes = {
	user: PropTypes.object,
	currentEvent: PropTypes.object,
	errors: PropTypes.array,
};

const mapStateToProps = state => ({
	user: state.currentUser,
	currentEvent: state.events.currentEvent,
	errors: state.errors,
});

export default connect(mapStateToProps)(App);
