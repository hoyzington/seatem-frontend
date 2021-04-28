import React from 'react'
import SeatingArea from '../containers/SeatingArea'

const EventArea = ({ data }) => (
  <div id={'event-area-' + data.type}>
    <SeatingArea
      tableType={data.type}
      peopleQty={data.qty}
    />
  </div>
)

export default EventArea
