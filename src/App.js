import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import NavBar from './components/NavBar'
import SeatingContainer from './containers/SeatingContainer'
import Footer from './components/Footer'
import './styles/App.css'

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Route exact path='/about' component={''} />
          <Route exact path='/start' component={''} />
          <Route exact path='/account' component={''} />
          <SeatingContainer />
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App
