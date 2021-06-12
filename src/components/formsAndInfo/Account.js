import React from 'react'
import { NavLink } from 'react-router-dom'

const Account = (props) => (
  <div id='account' className='card'>
    <NavLink id='exit' to='/' >&times;</NavLink>
    <p><b>ACCOUNT</b></p>
    <div>
      <NavLink to='/my-profile' >My Profile</NavLink>
    </div>
    <div>
      <NavLink to='/' onClick={props.logout} >Log Out</NavLink>
    </div>
  </div>
)

export default Account
