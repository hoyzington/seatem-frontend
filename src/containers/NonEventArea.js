import React from 'react'
import GuestArea from './GuestArea'
import GuestInfo from '../components/formsAndInfo/GuestInfo'

const NonEventArea = ({ table }) => (
  <div id={'non-event-area-' + table}>
    <GuestArea />
    <GuestInfo />
  </div>
)

export default NonEventArea
