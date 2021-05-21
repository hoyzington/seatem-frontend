import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class Guest extends React.Component {

  makeInitialsArray = () => {
    return [
      this.props.guest.firstName[0],
      this.props.guest.midName[0],
      this.props.guest.lastName[0],
    ]
  }

  setClassName = () => {
    const guest = this.props.guest
    const selectedGuest = this.props.selectedGuest
    if (selectedGuest && selectedGuest.id === guest.id) {
      if (selectedGuest.happy) {
        return 'guest selected-happy'
      } else {
        return 'guest selected-sad'
      }
    } else {
      if (guest.happy) {
        return 'guest happy'
      } else {
        return 'guest sad'
      }
    }
  }

  handleClick = () => {
    this.props.selectGuest(this.props.guest.id)
  }

  render() {
    const initialsArray = this.makeInitialsArray()
    const url = `/guests/${initialsArray.join('')}`
    const initials = initialsArray.join(' ')
    return (
      <NavLink to={url}>
        <div
          className={this.setClassName()}
          onClick={this.handleClick}
        >
          {initials}
        </div>
      </NavLink>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  events: state.events,
  event: state.currentEvent,
  selectedGuest: state.selectedGuest,
})

const mapDispatchToProps = dispatch => ({
  selectGuest: id => dispatch({ type: 'SELECT_GUEST', id })
})

export default connect(mapStateToProps, mapDispatchToProps)(Guest)
