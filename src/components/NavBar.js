import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class NavBar extends React.Component {
	renderLeftLinks() {
		if (this.props.user && this.props.user.username) {
			return (
				<>
					<NavLink className="navbar" to="/account" >Account</NavLink>
					<NavLink className="navbar" to="/about">About</NavLink>
				</>
			);
		}
	}

	renderRightLinks() {
		if (this.props.user && this.props.user.username) {
			return (
				<>
					{this.renderEventLink()}
					<NavLink className="navbar" to="/events">My Events</NavLink>
					<NavLink className="navbar" to="/new-event">New Event</NavLink>
				</>
			);
		}
	}

	renderEventLink() {
		if (this.props.currentEvent) {
			return (
				<NavLink className="navbar" to="/event-menu">This Event</NavLink>
			);
		}
	}

	render() {
		const { event } = this.props;
		return (
			<header>
				<nav>
					<span id="logo-bar">
						<span id="logo"><i>Seat &apos;em</i></span>
						{this.renderLeftLinks()}
					</span>
					<span id="title-bar">
						<i>{event ? event.name : ''}</i>
					</span>
					<span id="menu-bar">
						{this.renderRightLinks()}
					</span>
				</nav>
			</header>
		);
	}
}

const mapStateToProps = state => ({
	user: state.currentUser,
	events: state.events.savedEvents,
	currentEvent: state.events.currentEvent,
});

export default connect(mapStateToProps)(NavBar);
