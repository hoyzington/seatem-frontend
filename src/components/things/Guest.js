import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { selectGuest } from '../../actions/guests'

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
  selectedGuest: state.events.selectedGuest,
})

export default connect(mapStateToProps, { selectGuest })(Guest)
