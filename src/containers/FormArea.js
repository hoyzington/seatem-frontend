import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import About from '../components/formsAndInfo/About'
import EventForm from '../components/formsAndInfo/EventForm'
import GuestForm from '../components/formsAndInfo/GuestForm'
import PreferencesForm from '../components/formsAndInfo/PreferencesForm'
import ChecklistForm from '../components/formsAndInfo/ChecklistForm'
import AccountContainer from './AccountContainer'
import EventsList from '../components/formsAndInfo/EventsList'

const renderFormOrInfo = (user, event) => {
  if (user) {
    if (user.error) {
      return (<Redirect to='/account' />)
    } else if (!event) {
      return (<Redirect to='/events' />)
    }
  } else if (!event) {
    return (<Redirect to='/about' />)
  }
}

const FormArea = (props) => (
  <div id='form-area'>
    {renderFormOrInfo(props.user, props.event)}
    <Route exact path='/about' component={About} />
    <Route exact path='/event-form' component={EventForm} />
    <Route exact path='/guest-form' component={GuestForm} />
    <Route exact path='/preferences-form' component={PreferencesForm} />
    <Route exact path='/checklist-form' component={ChecklistForm} />
    <Route exact path='/account' component={AccountContainer} />
    <Route exact path='/events' component={EventsList} />
  </div>
)

export default FormArea
