import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

class ErrorsDisplay extends React.Component {
	render() {
		const { errors } = this.props;
		if (errors) {
			return (
				<div className="error">
					<p>
						{errors.content.map(error => {
							const presentableError = error.replace('Guestqty', 'Number of guests');
							return (
								<li key={uuidv4()}>{presentableError}</li>
							);
						})}
					</p>
				</div>
			);
		}
		return null;
	}
}

const mapStateToProps = state => ({
	errors: state.errors,
});

ErrorsDisplay.propTypes = {
	errors: PropTypes.array,
};

export default connect(mapStateToProps)(ErrorsDisplay);
