import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Account = props => (
	<div id="account" className="card">
		<NavLink id="exit" to="/" >&times;</NavLink>
		<p><b>ACCOUNT</b></p>
		<div>
			<NavLink to="/my-profile" >My Profile</NavLink>
		</div>
		<div>
			<NavLink to="/" onClick={props.logout} >Log Out</NavLink>
		</div>
	</div>
);

Account.propTypes = {
	logout: PropTypes.func,
};

export default Account;
