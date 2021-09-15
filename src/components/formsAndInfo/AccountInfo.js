import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

class AccountArea extends React.Component {
	render() {
		return (
			<div id="btn-area">
				<NavLink className="btn form bottom" to="/" onClick={this.props.handleLogout} >LOG OUT</NavLink>
			</div>
		);
	}
}

AccountArea.propTypes = {
	handleLogout: PropTypes.func,
};

export default AccountArea;
