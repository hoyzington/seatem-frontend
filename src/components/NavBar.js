import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => (
  <header>
    <nav id='logo-bar'>
      <span id='logo'><i>Seat 'em</i></span>
      <NavLink className='navbar' to='/about'>About</NavLink>
    </nav>
    <nav id='menu-bar'>
      <NavLink className='navbar' to='/guests'>Guests</NavLink>
      <NavLink className='navbar' to='/table'>Table</NavLink>
      <NavLink className='navbar' to='/account'>Account</NavLink>
    </nav>
  </header>
)

export default NavBar
