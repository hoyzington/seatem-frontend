import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import { connect } from 'react-redux'
import { getCurrentUser } from './actions/sessions'
import NavBar from './components/NavBar'
import FormArea from './containers/FormArea'
import NonEventArea from './components/NonEventArea'
import EventArea from './components/EventArea'
import Footer from './components/Footer'
import './styles/App.css'

class App extends React.Component {
  componentDidMount() {
    this.props.getCurrentUser()
  }

  render() {
    const event = this.props.state.events.currentEvent
    const response = this.props.state.currentUser
    return (
      <Router>
        <>
          <NavBar title={event.name} />
          <Route exact path='/' />
          <FormArea response={response} />
          <NonEventArea guests={event.guests} table={event.table} />
          <EventArea data={this.props.state.events} />
          <Footer />
        </>
      </Router>
    )
  }
}

const mapStateToProps = (state) => ({ state })

export default connect(mapStateToProps, { getCurrentUser })(App)
