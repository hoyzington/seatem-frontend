import React from 'react'
import Guest from './Guest'

const Chair = ({ a, b }) => (
  <div
    className='chair'
    style={{
      top: `${a}vh`,
      left: `${b}vw`
    }}>
    <Guest />
  </div>
)

export default Chair
