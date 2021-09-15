import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { editUser } from '../../actions/currentUser';
import CloseXClearErrors from './CloseXClearErrors';
import ErrorsDisplay from './ErrorsDisplay';

class EditProfile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			email: '',
			password: '',
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	handleSubmit() {
		const { state } = this;
		const update = Object.keys(state).reduce((newObj, key) => {
			if (state[key] !== '') {
				newObj[key] = state[key];
			}
			return newObj;
		}, {});
		const updatedUser = {
			id: this.props.user.id,
			...update,
		};
		this.props.editUser(updatedUser);
	}

	render() {
		return (
			<div id="my-profile" className="card">
				<CloseXClearErrors />
				<form>
					<p><b>EDIT PROFILE</b></p>
					<ErrorsDisplay />
					<label>
						Username: &nbsp;
						<input
							type="text"
							name="username"
							onChange={this.handleChange}
							value={this.state.username}
							maxLength="20"
							placeholder={this.props.user.username}
						/>
					</label><br/>
					<label>
						Email: &nbsp;
						<input
							type="text"
							name="email"
							onChange={this.handleChange}
							value={this.state.email}
							placeholder={this.props.user.email}
						/>&nbsp;
					</label><br/>
					<label>
						Password: &nbsp;
						<input
							type="password"
							name="password"
							onChange={this.handleChange}
							value={this.state.password}
						/>
						<br/>
					</label>
					<div id="btn-area">
						<NavLink className="btn form bottom" to="/my-profile" onClick={this.handleSubmit} >UPDATE</NavLink>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	user: state.currentUser,
});

EditProfile.propTypes = {
	user: PropTypes.object,
	editUser: PropTypes.func,
};

export default connect(mapStateToProps, { editUser })(EditProfile);
