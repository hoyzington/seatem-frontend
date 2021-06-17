import React from 'react'
import { NavLink } from 'react-router-dom'

const EventMenu = (props) => {
  const possibleLinks = () => {
    if (props.event.guests.length > 0) {
      return (
        <>
          <div><NavLink className='event' to='/add-preferences'>Add Preferences</NavLink></div>
          <div><NavLink className='event' to='/checklist'>Edit Guest Traits</NavLink></div>
        </>
      )
    }
  }
  return (
    <div id='event-menu' className='card'>
      <NavLink id='exit' to='/'>&times;</NavLink>
      <div><NavLink className='event' to='/edit-event'>Edit Event</NavLink></div>
      <div><NavLink className='event' to='/add-guests'>Add Guests</NavLink></div>
      {possibleLinks()}
    </div>
  )
}

export default EventMenu
