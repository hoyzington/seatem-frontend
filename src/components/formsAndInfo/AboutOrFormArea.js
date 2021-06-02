import React from 'react'
import { NavLink } from 'react-router-dom'

const AboutOrFormArea = props => (
      <div id={props.id} className={props.class}>
        {props.content}
        <NavLink id='exit' to='/'>&times;</NavLink>
      </div>
    )

export default AboutOrFormArea
