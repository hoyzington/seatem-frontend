import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './components/Home'
import About from './components/About'
import GuestForm from './components/GuestForm'
import TableForm from './components/TableForm'
import AccountArea from './components/AccountArea'
import Guests from './containers/Guests'
import GuestInfo from './components/GuestInfo'
import SeatingArea from './containers/SeatingArea'
import Footer from './components/Footer'
import './styles/App.css'

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Route exact path='/' component={Home} />
          <Route exact path='/about' component={About} />
          <Route exact path='/guests' component={GuestForm} />
          <Route exact path='/guests/1' component={GuestInfo} />
          <Route exact path='/table' component={TableForm} />
          <Route exact path='/account' component={AccountArea} />
          <Guests />
          <SeatingArea />
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App
