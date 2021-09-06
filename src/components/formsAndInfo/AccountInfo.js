import React from 'react';
import { NavLink } from 'react-router-dom';

class AccountArea extends React.Component {
	render() {
		return (
			<>
				<div id="">

				</div>
				<div id="btn-area">
					<NavLink className="btn form bottom" to="/" onClick={this.props.handleLogout} >LOG OUT</NavLink>
				</div>
			</>
		);
	}
}

export default AccountArea;
