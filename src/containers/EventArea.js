import React from 'react'
import SeatingArea from './SeatingArea'

const EventArea = ({ data }) => (
  <div id={'event-area-' + data.currentEvent.table}>
    <SeatingArea
      tableType={data.currentEvent.table}
      chairQty={data.currentEvent.chairs.length}
    />
  </div>
)

export default EventArea
