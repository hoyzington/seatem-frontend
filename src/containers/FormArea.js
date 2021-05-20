import React from 'react'
import { Route } from 'react-router-dom'
import About from '../components/About'
import EventForm from './EventForm'
import GuestForm from '../components/GuestForm'
import PreferencesForm from '../components/PreferencesForm'
import ChecklistForm from '../components/ChecklistForm'
import AccountArea from '../components/AccountArea'

const FormArea = () => (
  <div id='form-area'>
    <Route exact path='/about' component={About} />
    <Route exact path='/event-form' component={EventForm} />
    <Route exact path='/guest-form' component={GuestForm} />
    <Route exact path='/preferences-form' component={PreferencesForm} />
    <Route exact path='/checklist-form' component={ChecklistForm} />
    <Route exact path='/account' component={AccountArea} />
  </div>
)

export default FormArea
