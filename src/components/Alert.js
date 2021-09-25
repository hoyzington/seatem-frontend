import React from 'react';
import PropTypes from 'prop-types';

const Alert = props => (<div id="alert">{props.message}</div>);

Alert.propTypes = {
	message: PropTypes.string,
};

export default Alert;
