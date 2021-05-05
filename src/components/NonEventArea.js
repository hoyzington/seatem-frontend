import React from 'react'
import GuestArea from '../containers/GuestArea'

const NonEventArea = ({ guests, table }) => (
  <div id={'non-event-area-' + table}>
    <GuestArea table={table} guests={guests} />
  </div>
)

export default NonEventArea
