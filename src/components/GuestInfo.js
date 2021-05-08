import React from 'react'
import Button from './components/Button'
import { connect } from 'react-redux'

class GuestInfo extends React.Component {

  showGuest = () => {
    const guest = this.props.guest
    if (guest) {
      return (
        <>
          <h4>{guest.name}</h4>
        </>
      )
    }
  }

  addUnseatButton = () => {
    if (this.props.guest.seated) {
      return (
        <Button className='unseat' handleClick={this.handleUnseatClick} name='Unseat' />
      )
    }
  }

  handleUnseatClick = () => {
    const { guest, unseat } = this.props
    if (guest && guest.seated) {
      unseat(guest)
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
        {this.addUnseatButton()}
        <Button className='delete' handleClick={this.handleDeleteClick} name='Delete' />
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
