import React from 'react'
import Guest from '../components/Guest'

class GuestArea extends React.Component {

  renderGuests = () => {
    const guests = this.props.guests.filter(guest => guest.loc === 0)
    return guests.map(guest => (<Guest key={guest.id} data={guest} />))
  }

  render() {
    return (
      <div id={'guest-area-' + this.props.table}>
        {this.renderGuests()}
      </div>
    )
  }
}

export default GuestArea
