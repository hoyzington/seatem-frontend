import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import NavBar from './components/NavBar'
import Guests from './containers/Guests'
import SeatingArea from './containers/SeatingArea'
import Footer from './components/Footer'
import './styles/App.css'

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Route exact path='/about' component={''} />
          <Route exact path='/guests' component={''} />
          <Route exact path='/table' component={''} />
          <Route exact path='/account' component={''} />
          <Guests />
          <SeatingArea />
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App
