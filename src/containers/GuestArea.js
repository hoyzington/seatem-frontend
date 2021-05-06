import React from 'react'
import Guest from '../components/Guest'
import { connect } from 'react-redux'

class GuestArea extends React.Component {

  renderGuests = event => {
    const guests = event.guests.filter(guest => guest.loc === 0)
    return guests.map(guest => (<Guest key={guest.id} guest={guest} />))
  }

  render() {
    const event = this.props.state.currentEvent
    return (
      <div id={'guest-area-' + event.table}>
        {this.renderGuests(event)}
      </div>
    )
  }
}

const mapStateToProps = state => ({ state })

export default connect(mapStateToProps)(GuestArea)
