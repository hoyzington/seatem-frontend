import React from 'react'
import Guest from '../components/Guest'
import { connect } from 'react-redux'

class GuestArea extends React.Component {

  renderGuests = (event) => {
    return event.guests.map((guest) => {
      if (guest.seated === false) {
        return (<Guest key={guest.id} guest={guest} />)
      }
    })
  }

  render() {
    return (
      <div id={`guest-area-${this.props.event.table}`}>
        {this.renderGuests(this.props.event)}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  events: state.events,
  event: state.currentEvent,
  guest: state.selectedGuest,
})

export default connect(mapStateToProps)(GuestArea)
