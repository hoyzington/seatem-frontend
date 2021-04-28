import React from 'react'
import Guest from './Guest'

const Chair = ({ x, y }) => (
  <div
    className='chair'
    style={{
      top: `${y}px`,
      left: `${x}px`
    }}>
    <Guest />
  </div>
)

export default Chair
