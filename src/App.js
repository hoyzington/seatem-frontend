import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import { connect } from 'react-redux'
import { getCurrentUser } from './actions/currentUser'
import NavBar from './components/NavBar'
import FormArea from './containers/FormArea'
import NonEventArea from './containers/NonEventArea'
import EventArea from './containers/EventArea'
import Footer from './components/Footer'
import './styles/App.css'

class App extends React.Component {
  componentDidMount() {
    this.props.getCurrentUser()
  }

  renderCurrentEvent = () => {
    const { event } = this.props
    if (event) {
      return (
        <>
          <NonEventArea table={event.table} />
          <EventArea event={event} />
        </>
      )
    }
  }

  render() {
    const { user, event, errors } = this.props
    return (
      <Router>
        <>
          <NavBar user={user} event={event} />
          <Route exact path='/' />
          <FormArea user={user} event={event} errors={errors} />
          {this.renderCurrentEvent()}
          <Footer />
        </>
      </Router>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.currentUser,
  event: state.events.currentEvent,
  errors: state.errors,
})

export default connect(mapStateToProps, { getCurrentUser })(App)
