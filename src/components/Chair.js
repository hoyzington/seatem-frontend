import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Guest from './Guest'

class Chair extends React.Component {

  guestInChair = () => {
    const chairId = this.props.id,
          event = this.props.event,
          guestId = event.chairs[parseInt(chairId)]
    return event.guests.find(guest => guest.id === guestId)
  }

  handleClick = () => {
    const guest = this.props.guest,
          emptyChair = !this.guestInChair(),
          chairId = this.props.id
    if (guest && emptyChair) {
      this.props.seatGuest(chairId)
      this.props.updateNeighbors(guest)
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
  seatGuest: (chairId) => dispatch({ type: 'SEAT_GUEST', chairId }),
  updateNeighbors: (guest) => dispatch({ type: 'UPDATE_NEIGHBORS', guest }),
  checkForIssues: (guest) => dispatch({ type: 'UPDATE_NEIGHBORS', guest }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Chair)
