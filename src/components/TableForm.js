import React from 'react'
import AboutOrFormArea from './AboutOrFormArea'

const content = <form >Table Form</form>

const TableForm = () => (
  <AboutOrFormArea id='about-form' class='card' content={content} />
)

export default TableForm
