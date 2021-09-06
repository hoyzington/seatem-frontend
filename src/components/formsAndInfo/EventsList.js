import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { showEvent } from '../../actions/events';

class EventsList extends React.Component {
	renderExit() {
		const { user, event } = this.props;
		if (user && event) {
			return (<NavLink id="exit" to="/">&times;</NavLink>);
		}
	}

	showEvents() {
		if (this.props.events.length > 0) {
			return this.props.events.map(event => (
				<li key={event.id} className="event" >
					<NavLink
						to={`/events/${event.name}`}
						className="event"
						onClick={() => this.props.showEvent(event.id)}
					>{event.name}</NavLink>
				</li>
			));
		}
		return (<i>You have no saved events</i>);
	}

	renderTitle() {
		const { user } = this.props;
		if (user) {
			return (
				<h3>{user.username}&apos;s Events</h3>
			);
		}
	}

	render() {
		return (
			<div id="events" className="card" style={this.props.zStyle}>
				{this.renderExit()}
				{this.renderTitle()}
				<div id="event-list">
					<ul>{this.showEvents()}</ul>
				</div>
				<div id="btn-area">
					<NavLink className="btn form bottom" to="/new-event" >NEW EVENT</NavLink>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: state.currentUser,
	events: state.events.savedEvents,
	event: state.events.currentEvent,
});

export default connect(mapStateToProps, { showEvent })(EventsList);
