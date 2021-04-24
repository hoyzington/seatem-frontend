import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => (
  <header>
    <span id='logo'><i>Seat 'em</i></span>
    <nav>
      <NavLink to='/about'>About</NavLink>
      <NavLink to='/guests'>Guests</NavLink>
      <NavLink to='/table'>Table</NavLink>
      <NavLink to='/account'>Account</NavLink>
    </nav>
  </header>
)

export default NavBar
