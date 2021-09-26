import React from 'react';
import PropTypes from 'prop-types';

const Alert = props => (<div id="alert" className="card">{props.message}</div>);

Alert.propTypes = {
	message: PropTypes.string,
};

export default Alert;
