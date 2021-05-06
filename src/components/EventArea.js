import React from 'react'
import SeatingArea from '../containers/SeatingArea'

const EventArea = ({ data }) => (
  <div id={'event-area-' + data.currentEvent.table}>
    <SeatingArea
      tableType={data.currentEvent.table}
      peopleQty={data.currentEvent.guests.length}
    />
  </div>
)

export default EventArea
