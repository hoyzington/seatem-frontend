import React from 'react'
import { NavLink } from 'react-router-dom'
import { login, signup } from '../actions/sessions'
import { connect } from 'react-redux'

class LoginForm extends React.Component {
  state = { loginEmail: '', loginPassword: '', username: '', signupEmail: '', signupPassword: '' }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleLogin = () => {
    const credentials = {user: {
      email: this.state.loginEmail,
      password: this.state.loginPassword,
    }}
    this.props.login(credentials)
    // this.setState({ first: '', mid: '', last: '' })
    // document.getElementById('first-name').focus()
  }

  handleSignup = () => {
    const credentials = {user: {
      username: this.state.username,
      email: this.state.signupEmail,
      password: this.state.signupPassword,
    }}
    this.props.signup(credentials)
    // this.setState({ first: '', mid: '', last: '' })
    // document.getElementById('first-name').focus()
  }

  render() {
    return (
      <div id='login-form' className='card'>
        <NavLink id='exit' to='/'>&times;</NavLink>
        <form>
          <p><b>LOG IN</b></p>
          <label>
            Email&nbsp;
            <input
              id='email'
              type="text"
              name='loginEmail'
              onChange={this.handleChange}
              value={this.state.loginEmail}
              autoFocus
              required
            />
          </label>&nbsp;<br/>
          <label>
            Password&nbsp;
            <input
              type="text"
              name='loginPassword'
              onChange={this.handleChange}
              value={this.state.loginPassword}
              required
            />
          </label><br/>
          <div id='btn-area'>
            <NavLink className='btn form bottom' to='/' onClick={this.handleLogin} >LOG IN</NavLink>
          </div>
        </form>
        <form>
          <p><b>SIGN UP</b></p>
          <label>
            Username&nbsp;
            <input
              id='username'
              type="text"
              name='username'
              onChange={this.handleChange}
              value={this.state.username}
              required
            />
          </label>&nbsp;<br/>
          <label>
            Email&nbsp;
            <input
              id='email'
              type="text"
              name='signupEmail'
              onChange={this.handleChange}
              value={this.state.signupEmail}
              required
            />
          </label>&nbsp;<br/>
          <label>
            Password&nbsp;
            <input
              type="text"
              name='signupPassword'
              onChange={this.handleChange}
              value={this.state.signupPassword}
              required
            />
          </label><br/>
          <div id='btn-area'>
            <NavLink className='btn form bottom' to='/' onClick={this.handleSignup} >SIGN UP</NavLink>
          </div>
        </form>
      </div>
    )
  }
}

// const mapStateToProps = (state) => ({
//     email: state.loginForm.email,
//     password: state.loginForm.password,
//   })

export default connect(null, { login, signup })(LoginForm)
