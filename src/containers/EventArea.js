import React from 'react';
import PropTypes from 'prop-types';
import SeatingArea from './SeatingArea';

const EventArea = props => (
  <div id={`event-area-${props.event.table}`}>
    <SeatingArea
      tableType={props.event.table}
      chairQty={props.event.chairs.length}
    />
  </div>
);

EventArea.propTypes = {
  event: PropTypes.object,
};

export default EventArea;
