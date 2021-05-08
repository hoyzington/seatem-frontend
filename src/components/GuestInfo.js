import React from 'react'
import { connect } from 'react-redux'

class GuestInfo extends React.Component {

  unseatButton = () => {
    if (this.props.guest.seated) {
      return (
        <button type='button' onClick={this.handleClick}>
          Unseat {this.props.guest.name}
        </button>
      )
    }
  }

  showGuest = () => {
    const guest = this.props.guest
    if (guest) {
      return (
        <>
          <h4>{guest.name}</h4>
          {this.unseatButton()}
        </>
      )
    }
  }

  handleClick = () => {
    const { guest, unseat } = this.props
    if (guest && guest.seated) {
      unseat(guest)
    }
  }

  render() {
    const event = this.props.event
    return (
      <div id={'guest-info-' + event.table} className='guest-info'>
        {this.showGuest()}
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

const mapDispatchToProps = (dispatch) => ({
  unseat: (guest) => dispatch({ type: 'UNSEAT_GUEST', guest })
})

export default connect(mapStateToProps, mapDispatchToProps)(GuestInfo)
