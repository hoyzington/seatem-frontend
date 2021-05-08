import React from 'react'

const Button = ({ className, handleClick, name }) => {
  return (
    <button type='button' className={className} onClick={handleClick}>
      {name}
    </button>
  )
}

export default Button
