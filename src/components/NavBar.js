import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = ({ title }) => (
  <header>
    <nav>
      <span id='logo-bar'>
        <span id='logo'><i>Seat 'em</i></span>
        <NavLink className='navbar' to='/about'>About</NavLink>
      </span>
      <span id='title-bar'>
        <span><i>{title}</i></span>
      </span>
      <span id='menu-bar'>
        <NavLink className='navbar' to='/event-form'>Event</NavLink>
        {/* <NavLink className='navbar' to='/guests'>Guests</NavLink> */}
        <NavLink className='navbar' to='/account'>Account</NavLink>
      </span>
    </nav>
  </header>
)

export default NavBar
