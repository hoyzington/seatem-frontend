import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/currentUser'

class MyProfile extends React.Component {

  state = {
    username: '',
    email: '',
    password: '',
    editDisplay: false,
  }

  handleClick = () => {
    this.setState({ editDisplay: true })
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = () => {
    console.log('updated')
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

  // clearErrors = () => {
  //   const { user, clearCurrentUser } = this.props
  //   if (user && (user.error || user.errors)) {
  //     clearCurrentUser()
  //   }
  // }

  render() {
    // console.log(this.state)
    const display1 = this.state.editDisplay === true ? 'none' : 'inline'
    const display2 = this.state.editDisplay === true ? 'inline' : 'none'
    return (
      <div id='my-profile' className='card'>
        <NavLink id='exit' to='/' >&times;</NavLink>
        <form>
          <p><b>MY PROFILE</b></p>
          <div className='error'>
            {this.showErrors()}
          </div>
          <label>
            Username: &nbsp;
            <span style={{ display: display1 }}>
              {this.props.user.username}
            </span>
            <input
              type="text"
              name='username'
              onChange={this.handleChange}
              value={this.state.username}
              maxLength='20'
              style={{ display: display2 }}
            />
          </label><br/>
          <label>
            Email: &nbsp;
            <span style={{ display: display1 }}>
              {this.props.user.email}
            </span>
            <input
              type='text'
              name='email'
              onChange={this.handleChange}
              value={this.state.email}
              style={{ display: display2 }}
            />&nbsp;
          </label><br/>
          <label style={{ display: display2 }}>
            Password: &nbsp;
            <input
              type="password"
              name='password'
              onChange={this.handleChange}
              value={this.state.password}
            />
            <br/>
          </label>
          <p style={{ display: display1 }}>
            <i>Click Edit to change password</i>
          </p>
          <div id='btn-area'>
            <button type='button' className='btn form bottom' onClick={this.handleClick} style={{ display: display1 }} >EDIT</button>
            <NavLink className='btn form bottom' to='/my-profile' onClick={this.handleSubmit} style={{ display: display2 }} >UPDATE</NavLink>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.currentUser,
  // descriptions: state.events.currentEvent.descriptions,
  // guests: state.events.currentEvent.guests,
  // selectedGuest: state.events.selectedGuest,
})

export default connect(mapStateToProps, { logout })(MyProfile)
