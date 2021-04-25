import React from 'react'
import AboutOrFormArea from './AboutOrFormArea'

const content = <h4 >M Guest</h4>

const GuestInfo = () => (
  <>
    <AboutOrFormArea id='guest-info-1-rnd' class='card guest-info' content={content} />
    <AboutOrFormArea id='guest-info-2-rnd' class='card guest-info' content={content} />
    {/* <AboutOrFormArea id='guest-info-1-rect' class='card guest-info' content={content} />
    <AboutOrFormArea id='guest-info-2-rect' class='card guest-info' content={content} /> */}
  </>
)

export default GuestInfo
