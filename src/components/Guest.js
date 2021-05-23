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

  guestIsHappy = () => {
    const thisGuest = this.props.guest
    if (thisGuest.seated) {
      const { guests } = this.props
      const neighbors = guests.filter(guest => (
        thisGuest.neighbors.includes(guest.id)
      ))
      const { guestsYes, guestsNo, descriptionsYes, descriptionsNo } = this.props.guest.preferences

      const hasRightNeighbors =
        guestsYes.length === 0 ||
        guestsYes.every(guest => (
          neighbors.includes(guest)
        )
      )

      const hasNoWrongNeighbor =
        guestsNo.length === 0 ||
        !guestsNo.some(guest => (
          neighbors.includes(guest)
        )
      )

      const desiredDesc =
        descriptionsYes.length === 0 ||
        neighbors.length === 0 ||
        descriptionsYes.every(desc => (
          neighbors.every(neighbor => (
            neighbor.traits &&
            neighbor.traits.includes(desc)
          ))
        )
      )

      const noUndesiredDesc = 
        descriptionsNo.length === 0 ||
        neighbors.length === 0 ||
        !descriptionsNo.some(desc => (
          neighbors.some(neighbor => (
            neighbor.traits &&
            neighbor.traits.includes(desc)
          ))
        )
      )

      return hasRightNeighbors && hasNoWrongNeighbor && desiredDesc && noUndesiredDesc
    }
    return true
  }

  setClassName = () => {
    const { guest, selectedGuest } = this.props
    const guestIsHappy = this.guestIsHappy()
    if (guest === selectedGuest) {
      if (guestIsHappy) {
        return 'guest selected-happy'
      } else {
        return 'guest selected-sad'
      }
    } else {
      if (guestIsHappy) {
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
    const initialsArray = this.makeInitialsArray(),
          url = `/guests/${initialsArray.join('')}`,
          initials = initialsArray.join(' ')
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
  guests: state.currentEvent.guests,
  selectedGuest: state.selectedGuest,
})

const mapDispatchToProps = dispatch => ({
  selectGuest: id => dispatch({ type: 'SELECT_GUEST', id })
})

export default connect(mapStateToProps, mapDispatchToProps)(Guest)
