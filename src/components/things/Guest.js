import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class Guest extends React.Component {

  makeInitials = (guest) => {
    return [
      guest.firstName[0],
      guest.middleName[0],
      guest.lastName[0],
    ]
  }

  setClassName = () => {
    const { guest, selectedGuest } = this.props
    const guestIsHappy = guest.issues.length === 0
    if (guest === selectedGuest) {
      if (guestIsHappy) {
        return 'selected-happy'
      } else {
        return 'selected-sad'
      }
    } else {
      if (guestIsHappy) {
        return 'happy'
      } else {
        return 'sad'
      }
    }
  }

  handleClick = () => {
    this.props.selectGuest(this.props.guest.id)
  }

  render() {
    const initialsArray = this.makeInitials(this.props.guest),
          url = `/guests/${initialsArray.join('')}`,
          initials = initialsArray.join(' ')
    return (
      <NavLink to={url}>
        <div
          className={`guest ${this.setClassName()}`}
          onClick={this.handleClick}
        >
          {initials}
        </div>
      </NavLink>
    )
  }
}

const mapStateToProps = (state) => ({
  // user: state.user,
  events: state.events.events,
  event: state.events.currentEvent,
  guests: state.events.currentEvent.guests,
  selectedGuest: state.events.selectedGuest,
})

const mapDispatchToProps = dispatch => ({
  selectGuest: (id) => dispatch({ type: 'SELECT_GUEST', id }),
  updateGuest: (guest) => dispatch({ type: 'UPDATE_GUEST', guest }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Guest)
