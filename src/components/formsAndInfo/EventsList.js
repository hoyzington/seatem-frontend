import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { showEvent } from '../../actions/events'

class EventsList extends React.Component {

  showEvents = () => {
    if (this.props.events.length > 0) {
      return this.props.events.map((event) => (
        <li key={event.id} className='event'><NavLink to={`/events/${event.name}`} onClick={() => this.props.showEvent(event)} >{event.name}</NavLink></li>
      ))
    }
    return (<i>You have no saved events</i>)
  }

  beginNewEvent = () => {

  }

  render() {
    return (
      <>
        <div id='event-list'>
          <h3>{this.props.user.username}'s Events</h3>
          {this.showEvents()}
        </div>
        <div id='btn-area'>
          <NavLink className='btn form bottom' to='/' onClick={this.beginNewEvent} >NEW EVENT</NavLink>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.currentUser,
  events: state.events.savedEvents,
})

export default connect(mapStateToProps, { showEvent })(EventsList)
