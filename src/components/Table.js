import React from 'react'
import { NavLink } from 'react-router-dom'

const Table = ({ size }) => (
  <NavLink to='/table'>
    <div id='table'>
      <span>Table Size:</span><br/>
      <span>{size}</span>
    </div>
  </NavLink>
)

export default Table
