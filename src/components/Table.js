import React from 'react'
import { NavLink } from 'react-router-dom'

const Table = props => (
  <NavLink id='table' to='/table'>
    <div>{props.size}</div>
  </NavLink>
)

export default Table
