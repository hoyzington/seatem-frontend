import React from 'react'
import AboutOrFormArea from './AboutOrFormArea'

const content = <form >Guest Form</form>

const GuestForm = () => (
  <AboutOrFormArea id='about-form' class='card' content={content} />
)

export default GuestForm
