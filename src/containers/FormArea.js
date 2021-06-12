import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCurrentUser, logout } from '../actions/currentUser'
import About from '../components/formsAndInfo/About'
import LoginSignupForm from '../components/formsAndInfo/LoginSignupForm'
import Account from '../components/formsAndInfo/Account'
import MyProfile from '../components/formsAndInfo/MyProfile'
import EditProfile from '../components/formsAndInfo/EditProfile'
import EventsList from '../components/formsAndInfo/EventsList'
import NewEventForm from '../components/formsAndInfo/NewEventForm'
import GuestForm from '../components/formsAndInfo/GuestForm'
import PreferencesForm from '../components/formsAndInfo/PreferencesForm'
import ChecklistForm from '../components/formsAndInfo/ChecklistForm'
import EventMenu from '../components/formsAndInfo/EventMenu'

class FormArea extends React.Component {

  state = { startCard: true }

  componentDidMount() {
    if (!this.props.user) {
      this.props.getCurrentUser()
    }
  }

  renderFormOrInfo = (showStartCard) => {
    const { user, event, errors } = this.props
    if (errors) {
      if (this.state.startCard) {
        this.setState({ startCard: false })
      }
      switch (errors.type) {
        case 'login':
        case 'signup':
          return (<Redirect to='/login-signup' />)
        case 'userUpdate':
          return (<Redirect to='/edit-profile' />)
        case 'newEvent':
          return (<Redirect to='/new-event' />)
        // case 'eventUpdate':
        //   return (<Redirect to='/edit-event' />)
        case 'newGuest':
          return (<Redirect to='/add-guests' />)
        case 'guestUpdate':
          return (<Redirect to='/add-preferences' />)
        default:
          break;
      }
    } else if (!event && this.state.startCard) {
      if (user) {
        return (<Redirect to='/events' />)
      } else {
        return (<Redirect to='/about' />)
      }
    }
  }

  render() {
    const { user, event } = this.props
    return (
      <div id='form-area'>
        <Route exact path='/about' render={() => (<About user={user} />)} />
        <Route exact path='/login-signup' component={LoginSignupForm} />
        <Route exact path='/account' render={() => (<Account logout={logout} />)} />
        <Route exact path='/my-profile' render={() => (<MyProfile user={user} />)} />
        <Route exact path='/edit-profile' component={EditProfile} />
        <Route exact path='/new-event' component={NewEventForm} />
        {/* <Route exact path='/edit-event' component={EventForm} /> */}
        <Route exact path='/add-guests' component={GuestForm} />
        <Route exact path='/add-preferences' component={PreferencesForm} />
        <Route exact path='/checklist' component={ChecklistForm} />
        <Route exact path='/events' component={EventsList} />
        <Route exact path='/event-menu' render={() => (<EventMenu event={event} />)} />
        {this.renderFormOrInfo()}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.currentUser,
  event: state.events.currentEvent,
  errors: state.errors,
})

export default connect(mapStateToProps, { getCurrentUser })(FormArea)
