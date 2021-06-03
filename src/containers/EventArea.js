import React from 'react'
import SeatingArea from './SeatingArea'

const EventArea = ({ table, chairs }) => (
  <div id={`event-area-${table}`}>
    <SeatingArea
      tableType={table}
      chairQty={chairs.length}
    />
  </div>
)

export default EventArea
