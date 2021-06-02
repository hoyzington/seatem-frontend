import React from 'react'
import { NavLink } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

class AccountArea extends React.Component {

  showEvents = (user) => {
    const { events } = user.data.attributes
    if (events.length > 0) {
      return events.map((event) => (
        <li key={uuidv4()} className='event'><NavLink to={`/events/${event.name}`} onClick={this.props.showEvent} >{event.name}</NavLink></li>
      ))
    }
    return (<i>You have no saved events</i>)
  }

  render() {
    // console.log(this.props.user)
    return (
      <>
        <div id='event-list'>
          <p><b>{this.props.user.data.attributes.username}'s Events</b></p>
          {this.showEvents(this.props.user)}
        </div>
        <div id='btn-area'>
          <NavLink className='btn form bottom' to='/' onClick={this.props.handleLogout} >LOG OUT</NavLink>
        </div>
      </>
    )
  }
}

export default AccountArea
