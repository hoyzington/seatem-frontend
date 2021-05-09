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

  setId = () => {
    const selectedGuest = this.props.selectedGuest
    if (selectedGuest && selectedGuest.id === this.props.guest.id) {
      return 'selected'
    }
    return 'not-selected'
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
        <div id={this.setId()} className='guest' onClick={this.handleClick}>
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
