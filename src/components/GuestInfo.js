import React from 'react'
import { connect } from 'react-redux'

class GuestInfo extends React.Component {

  showGuest = () => {
    if (this.props.guest) {
      return (
        <>
          <h4>{this.props.guest.name}</h4>
          {this.addUnseatButton()}
          <button className='delete' onClick={this.handleDeleteClick}>Delete</button>
        </>
      )
    }
  }

  addUnseatButton = () => {
    if (this.props.guest.seated) {
      return (
        <button className='unseat' onClick={this.handleUnseatClick}>Unseat</button>
      )
    }
  }

  handleUnseatClick = () => {
    const { guest, unseatGuest } = this.props
    if (guest && guest.seated) {
      unseatGuest(guest)
    }
  }

  handleDeleteClick = () => {
    this.props.deleteGuest(this.props.guest)
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
  unseatGuest: (guest) => dispatch({ type: 'UNSEAT_GUEST', guest }),
  deleteGuest: (guest) => dispatch({ type: 'DELETE_GUEST', guest }),
})

export default connect(mapStateToProps, mapDispatchToProps)(GuestInfo)
