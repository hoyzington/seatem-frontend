import React from 'react'
import Guest from '../components/things/Guest'
import { connect } from 'react-redux'

class GuestArea extends React.Component {

  renderGuests = () => {
    const guests = this.props.event.guests.filter(guest => guest.seated === false)
    return guests.map(guest => (<Guest key={guest.id} guest={guest} />))
  }

  render() {
    return (
      <div id={`guest-area-${this.props.event.table}`}>
        {this.renderGuests()}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  // user: state.user,
  events: state.events.events,
  event: state.events.currentEvent,
  guest: state.events.selectedGuest,
})

export default connect(mapStateToProps)(GuestArea)
