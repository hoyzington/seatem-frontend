import React from 'react'
import { NavLink } from 'react-router-dom'
import { signup, login, logout, clearCurrentUser } from '../actions/sessions'
import { connect } from 'react-redux'
import LoginSignupForm from '../components/LoginSignupForm'
import AccountArea from '../components/AccountArea'

class AccountContainer extends React.Component {

  showContent = () => {
    const user = this.props.currentUser
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
        <AccountArea
          user={user}
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
          <p><b>ACCOUNT</b></p>
          {this.showContent()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    currentUser: state.currentUser,
  })

export default connect(mapStateToProps, { signup, login, logout, clearCurrentUser })(AccountContainer)
