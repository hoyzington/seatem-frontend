import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import About from '../components/formsAndInfo/About'
import LoginSignupForm from '../components/formsAndInfo/LoginSignupForm'
import Account from '../components/formsAndInfo/Account'
import MyProfile from '../components/formsAndInfo/MyProfile'
import EventsList from '../components/formsAndInfo/EventsList'
import NewEventForm from '../components/formsAndInfo/NewEventForm'
import GuestForm from '../components/formsAndInfo/GuestForm'
import PreferencesForm from '../components/formsAndInfo/PreferencesForm'
import ChecklistForm from '../components/formsAndInfo/ChecklistForm'
import EventMenu from '../components/formsAndInfo/EventMenu'

const renderFormOrInfo = (user, event) => {
  if (user) {
    if (user.error || user.errors) {
      return (<Redirect to='/login-signup' />)
    } else if (!event) {
      return (<Redirect to='/events' />)
    }
  } else {
    return (<Redirect to='/about' />)
  }
}

const FormArea = (props) => (
  <div id='form-area'>
    {renderFormOrInfo(props.user, props.event)}
    <Route exact path='/about' render={() => (<About user={props.user} />)} />
    <Route exact path='/login-signup' component={LoginSignupForm} />
    <Route exact path='/account' component={Account} />
    <Route exact path='/my-profile' component={MyProfile} />
    <Route exact path='/new-event' component={NewEventForm} />
    {/* <Route exact path='/edit-event' component={EventForm} /> */}
    <Route exact path='/add-guests' component={GuestForm} />
    <Route exact path='/add-preferences' component={PreferencesForm} />
    <Route exact path='/checklist' component={ChecklistForm} />
    <Route exact path='/events' component={EventsList} />
    <Route exact path='/event-menu' render={() => (<EventMenu event={props.event} />)} />
  </div>
)

export default FormArea
