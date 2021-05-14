import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Guest from './Guest'

class Chair extends React.Component {

  guestInChair = () => {
    const chairId = this.props.id
    const event = this.props.event
    const guestId = event.chairs[parseInt(chairId)]
    return event.guests.find(guest => guest.id === guestId)
  }

  handleClick = () => {
    const guest = this.props.guest,
          emptyChair = !this.guestInChair(),
          chairId = this.props.id
    if (guest && emptyChair) {
      this.props.seatGuest(chairId, guest)
    }
  }

  fillChair = () => {
    const guestInChair = this.guestInChair()
    if (guestInChair) {
      return (
        <Guest guest={guestInChair} />
      )
    }
  }

  render() {
    const guestInChair = this.guestInChair()
    const { guest, id, x, y } = this.props
    if (guestInChair || !guest) {
      return (
        <div
          id={id}
          className='chair'
          to='/'
          onClick={this.handleClick}
          style={{
            top: `${y}px`,
            left: `${x}px`
          }}>
          {this.fillChair()}
        </div>
      )
    }
    return (
      <NavLink
        id={id}
        className='chair'
        to='/'
        onClick={this.handleClick}
        style={{
          top: `${y}px`,
          left: `${x}px`
        }}>
        {this.fillChair()}
      </NavLink>
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
  seatGuest: (chairId, guest) => dispatch({ type: 'SEAT_GUEST', chairId, guest })
})

export default connect(mapStateToProps, mapDispatchToProps)(Chair)
