import React from 'react'
import { NavLink } from 'react-router-dom'
// import '../styles/App.css'

const NavBar = () => (
  <header>
    <span id='logo'><i>Seat 'Em</i></span>
    <nav>
      <NavLink className='link' to='/about'>About</NavLink>
      <NavLink className='link' to='/start'>Start</NavLink>
      <NavLink className='link' to='/account'>Account</NavLink>
    </nav>
  </header>
)

export default NavBar
