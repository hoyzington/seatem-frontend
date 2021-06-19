import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCurrentUser, logout, deleteUser } from '../actions/currentUser'
import { deleteEvent } from '../actions/events'
import About from '../components/formsAndInfo/About'
import LoginSignupForm from '../components/formsAndInfo/LoginSignupForm'
import Account from '../components/formsAndInfo/Account'
import MyProfile from '../components/formsAndInfo/MyProfile'
import EditProfile from '../components/formsAndInfo/EditProfile'
import EventsList from '../components/formsAndInfo/EventsList'
import NewEventForm from '../components/formsAndInfo/NewEventForm'
import EditEvent from '../components/formsAndInfo/EditEvent'
import GuestForm from '../components/formsAndInfo/GuestForm'
import PreferencesForm from '../components/formsAndInfo/PreferencesForm'
import ChecklistForm from '../components/formsAndInfo/ChecklistForm'
import EventMenu from '../components/formsAndInfo/EventMenu'

class FormArea extends React.Component {

  componentDidMount() {
    if (!this.props.user) {
      this.props.getCurrentUser()
    }
  }

  startingContent = () => {
    const { user, event } = this.props
    if (user) {
      if (!event) {
        return (<EventsList />)
      }
    } else {
      return (<About user={user} zStyle={this.zStyle()}/>)
    }
  }

  zStyle = () => {
    if (this.props.user) {
      return ({ zIndex: '1' })
    }
    return
  }

  handleErrors = () => {
    const { errors } = this.props
    if (errors) {
      switch (errors.type) {
        case 'login':
        case 'signup':
          return (<Redirect to='/login-signup' />)
        case 'userUpdate':
          return (<Redirect to='/edit-profile' />)
        case 'newEvent':
          return (<Redirect to='/new-event' />)
        case 'eventUpdate':
          return (<Redirect to='/edit-event' />)
        case 'newGuest':
          return (<Redirect to='/add-guests' />)
        case 'guestUpdate':
          return (<Redirect to='/add-preferences' />)
        default:
          break;
      }
    }
  }
    
  render() {
    const { user, event, logout, deleteUser } = this.props
    return (
      <div id='form-area'>
        {this.startingContent()}
        <Route exact path='/about' render={() => (<About user={user} zStyle={this.zStyle()} />)} />
        <Route exact path='/login-signup' component={LoginSignupForm} />
        <Route exact path='/account' render={() => (<Account logout={logout} />)} />
        <Route exact path='/my-profile' render={() => (<MyProfile user={user} deleteUser={deleteUser} />)} />
        <Route exact path='/edit-profile' component={EditProfile} />
        <Route exact path='/new-event' component={NewEventForm} />
        <Route exact path='/edit-event' component={EditEvent} />
        <Route exact path='/add-guests' component={GuestForm} />
        <Route exact path='/add-preferences' component={PreferencesForm} />
        <Route exact path='/checklist' component={ChecklistForm} />
        <Route exact path='/events' render={() => (<EventsList style={this.zStyle} />)} />
        <Route exact path='/event-menu' render={() => (<EventMenu event={event} deleteEvent={this.props.deleteEvent} />)} />
        {this.handleErrors()}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.currentUser,
  event: state.events.currentEvent,
  errors: state.errors,
})

export default connect(mapStateToProps, { getCurrentUser, logout, deleteUser, deleteEvent })(FormArea)
