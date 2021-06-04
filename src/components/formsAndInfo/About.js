import React from 'react'
import { NavLink } from 'react-router-dom'

const renderExit = (user) => {
  if (user) {
    return (<NavLink id='exit' to='/'>&times;</NavLink>)
  }
}

const renderButton = (user) => {
  if (user) {
    return (<NavLink className='btn form bottom' to='/new-event'>CLICK HERE TO BEGIN</NavLink>)
  }
  return (<NavLink className='btn form bottom' to='/login-signup'>LOG IN or SIGN UP</NavLink>)
}

const About = (props) => {

  return (
    <div id='about' className='card'>
      {renderExit(props.user)}
      <p>Welcome to Seat'em, your go-to event seating arrangement helper!
      </p>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. In natus ullam maiores labore provident corporis voluptatum ex perspiciatis saepe.
      </p>
      <p>Iusto quis inventore eveniet cumque, distinctio incidunt corporis doloremque magnam nostrum. Vel voluptatibus culpa odio ab nobis quam voluptate nulla atque quibusdam, provident eaque quae id, dolorum iure iusto eius aut cumque nisi.
      </p>
      <div id='btn-area'>
        {renderButton(props.user)}
      </div>
    </div>
  )
}

export default About
