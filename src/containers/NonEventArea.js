import React from 'react';
import PropTypes from 'prop-types';
import GuestArea from './GuestArea';
import GuestInfo from '../components/formsAndInfo/GuestInfo';

const NonEventArea = ({ table }) => (
	<div id={`non-event-area-${table}`}>
		<GuestArea />
		<GuestInfo />
	</div>
);

NonEventArea.propTypes = {
	table: PropTypes.string,
};

export default NonEventArea;
