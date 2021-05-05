import React from 'react'
import { connect } from 'react-redux'

class GuestInfo extends React.Component {

  showGuest = () => {
    const guest = this.props.state.selectedGuest
    if (guest) {
      return (guest.name)
    }
  }

  render() {
    const event = this.props.state.currentEvent
    return (
      <div id={'guest-info-' + event.table} className='guest-info'>
        {this.showGuest()}
      </div>
    )
  }
}

const mapStateToProps = state => ({ state })

export default connect(mapStateToProps)(GuestInfo)
