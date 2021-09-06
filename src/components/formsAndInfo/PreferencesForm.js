import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { editEvent, updateEvent } from '../../actions/events';
import { selectGuest, editGuest, updateGuest } from '../../actions/guests';
import { v4 as uuidv4 } from 'uuid';

class PreferencesForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			guestId: '',
			prefType: '',
			guestsYes: '',
			descriptionsYes: '',
			guestsNo: '',
			descriptionsNo: '',
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleGuestChange = this.handleGuestChange.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	componentDidMount() {
		const guest = this.props.selectedGuest
		if (guest) {
			this.setState({ guestId: guest.id });
		}
	}

	componentDidUpdate() {
		const descriptionInput = document.getElementById(this.state.prefType);
		if (descriptionInput) {
			descriptionInput.focus();
		}
	}

	buildFullName(guest) {
		const { firstName, middleName, lastName } = guest,
					f = firstName,
					m = (middleName.length > 0) ? ` ${middleName}` : '',
					l = (lastName.length > 0) ? ` ${lastName}` : '';
		return f + m + l;
	}

	createGuestOptions(type, bool) {
		const guest = this.props.selectedGuest
		let { guests } = this.props;
		if (type === 'preference' && guest) {
			const prefGuests = guest[`guests${bool}`];
			const oppPrefGuests = guest[`guests${bool === 'No' ? 'Yes' : 'No'}`];
			guests = guests.filter(guest => (
				guest.id !== parseInt(this.state.guestId, 10)
				&& !prefGuests.includes(guest.id.toString())
				&& !oppPrefGuests.includes(guest.id.toString())
			));
		}
		return guests.map(guest => (
			<option key={guest.id} value={guest.id}>
				{this.buildFullName(guest)}
			</option>
		));
	}

	setInputDisplay(type) {
		if (this.state.prefType === type) {
			return { display: 'inline' };
		}
		return { display: 'none' };
	}

	renderPreferences(type, bool) {
		const guest = this.props.selectedGuest
		if (guest) {
			const prefs = guest[`${type}${bool}`];
			const downBool = bool.toLowerCase();
			if (prefs.length > 0) {
				return prefs.map(pref => {
					if (type === 'guests') {
						const prefGuest = this.props.guests.find(guest => guest.id === parseInt(pref, 10));
						return (
							<li key={uuidv4()} className={downBool}>
								<b>{this.buildFullName(prefGuest)}</b>
								<NavLink
									className="delete-preference"
									to="/add-preferences"
									onClick={() => this.handleDelete(type, bool, pref)}
								>&times;</NavLink>
							</li>
						);
					}
					return (
						<li key={uuidv4()} className={downBool}>
							<b>{pref}</b>
							<NavLink
								className="delete-preference"
								to="/add-preferences"
								onClick={() => this.handleDelete(type, bool, pref)}
							>&times;</NavLink>
						</li>
					);
				});
			}
		}
	}

	buildPreferencesArea(bool) {
		return (
			<div className="preference-list">
				Guests
				<ul>
					{this.renderPreferences('guests', bool)}
				</ul>
				Descriptions
				<ul>
					{this.renderPreferences('descriptions', bool)}
				</ul>
			</div>
		);
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	handleGuestChange(e) {
		this.handleChange(e);
		this.props.selectGuest(parseInt(e.target.value, 10));
	}

	handleAdd() {
		const { selectedGuest, event, editEvent, updateEvent, editGuest, updateGuest } = this.props;
		const { prefType } = this.state;
		if (selectedGuest && prefType !== '') {
			let prefArray = selectedGuest[prefType];
			const newPref = this.state[prefType];
			const typeIsGuest = prefType[0] === 'g';
			if (!prefArray.includes(newPref)) {
				if (typeIsGuest && prefArray.length > 1) {
					prefArray = [
						prefArray[prefArray.length - 1],
						newPref.toString(),
					];
				} else {
					prefArray = [...prefArray, newPref];
				}
			}
			const updatedGuest = {
				...selectedGuest,
				[prefType]: prefArray,
			};
			if (!typeIsGuest && !event.descriptions.includes(newPref)) {
				const updatedDescriptions = [
					...event.descriptions,
					newPref,
				];
				const eventChanges = {
					descriptions: updatedDescriptions,
				};
				updateGuest(updatedGuest);
				updateEvent(event.id, eventChanges);
				this.setState({ [prefType]: '' });
				const eventJson = {
					descriptions: updatedDescriptions.join(','),
				};
				editEvent(event.id, eventJson);
			} else {
				updateGuest(updatedGuest);
				this.setState({ [prefType]: '' });
			}
			const guestJson = {
				[prefType]: prefArray.join(','),
			};
			editGuest(updatedGuest.id, guestJson);
		}
	}

	handleDelete(type, bool, pref) {
		const { selectedGuest, editGuest, updateGuest } = this.props,
					prefs = selectedGuest[`${type}${bool}`],
					prefIdx = prefs.findIndex(item => item === pref);
		const prefArray = [
			...prefs.slice(0, prefIdx),
			...prefs.slice(prefIdx + 1),
		];
		const updatedGuest = {
			...selectedGuest,
			[`${type}${bool}`]: prefArray,
		};
		updateGuest(updatedGuest);
		const guestJson = {
			[`${type}${bool}`]: prefArray.join(','),
		};
		editGuest(selectedGuest.id, guestJson);
	}

	render() {
		return (
			<div id="preference-form" className="card">
				<NavLink id="exit" to="/">&times;</NavLink>
				<form>
					<b>ADD SEATING PREFERENCES</b>
					<NavLink className="btn form top" to="/checklist">NEXT STEP</NavLink>

					<p>
						<label>
							Those Sitting Beside&nbsp;
							<select
								name="guestId"
								value={this.state.guestId}
								onChange={this.handleGuestChange}
								autoFocus
								required
							>
								<option key={uuidv4()} value="" hidden>Choose A Guest</option>
								{this.createGuestOptions('guest')}
							</select>
						</label>...
					</p>

					<div id="preference-area">
						<div className="preference-box">
							<span className="yes"><b>Should Be...</b></span><br/>

							<label>
								<input
									type="radio"
									name="prefType"
									value="guestsYes"
									onChange={this.handleChange}
								/>&nbsp;
								<i>choose a guest</i>
							</label>&nbsp;&nbsp;

							<select
								name="guestsYes"
								value={this.state.guestsYes}
								onChange={this.handleChange}
								style={this.setInputDisplay('guestsYes')}
							>
								<option key={uuidv4()} value="" hidden>Guests</option>
								{this.createGuestOptions('preference', 'Yes')}
							</select><br/>

							<label>
								<input
									type="radio"
									name="prefType"
									value="descriptionsYes"
									onChange={this.handleChange}
								/>&nbsp;
								<i>enter a description</i>
							</label>&nbsp;&nbsp;

							<input
								id="descriptionsYes"
								type="text"
								name="descriptionsYes"
								value={this.state.descriptionsYes}
								onChange={this.handleChange}
								placeholder="Description"
								style={this.setInputDisplay('descriptionsYes')}
							/><br/>

							<NavLink
								className="btn add"
								to="/add-preferences"
								onClick={this.handleAdd}
							>ADD</NavLink>

							{this.buildPreferencesArea('Yes')}

						</div>

						<div className="preference-box">
							<span className="no"><b>Should Not Be...</b></span><br/>

							<label>
								<input
									type="radio"
									name="prefType"
									value="guestsNo"
									onChange={this.handleChange}
								/>&nbsp;
								<i>choose a guest</i>
							</label>&nbsp;&nbsp;

							<select
								name="guestsNo"
								value={this.state.guestsNo}
								onChange={this.handleChange}
								style={this.setInputDisplay('guestsNo')}
							>
								<option key={uuidv4()} value="" hidden>Guests</option>
								{this.createGuestOptions('preference', 'No')}
							</select><br/>

							<label>
								<input
									type="radio"
									name="prefType"
									value="descriptionsNo"
									onChange={this.handleChange}
								/>&nbsp;
								<i>enter a description</i>
							</label>&nbsp;&nbsp;

							<input
								id="descriptionsNo"
								type="text"
								name="descriptionsNo"
								value={this.state.descriptionsNo}
								onChange={this.handleChange}
								placeholder="Description"
								style={this.setInputDisplay('descriptionsNo')}
							/><br/>

							<NavLink
								className="btn add"
								to="/add-preferences"
								onClick={this.handleAdd}
							>ADD</NavLink><br/>

							{this.buildPreferencesArea('No')}

						</div>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	event: state.events.currentEvent,
	guests: state.events.currentEvent.guests,
	selectedGuest: state.events.selectedGuest,
});

export default connect(mapStateToProps, { selectGuest, editEvent, updateEvent, editGuest, updateGuest })(PreferencesForm);
