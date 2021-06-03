import React from 'react'
import { NavLink } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

class AccountArea extends React.Component {

  showEvents = (events) => {
    if (events.length > 0) {
      return events.map((event) => (
        <li key={uuidv4()} className='event'><NavLink to={`/events/${event.name}`} onClick={this.props.showEvent} >{event.name}</NavLink></li>
      ))
    }
    return (<i>You have no saved events</i>)
  }

  render() {
    return (
      <>
        <div id='event-list'>
          <p><b>{this.props.user.username}'s Events</b></p>
          {this.showEvents(this.props.events)}
        </div>
        <div id='btn-area'>
          <NavLink className='btn form bottom' to='/' onClick={this.props.handleLogout} >LOG OUT</NavLink>
        </div>
      </>
    )
  }
}

export default AccountArea
