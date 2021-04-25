import React from 'react'
import AboutOrFormArea from './AboutOrFormArea'

const content = <form >Account Area</form>

const AccountArea = () => (
  <AboutOrFormArea id='about-form' class='card' content={content} />
)

export default AccountArea
