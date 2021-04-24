import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => (
  <header>
    <span id='logo'><i>Seat 'em</i></span>
    <nav>
      <NavLink className='link' to='/about'>About</NavLink>
      <NavLink className='link' to='/guests'>Guests</NavLink>
      <NavLink className='link' to='/table'>Table</NavLink>
      <NavLink className='link' to='/account'>Account</NavLink>
    </nav>
  </header>
)

export default NavBar
