import React from 'react'
import GuestArea from '../containers/GuestArea'
import GuestInfo from './GuestInfo'

const NonEventArea = ({ table }) => (
  <div id={'non-event-area-' + table}>
    <GuestArea />
    <GuestInfo />
  </div>
)

export default NonEventArea
