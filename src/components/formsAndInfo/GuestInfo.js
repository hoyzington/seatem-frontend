import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { editGuest, unselectGuest, deleteGuest } from '../../actions/guests'
import { editEvent, updateEvent } from '../../actions/events'
import { v4 as uuidv4 } from 'uuid'

class GuestInfo extends React.Component {

  showGuest = () => {
    const { selectedGuest } = this.props
    if (selectedGuest) {
      return (
        <>
          <h4>{this.buildFullName(selectedGuest)}</h4>
          {this.createInfoList()}
          <div id='guest-info-btn-area'>
            {this.addUnseatButton()}
            <NavLink className='btn delete' to='/' onClick={this.handleDeleteClick}>Delete</NavLink>
          </div>
        </>
      )
    }
  }

  buildFullName = (guest) => {
    const { firstName, middleName, lastName } = guest,
          f = firstName,
          m = (middleName.length > 0) ? ` ${middleName}` : '',
          l = (lastName.length > 0) ? ` ${lastName}` : ''
    return f + m + l
  }

  createInfoList = () => {
    const { guests, selectedGuest } = this.props
    const { guestsYes, guestsNo, descriptionsYes, descriptionsNo, traits, issues } = selectedGuest

    let list1 = (
      <li key={uuidv4()} className='yes'><i>None</i></li>
    )

    if (issues.length > 0) {
      list1 = issues.map(issue => (
        <li key={uuidv4()} className='no'>{issue}</li>
      ))
    }

    const list2 = traits.map(trait => (
      <li key={uuidv4()}>{trait}</li>
    ))

    const list3 = guestsYes.map(pref => {
      const guest = guests.find(guest => guest.id === parseInt(pref))
      return (
        <li key={uuidv4()} className='yes'>
          {this.buildFullName(guest)}
        </li>
      )
    })

    const list4 = guestsNo.map(pref => {
      const guest = guests.find(guest => guest.id === parseInt(pref))
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
      <div id='guest-info-list'>
        <p>Issues</p>
        <ul>{list1}</ul>
        <p>Traits</p>
        <ul>{list2}</ul>
        <p>Preferences</p>
        <ul>{list7}</ul>
      </div>
    )
  }

  addUnseatButton = () => {
    if (this.props.selectedGuest.seated) {
      return (
        <NavLink className='btn unseat' to='/' onClick={this.handleUnseatClick}>Unseat</NavLink>
      )
    }
  }

  handleUnseatClick = () => {
    const { event, editEvent, updateEvent, selectedGuest, editGuest, unselectGuest } = this.props
    const affectedGuests = [
      this.makeGuestUpdate(),
      ...this.updatePrevNeighbors(),
    ]
    const updatedGuests = this.createUpdatedGuests(affectedGuests)
    const updatedChairs = this.updateChairs()
    const eventChanges = {
      chairs: updatedChairs,
      guests: updatedGuests,
    }
    updateEvent(event.id, eventChanges)
    unselectGuest()
    const selectedGuestJson = {
      neighbors: selectedGuest.neighbors.join(','),
      seated: false,
    }
    editGuest(selectedGuest.id, selectedGuestJson)
    affectedGuests.slice(1).forEach(guest => {
      const guestJson = {
        neighbors: guest.neighbors.join(','),
      }
      editGuest(guest.id, guestJson)
    })
    const eventJson = {
      chairs: updatedChairs.join(','),
    }
    editEvent(event.id, eventJson)
  }

  makeGuestUpdate = () => {
    return {
      ...this.props.selectedGuest,
      neighbors: [],
      seated: false,
    }
  }

  updatePrevNeighbors = () => {
    const neighbors = this.props.selectedGuest.neighbors
    if (neighbors.length > 0) {
      return neighbors.map(id => this.updatePrevNeighbor(id))
    }
    return []
  }

  updatePrevNeighbor = (id) => {
    const { guests, selectedGuest } = this.props
    const neighbor = guests.find(guest => guest.id.toString() === id)
    const nbrArray = neighbor.neighbors.filter(nbrId => nbrId !== selectedGuest.id.toString())
    return {
      ...neighbor,
      neighbors: nbrArray,
    }
  }
  
  createUpdatedGuests = (affectedGuests, deletedId) => {
    const { guests } = this.props
    let updatedGuests = guests
    affectedGuests.forEach(affectedGuest => {
      const guestIdx = guests.findIndex(guest => guest.id === affectedGuest.id)
      updatedGuests = [
        ...updatedGuests.slice(0, guestIdx),
        affectedGuest,
        ...updatedGuests.slice(guestIdx + 1),
      ]
    })
    if (deletedId) {
      const deletedGuestIdx = guests.findIndex(guest => guest.id === deletedId)
      updatedGuests = [
        ...updatedGuests.slice(0, deletedGuestIdx),
        ...updatedGuests.slice(deletedGuestIdx + 1),
      ]
    }
    return updatedGuests
  }

  updateChairs = () => {
    const { event, selectedGuest } = this.props
    const chairIdx = event.chairs.findIndex(chair => chair === selectedGuest.id.toString())
    return [
      ...event.chairs.slice(0, chairIdx),
      '',
      ...event.chairs.slice(chairIdx + 1),
    ]
  }
  
  handleDeleteClick = () => {
    const { event, updateEvent, editEvent, selectedGuest, unselectGuest, deleteGuest } = this.props
    const affectedGuests = this.updatePrevNeighbors()
    const updatedGuests = this.createUpdatedGuests(affectedGuests, selectedGuest.id)
    const updatedChairs = this.updateChairs()
    let eventChanges
    if (selectedGuest.seated) {
      eventChanges = {
        chairs: updatedChairs,
        guests: updatedGuests,
      }
    } else {
      eventChanges = { guests: updatedGuests }
    }
    unselectGuest()
    updateEvent(event.id, eventChanges)
    affectedGuests.forEach(guest => {
      const guestJson = {
        neighbors: guest.neighbors.join(','),
      }
      editGuest(guest.id, guestJson)
    })
    deleteGuest(selectedGuest.id)
    if (selectedGuest.seated) {
      const eventJson = { chairs: updatedChairs.join() }
      editEvent(event.id, eventJson)
    }
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
  event: state.events.currentEvent,
  selectedGuest: state.events.selectedGuest,
  guests: state.events.currentEvent.guests
})

export default connect(mapStateToProps, { editEvent, updateEvent, editGuest, unselectGuest, deleteGuest })(GuestInfo)
