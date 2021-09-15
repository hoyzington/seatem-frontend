import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { editEvent, updateEvent } from '../../actions/events';
import { checkForIssues, editGuest, unselectGuest } from '../../actions/guests';
import Guest from './Guest';

class Chair extends React.Component {
	fillChair() {
		const guestInChair = this.guestInChair();
		if (guestInChair) {
			return (
				<Guest guest={guestInChair} />
			);
		}
	}

	guestInChair() {
		const chairId = this.props.id,
					{ event } = this.props,
					guestId = event.chairs[parseInt(chairId, 10)];
		return event.guests.find(guest => guest.id.toString() === guestId);
	}

	handleClick() {
		const { selectedGuest } = this.props;
		const emptyChair = !this.guestInChair();
		if (selectedGuest && emptyChair) {
			const { event, editEvent, updateEvent, editGuest, unselectGuest, checkForIssues } = this.props;
			const newNeighborIds = this.getNewNeighborIds();
			let affectedGuests;
			if (selectedGuest.seated) {
				affectedGuests = [
					this.makeGuestUpdate(newNeighborIds),
					...this.updatePrevNeighbors(),
					...this.updateNewNeighbors(newNeighborIds),
				];
			} else {
				affectedGuests = [
					this.makeGuestUpdate(newNeighborIds),
					...this.updateNewNeighbors(newNeighborIds),
				];
			}
			const updatedGuests = this.createUpdatedGuests(affectedGuests);
			const updatedChairs = this.updateChairs();
			const eventChanges = {
				chairs: updatedChairs,
				guests: updatedGuests,
			};
			updateEvent(event.id, eventChanges);
			unselectGuest();
			checkForIssues(affectedGuests);
			affectedGuests.forEach(guest => {
				const guestJson = {
					neighbors: guest.neighbors.join(','),
					seated: true,
				};
				editGuest(guest.id, guestJson);
			});
			const eventJson = {
				chairs: updatedChairs.join(','),
			};
			editEvent(event.id, eventJson);
		}
	}

	updateChairs() {
		const { event, selectedGuest } = this.props;
		const newChairIdx = parseInt(this.props.id, 10);
		if (selectedGuest.seated) {
			const prevChairIdx = event.chairs.findIndex(chair => chair === selectedGuest.id.toString());
			const chairs = [
				...event.chairs.slice(0, prevChairIdx),
				'',
				...event.chairs.slice(prevChairIdx + 1),
			];
			return [
				...chairs.slice(0, newChairIdx),
				selectedGuest.id.toString(),
				...chairs.slice(newChairIdx + 1),
			];
		}
		return [
			...event.chairs.slice(0, newChairIdx),
			selectedGuest.id.toString(),
			...event.chairs.slice(newChairIdx + 1),
		];
	}

	makeGuestUpdate(newNeighborIds) {
		return {
			...this.props.selectedGuest,
			neighbors: newNeighborIds,
			seated: true,
		};
	}

	getNewNeighborIds() {
		const { chairs } = this.props.event;
		const chairIdx = parseInt(this.props.id, 10);
		let neighborIds;
		const last = chairs.length - 1;
		if (chairIdx < 1) {
			neighborIds = [
				chairs[last],
				chairs[1],
			];
		} else if (chairIdx === last) {
			neighborIds = [chairs[last - 1], chairs[0]];
		} else {
			neighborIds = [
				chairs[chairIdx - 1],
				chairs[chairIdx + 1],
			];
		}
		return neighborIds.filter(nbrId => (nbrId !== '' && nbrId !== this.props.selectedGuest.id.toString()));
	}

	updatePrevNeighbors() {
		const { neighbors } = this.props.selectedGuest;
		if (neighbors.length > 0) {
			return neighbors.map(id => this.updatePrevNeighbor(id));
		}
		return [];
	}

	updatePrevNeighbor(id) {
		const { guests, selectedGuest } = this.props;
		const neighbor = guests.find(guest => guest.id.toString() === id);
		const nbrArray = neighbor.neighbors.filter(nbrId => nbrId !== selectedGuest.id.toString());
		return {
			...neighbor,
			neighbors: nbrArray,
		};
	}

	updateNewNeighbors(newNeighborIds) {
		if (newNeighborIds.length > 0) {
			return newNeighborIds.map(id => this.updateNewNeighbor(id));
		}
		return [];
	}

	updateNewNeighbor(id) {
		const { guests } = this.props;
		const newNeighbor = guests.find(guest => guest.id.toString() === id);
		return {
			...newNeighbor,
			neighbors: [
				...newNeighbor.neighbors,
				this.props.selectedGuest.id.toString(),
			],
		};
	}

	createUpdatedGuests(affectedGuests) {
		const { guests } = this.props;
		let updatedGuests = guests;
		affectedGuests.forEach(affectedGuest => {
			const guestIdx = guests.findIndex(guest => guest.id === affectedGuest.id);
			updatedGuests = [
				...updatedGuests.slice(0, guestIdx),
				affectedGuest,
				...updatedGuests.slice(guestIdx + 1),
			];
		});
		return updatedGuests;
	}

	render() {
		const guestInChair = this.guestInChair();
		const { selectedGuest, id, x, y } = this.props;
		if (guestInChair || !selectedGuest) {
			return (
				<div
					id={id}
					className="chair"
					to="/"
					style={{
						top: `${y}px`,
						left: `${x}px`,
					}}>
					{this.fillChair()}
				</div>
			);
		}
		return (
			<NavLink
				id={id}
				className="chair"
				to="/"
				onClick={this.handleClick}
				style={{
					top: `${y}px`,
					left: `${x}px`,
				}}>
			</NavLink>
		);
	}
}

const mapStateToProps = state => ({
	event: state.events.currentEvent,
	guests: state.events.currentEvent.guests,
	selectedGuest: state.events.selectedGuest,
});

Chair.propTypes = {
	event: PropTypes.object,
	guests: PropTypes.array,
	selectedGuest: PropTypes.object,
	x: PropTypes.string,
	y: PropTypes.string,
	id: PropTypes.string,
	editGuest: PropTypes.func,
	unselectGuest: PropTypes.func,
	editEvent: PropTypes.func,
	updateEvent: PropTypes.func,
	checkForIssues: PropTypes.func,
};

export default connect(mapStateToProps, { editGuest, unselectGuest, editEvent, updateEvent, checkForIssues })(Chair);
