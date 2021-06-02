import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import About from '../components/formsAndInfo/About'
import EventForm from '../components/formsAndInfo/EventForm'
import GuestForm from '../components/formsAndInfo/GuestForm'
import PreferencesForm from '../components/formsAndInfo/PreferencesForm'
import ChecklistForm from '../components/formsAndInfo/ChecklistForm'
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
