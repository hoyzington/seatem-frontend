import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './components/Home'
import About from './components/About'
// import GuestForm from './components/GuestForm'
import EventForm from './containers/EventForm'
import AccountArea from './components/AccountArea'
import GuestArea from './containers/GuestArea'
import GuestInfo from './components/GuestInfo'
import EventArea from './components/EventArea'
import Footer from './components/Footer'
import './styles/App.css'

class App extends React.Component {

  eventData = {type: 'rnd', qty: 12}

  render() {
    return (
      <Router>
        <>
          <NavBar />
          <Route exact path='/' component={Home} />
          <Route exact path='/about' component={About} />
          {/* <Route exact path='/guests' component={GuestForm} /> */}
          <Route exact path='/guests/1' component={GuestInfo} />
          <Route exact path='/event-form' component={EventForm} />
          <Route exact path='/account' component={AccountArea} />
          <GuestArea data={this.eventData}/>
          <EventArea data={this.eventData}/>
          <Footer />
        </>
      </Router>
    )
  }
}

export default App
