import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

class GuestInfo extends React.Component {

  showGuest = () => {
    const { guest } = this.props
    if (guest) {
      return (
        <>
          <h4>{this.buildFullName(guest)}</h4>
          <ul id='guest-info-list'>
            {this.createInfoList()}
          </ul>
          <div id='btn-area'>
            {this.addUnseatButton()}
            <NavLink className='btn delete' to='/' onClick={this.handleDeleteClick}>Delete</NavLink>
          </div>
        </>
      )
    }
  }

  buildFullName = (guest) => {
    const { firstName, midName, lastName } = guest,
          f = firstName,
          m = (midName.length > 0) ? ` ${midName}` : '',
          l = (lastName.length > 0) ? ` ${lastName}` : ''
    return f + m + l
  }

  createInfoList = () => {
    const { guests, guest } = this.props
    const { guestsYes, guestsNo, descriptionsYes, descriptionsNo } = guest.preferences

    let list1 = (
      <li key={uuidv4()} className='yes'><i>None</i></li>
    )

    if (guest.issues.length > 0) {
      list1 = guest.issues.map(issue => (
        <li key={uuidv4()} className='no'>{issue}</li>
      ))
    }

    const list2 = guest.traits.map(trait => (
      <li key={uuidv4()}>{trait}</li>
    ))

    const list3 = guestsYes.map(pref => {
      const guest = guests.find(guest => guest.id === pref)
      return (
        <li key={uuidv4()} className='yes'>
          {this.buildFullName(guest)}
        </li>
      )
    })

    const list4 = guestsNo.map(pref => {
      const guest = guests.find(guest => guest.id === pref)
      return (
        <li key={uuidv4()} className='no'>
          {this.buildFullName(guest)}
        </li>
      )
    })

    const list5 = descriptionsYes.map(pref => (
      <li key={uuidv4()} className='yes'>{pref}</li>
    ))

    const list6 = descriptionsNo.map(pref => (
      <li key={uuidv4()} className='no'>{pref}</li>
    ))

    const list7 = [...list3, ...list4, ...list5, ...list6]

    return (
      <>
        <p>Issues</p>
        {list1}
        <p>Traits</p>
        {list2}
        <p>Preferences</p>
        {list7}<br/>
      </>
    )
  }

  addUnseatButton = () => {
    if (this.props.guest.seated) {
      return (
        <NavLink className='btn unseat' to='/' onClick={this.handleUnseatClick}>Unseat</NavLink>
      )
    }
  }

  handleUnseatClick = () => {
    const { guest, unseatGuest, updateNeighbors, checkForIssues } = this.props
    if (guest && guest.seated) {
      unseatGuest()
      updateNeighbors(guest)
      checkForIssues()
    }
  }

  handleDeleteClick = () => {
    const { guest, deleteGuest, updateNeighbors, checkForIssues } = this.props
    deleteGuest()
    updateNeighbors(guest)
    checkForIssues()
  }

  render() {
    const { event } = this.props
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
  guests: state.currentEvent.guests
})

const mapDispatchToProps = (dispatch) => ({
  unseatGuest: () => dispatch({ type: 'UNSEAT_GUEST' }),
  deleteGuest: () => dispatch({ type: 'DELETE_GUEST' }),
  updateNeighbors: (guest) => dispatch({ type: 'UPDATE_NEIGHBORS', guest}),
  checkForIssues: () => dispatch({ type: 'CHECK_FOR_ISSUES' }),
})

export default connect(mapStateToProps, mapDispatchToProps)(GuestInfo)
