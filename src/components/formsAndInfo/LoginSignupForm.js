import React from 'react'
import { NavLink } from 'react-router-dom'

class LoginSignupForm extends React.Component {
  state = { loginEmail: '', loginPassword: '', username: '', signupEmail: '', signupPassword: '' }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { handleLogin, handleSignup, error } = this.props
    // console.log(error)
    return (
      <>
        <div id='error'>{error}</div>
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
            <NavLink className='btn form bottom' to='/' onClick={() => handleLogin(this.state)} >LOG IN</NavLink>
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
            <NavLink className='btn form bottom' to='/' onClick={() => handleSignup(this.state)} >SIGN UP</NavLink>
          </div>
        </form>
      </>
    )
  }
}

export default LoginSignupForm
