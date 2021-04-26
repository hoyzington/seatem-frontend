import React from 'react'
import Guest from '../components/Guest'

class Guests extends React.Component {
  render() {
    return (
      <div id='guest-area-rnd' className='guest-area'>
        <Guest />
        <Guest />
        <Guest />
        <Guest />
        <Guest />
        <Guest />
        <Guest />
        <Guest />
        <Guest />
        {/* <Guest />
        <Guest />
        <Guest />
        <Guest />
        <Guest />
        <Guest />
        <Guest />
        <Guest />
        <Guest /> */}
      </div>
    )
  }
}

export default Guests
