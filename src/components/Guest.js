import React from 'react'
import { NavLink } from 'react-router-dom'

const url = '/guests/1'
const initials = 'M G'

const Guest = () => (
  <NavLink to={url}>
    <div className='guest'>{initials}</div>
  </NavLink>
)

export default Guest
