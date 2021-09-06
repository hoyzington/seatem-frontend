import React from 'react';
import SeatingArea from './SeatingArea';

const EventArea = props => (
	<div id={`event-area-${props.event.table}`}>
		<SeatingArea
			tableType={props.event.table}
			chairQty={props.event.chairs.length}
		/>
	</div>
);

export default EventArea;
