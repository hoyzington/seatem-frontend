import React from 'react'
import { NavLink } from 'react-router-dom'

const Table = ({ id, size, style }) => (
  <NavLink to='/table'>
    <div id={id} style={style}>
      <span>Recommended</span>
      <span>Table Size:</span>
      <span>{size}</span>
    </div>
  </NavLink>
)

export default Table
