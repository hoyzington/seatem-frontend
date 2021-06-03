import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { showEvent } from '../../actions/events'

class EventsList extends React.Component {

  showEvents = () => {
    if (this.props.events.length > 0) {
      return this.props.events.map((event) => (
        <li key={event.id} className='event' ><NavLink to={`/events/${event.name}`} className='event' onClick={() => this.props.showEvent(event)} ><b>{event.name}</b></NavLink></li>
      ))
    }
    return (<i>You have no saved events</i>)
  }

  render() {
    return (
      <div id='events' className='card'>
        <NavLink id='exit' to='/'>&times;</NavLink>
        <h3>{this.props.user.username}'s Events</h3>
        <div id='event-list'>
          <ul>{this.showEvents()}</ul>
        </div>
        <div id='btn-area'>
          <NavLink className='btn form bottom' to='/new-event' >NEW EVENT</NavLink>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.currentUser,
  events: state.events.savedEvents,
})

export default connect(mapStateToProps, { showEvent })(EventsList)
