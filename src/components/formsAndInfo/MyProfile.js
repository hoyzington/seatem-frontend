import React from 'react'
import { NavLink } from 'react-router-dom'

const MyProfile = ({ user }) => (
  <div id='my-profile' className='card'>
    <NavLink id='exit' to='/' >&times;</NavLink>
    <p><b>MY PROFILE</b></p>
    <p>Username: &nbsp;{user.username}</p>
    <p>Email: &nbsp;{user.email}</p>
    <div id='my-profile-italic'>
      <i>Click Edit to change profile and/or password</i>
    </div>
    <div id='btn-area'>
      <NavLink className='btn form bottom' to='/edit-profile'>EDIT</NavLink>
    </div>
  </div>
)

export default MyProfile
