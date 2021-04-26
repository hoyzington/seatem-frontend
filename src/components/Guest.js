import React from 'react'
import { NavLink } from 'react-router-dom'

const url = '/guests/' + '1'
const initials = 'M G'

const Guest = () => (
  <div className='guest'>
    <NavLink to={url}>
      <div>{initials}</div>
    </NavLink>
  </div>
)

export default Guest
