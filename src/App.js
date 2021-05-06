import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import { connect } from 'react-redux'
import NavBar from './components/NavBar'
import Home from './components/Home'
import About from './components/About'
import GuestForm from './components/GuestForm'
import EventForm from './containers/EventForm'
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
          <Route exact path='/' component={Home} />
          <Route exact path='/about' component={About} />
          <Route exact path='/event-form' render={() => <EventForm event={event} addEvent={addEvent} />} />
          <Route exact path='/guest-form' render={() => <GuestForm event={event} addGuest={addGuest} />} />
          <Route exact path='/account' component={AccountArea} />
          <EventArea data={this.props.state} />
          <NonEventArea guests={event.guests} table={event.table} />
          <Footer />
        </>
      </Router>
    )
  }
}

const mapStateToProps = state => ({ state })

const mapDispatchToProps = dispatch => ({
  addEvent: event => dispatch({ type: 'ADD_EVENT', event }),
  deleteEvent: id => dispatch({ type: 'DELETE_EVENT', id }),
  addGuest: name => dispatch({ type: 'ADD_GUEST', name })
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
