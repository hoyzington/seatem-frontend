import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signup, login } from '../../actions/currentUser'
import { clearErrors } from '../../actions/errors'
import { v4 as uuidv4 } from 'uuid'

class LoginSignupForm extends React.Component {

  state = { loginEmail: '', loginPassword: '', username: '', signupEmail: '', signupPassword: '' }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  showLoginError = () => {
    const { errors } = this.props
    if (errors && errors.type === 'login') {
      return (<p>{errors.content}</p>)
    }
  }

  showSignupErrors = () => {
    const { errors } = this.props
    if (errors && errors.type === 'signup') {
      return (
        <p>
          {errors.content.map(error => (
            <li key={uuidv4()}>{error}</li>
          ))}
        </p>
      )
    }
  }

  clearErrors = () => {
    if (this.props.errors) {
      this.props.clearErrors()
    }
  }

  login = (componentState) => {
    const { loginEmail, loginPassword } = componentState
    const credentials = {user: {
      email: loginEmail,
      password: loginPassword,
    }}
    this.props.login(credentials)
  }

  signup = (componentState) => {
    const { username, signupEmail, signupPassword } = componentState
    const credentials = {user: {
      username: username,
      email: signupEmail,
      password: signupPassword,
    }}
    this.props.signup(credentials)
  }

  render() {
    return (
      <div id='login-signup' className='card'>
        <div className='block left'>
          <p><b>LOG IN</b></p>
          <div className='error'>
            {this.showLoginError()}
          </div>
        </div>
        <div className='block'>
          <p><b>SIGN UP</b>
          <NavLink
            className='btn back'
            to='/about'
            onClick={this.clearErrors}
          >BACK</NavLink></p>
          <div className='error'>
            {this.showSignupErrors()}
          </div>
        </div>
        <form className='block left'>
          <label>
            Email&nbsp;&nbsp;
            <input
              id='email'
              type="text"
              name='loginEmail'
              onChange={this.handleChange}
              value={this.state.loginEmail}
              autoFocus
              required
            />
          </label><br/>
          <label>
            Password&nbsp;&nbsp;
            <input
              type="text"
              name='loginPassword'
              onChange={this.handleChange}
              value={this.state.loginPassword}
              required
            />
          </label><br/><br/>
          <div id='btn-area'>
            <NavLink className='btn form bottom' to='/' onClick={() => this.login(this.state)} >LOG IN</NavLink>
          </div>
        </form>
        <form className='block'>
          <label>
            Username&nbsp;&nbsp;
            <input
              id='username'
              type="text"
              name='username'
              onChange={this.handleChange}
              value={this.state.username}
              required
            />
          </label><br/>
          <label>
            Email&nbsp;&nbsp;
            <input
              id='email'
              type="text"
              name='signupEmail'
              onChange={this.handleChange}
              value={this.state.signupEmail}
              required
            />
          </label><br/>
          <label>
            Password&nbsp;&nbsp;
            <input
              type="text"
              name='signupPassword'
              onChange={this.handleChange}
              value={this.state.signupPassword}
              required
            />
          </label><br/>
          <div id='btn-area'>
            <NavLink className='btn form bottom' to='/' onClick={() => this.signup(this.state)} >SIGN UP</NavLink>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    events: state.events.savedEvents,
    errors: state.errors,
  })

export default connect(mapStateToProps, { signup, login, clearErrors })(LoginSignupForm)
