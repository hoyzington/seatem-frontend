import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../actions/sessions'

class NavBar extends React.Component {

  renderLeftLinks = () => {
    if (this.props.user && this.props.user.username) {
      return (
        <>
          <NavLink className='navbar' to='/' onClick={this.props.logout}>Log Out</NavLink>
          <NavLink className='navbar' to='/about'>About</NavLink>
        </>
      )
    }
  }

  renderRightLinks = () => {
    if (this.props.user && this.props.user.username) {
      return (
        <>
          <NavLink className='navbar' to='/edit-event'>This Event</NavLink>
          <NavLink className='navbar' to='/events'>My Events</NavLink>
          <NavLink className='navbar' to='/new-event'>New Event</NavLink>
        </>
      )
    }
  }

  render() {
    const { event } = this.props
    return (
      <header>
        <nav>
          <span id='logo-bar'>
            <span id='logo'><i>Seat 'em</i></span>
            {this.renderLeftLinks()}
          </span>
          <span id='title-bar'>
            <i>{event ? event.name : ''}</i>
          </span>
          <span id='menu-bar'>
            {this.renderRightLinks()}
          </span>
        </nav>
      </header>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.currentUser,
  events: state.events.savedEvents,
})

export default connect(mapStateToProps, { logout })(NavBar)
