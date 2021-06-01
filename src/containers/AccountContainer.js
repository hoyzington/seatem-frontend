import React from 'react'
import { NavLink } from 'react-router-dom'
import { signup, login, logout } from '../actions/sessions'
import { connect } from 'react-redux'
import LoginSignupForm from '../components/LoginSignupForm'

class AccountContainer extends React.Component {

  // handleChange = (e) => {
  //   this.setState({ [e.target.name]: e.target.value })
  // }

  signup = () => {
    const credentials = {user: {
      username: this.state.username,
      email: this.state.signupEmail,
      password: this.state.signupPassword,
    }}
    this.props.signup(credentials)
    // this.setState({ first: '', mid: '', last: '' })
    // document.getElementById('first-name').focus()
  }

  login = () => {
    const credentials = {user: {
      email: this.state.loginEmail,
      password: this.state.loginPassword,
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
        <NavLink id='exit' to='/'>&times;</NavLink>
        <div>
          <p><b>Account</b></p>
          <LoginSignupForm
            handleSignup={this.signup}
            handleLogin={this.login}
          />
          <AccountArea
            user={this.props.currentUser}
            handleLogout={this.logout}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    currentUser: state.sessions,
  })

export default connect(mapStateToProps, { signup, login, logout })(AccountContainer)
