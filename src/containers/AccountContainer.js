import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signup, login, logout, clearCurrentUser } from '../actions/sessions'
import LoginSignupForm from '../components/formsAndInfo/LoginSignupForm'
import AccountInfo from '../components/formsAndInfo/AccountInfo'

class AccountContainer extends React.Component {

  showContent = () => {
    const { user, events } = this.props
    if (user) {
      if (user.error) {
        return (
          <LoginSignupForm
            error={user.error}
            handleSignup={this.signup}
            handleLogin={this.login}
          />
        )
      }
      return (
        <AccountInfo
          user={user}
          events={events}
          handleLogout={this.logout}
        />
      )
    }
    return (
      <LoginSignupForm
        error=''
        handleSignup={this.signup}
        handleLogin={this.login}
      />
    )
  }

  clearError = () => {
    const { currentUser, clearCurrentUser } = this.props
    if (currentUser && currentUser.error) {
      clearCurrentUser()
    }
  }

  signup = (componentState) => {
    const { username, signupEmail, signupPassword } = componentState
    const credentials = {user: {
      username: username,
      email: signupEmail,
      password: signupPassword,
    }}
    this.props.signup(credentials)
    // this.setState({ first: '', mid: '', last: '' })
    // document.getElementById('first-name').focus()
  }

  login = (componentState) => {
    const { loginEmail, loginPassword } = componentState
    const credentials = {user: {
      email: loginEmail,
      password: loginPassword,
    }}
    this.props.login(credentials)
    // this.setState({ first: '', mid: '', last: '' })
    // document.getElementById('first-name').focus()
  }

  logout = () => {
    this.props.logout()
  }

  render() {
    return (
      <div id='account' className='card'>
        <NavLink id='exit' to='/'>
          <span onClick={this.clearError}>&times;</span>
        </NavLink>
        <div>
          <h3>ACCOUNT</h3>
          {/* <p><b>ACCOUNT</b></p> */}
          {this.showContent()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    user: state.currentUser,
    events: state.events.savedEvents,
  })

export default connect(mapStateToProps, { signup, login, logout, clearCurrentUser })(AccountContainer)
