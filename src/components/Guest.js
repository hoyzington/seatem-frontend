import React from 'react'
import { NavLink, Route } from 'react-router-dom'
import GuestInfo from './GuestInfo'

const Guest = ({ data }) => {
  const initialsArray = data.name.split(' ').map(word => word[0])
  const url = '/guests/' + initialsArray.join('')
  const initials = initialsArray.join(' ')
  return (
    <>
      <NavLink to={url}>
        <div className='guest' >{initials}</div>
      </NavLink>
      <Route path={url} render={() => <GuestInfo data={data} />}/>
    </>
  )
}

export default Guest
