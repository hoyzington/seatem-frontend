import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

class GuestInfo extends React.Component {

  buildFullName = () => {
    const { firstName, midName, lastName } = this.props.guest,
          f = firstName,
          m = (midName.length > 0) ? ` ${midName}` : '',
          l = (lastName.length > 0) ? ` ${lastName}` : ''
    return f + m + l
  }

  showGuest = () => {
    if (this.props.guest) {
      return (
        <>
          <h4>{this.buildFullName()}</h4>
          <div id='btn-area'>
            {this.addUnseatButton()}
            <NavLink className='btn delete' to='/' onClick={this.handleDeleteClick}>Delete</NavLink>
          </div>
        </>
      )
    }
  }

  addUnseatButton = () => {
    if (this.props.guest.seated) {
      return (
        <NavLink className='btn unseat' to='/' onClick={this.handleUnseatClick}>Unseat</NavLink>
      )
    }
  }

  handleUnseatClick = () => {
    const { guest, unseatGuest, updateNeighbors } = this.props
    if (guest && guest.seated) {
      unseatGuest()
      updateNeighbors()
    }
  }

  handleDeleteClick = () => {
    const { deleteGuest, updateNeighbors } = this.props
    deleteGuest()
    updateNeighbors()
  }

  render() {
    const event = this.props.event
    return (
      <div id={'guest-info-' + event.table}>
        {this.showGuest()}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  event: state.currentEvent,
  guest: state.selectedGuest,
})

const mapDispatchToProps = (dispatch) => ({
  unseatGuest: () => dispatch({ type: 'UNSEAT_GUEST' }),
  deleteGuest: () => dispatch({ type: 'DELETE_GUEST' }),
  updateNeighbors: () => dispatch({ type: 'UPDATE_NEIGHBORS' }),
})

export default connect(mapStateToProps, mapDispatchToProps)(GuestInfo)
