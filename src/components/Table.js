import React from 'react'
import { NavLink } from 'react-router-dom'

const Table = ({ id, size }) => (
  <NavLink to='/table'>
    <div id={id}>
      <span>Table Size: {size} ft</span>
      <span>(Recommended)</span>
    </div>
  </NavLink>
)

export default Table
