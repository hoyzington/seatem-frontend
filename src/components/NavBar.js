import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/App.css'

const NavBar = () => (
  <div id='header'>
    <span id='logo'><i>Seat 'Em</i></span>
    <span id='nav'>
      <NavLink className='link' to='/about'>About</NavLink>
      <NavLink className='link' to='/start'>Start</NavLink>
      <NavLink className='link' to='/account'>Account</NavLink>
    </span>
  </div>
)

export default NavBar
