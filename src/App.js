import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import { connect } from 'react-redux'
import NavBar from './components/NavBar'
import About from './components/About'
import EventForm from './containers/EventForm'
import GuestForm from './components/GuestForm'
import PreferencesForm from './components/PreferencesForm'
import ChecklistForm from './components/ChecklistForm'
import AccountArea from './components/AccountArea'
import NonEventArea from './components/NonEventArea'
import EventArea from './components/EventArea'
import Footer from './components/Footer'
import './styles/App.css'

class App extends React.Component {

  eventData = {type: 'rect', qty: 18}

  render() {
    const { addEvent, addGuest } = this.props
    const event = this.props.state.currentEvent
    return (
      <Router>
        <>
          <NavBar title={event.name} />
          <Route exact path='/' />
          <Route exact path='/about' component={About} />
          <Route exact path='/event-form' render={() => <EventForm event={event} addEvent={addEvent} />} />
          <Route exact path='/guest-form' render={() => <GuestForm event={event} addGuest={addGuest} />} />
          <Route exact path='/preferences-form' component={PreferencesForm} />
          <Route exact path='/checklist-form' component={ChecklistForm} />
          <Route exact path='/account' component={AccountArea} />
          <NonEventArea guests={event.guests} table={event.table} />
          <EventArea data={this.props.state} />
          <Footer />
        </>
      </Router>
    )
  }
}

const mapStateToProps = (state) => ({ state })

const mapDispatchToProps = dispatch => ({
  addEvent: event => dispatch({ type: 'ADD_EVENT', event }),
  deleteEvent: id => dispatch({ type: 'DELETE_EVENT', id }),
  addGuest: guest => dispatch({ type: 'ADD_GUEST', guest }),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
