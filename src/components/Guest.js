import React from 'react'
import { NavLink } from 'react-router-dom'

const guest = 'M G'
const url = '/guests/' + '1'

const Guest = () => (
  <div className='guest'>
    <NavLink to={url}>
      <div>{guest}</div>
    </NavLink>
  </div>
)

export default Guest
