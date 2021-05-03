import React from 'react'
import { NavLink } from 'react-router-dom'


const Guest = props => {
  const name = props.data.name.split(' ')
  const initials = name.map(word => word[0])
  const url = '/guests/' + initials.join('')
  return (
    <NavLink to={url}>
      <div className='guest'>{initials.join(' ')}</div>
    </NavLink>
  )
}

export default Guest
