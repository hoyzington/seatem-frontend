import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signup, login, clearCurrentUser } from '../../actions/sessions'

class LoginSignupForm extends React.Component {

  state = { loginEmail: '', loginPassword: '', username: '', signupEmail: '', signupPassword: '' }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  showError = () => {
    const { user } = this.props
    if (user && user.error) {
      return (<p>{user.error}</p>)
    }
  }

  showErrors = () => {
    const { user } = this.props
    if (user && user.errors) {
      return (
        <p>
          {user.errors.map(error => (<li>{error}</li>))}
        </p>
      )
    }
  }

  clearErrors = () => {
    const { user, clearCurrentUser } = this.props
    if (user && (user.error || user.errors)) {
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
  }

  login = (componentState) => {
    const { loginEmail, loginPassword } = componentState
    const credentials = {user: {
      email: loginEmail,
      password: loginPassword,
    }}
    this.props.login(credentials)
  }

  render() {
    return (
      <div id='login-signup' className='card'>
        <div className='block left'>
          <p><b>LOG IN</b></p>
          <div className='error'>
            {this.showError()}
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
            {this.showErrors()}
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
    user: state.currentUser,
    events: state.events.savedEvents,
  })

export default connect(mapStateToProps, { signup, login, clearCurrentUser })(LoginSignupForm)
