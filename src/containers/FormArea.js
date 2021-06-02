import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import About from '../components/About'
import EventForm from './EventForm'
import GuestForm from '../components/GuestForm'
import PreferencesForm from '../components/PreferencesForm'
import ChecklistForm from '../components/ChecklistForm'
import AccountContainer from './AccountContainer'

const retryLoginOrSignup = (response) => {
  if (response && response.error) {
    return (<Redirect to='/account' />)
  }
}

const FormArea = (props) => (
  <div id='form-area'>
    {retryLoginOrSignup(props.response)}
    <Route exact path='/about' component={About} />
    <Route exact path='/event-form' component={EventForm} />
    <Route exact path='/guest-form' component={GuestForm} />
    <Route exact path='/preferences-form' component={PreferencesForm} />
    <Route exact path='/checklist-form' component={ChecklistForm} />
    <Route exact path='/account' component={AccountContainer} />
  </div>
)

export default FormArea
