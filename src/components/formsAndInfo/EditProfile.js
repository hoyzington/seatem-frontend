import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { editUser } from '../../actions/currentUser'
import CloseXClearErrors from './CloseXClearErrors'
import { v4 as uuidv4 } from 'uuid'

class EditProfile extends React.Component {

  state = {
    username: '',
    email: '',
    password: '',
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = () => {
    const state = this.state
    const update = Object.keys(state).reduce((newObj, key) => {
      if (state[key] !== '') {
        newObj[key] = state[key]
      }
      return newObj
    }, {})
    const updatedUser = {
      id: this.props.user.id,
      ...update,
    }
    this.props.editUser(updatedUser)
  }

  showErrors = () => {
    const { errors } = this.props
    if (errors) {
      return (
        <p>
          {errors.content.map(error => (
            <li key={uuidv4()}>{error}</li>
          ))}
        </p>
      )
    }
  }

  render() {
    return (
      <div id='my-profile' className='card'>
        <CloseXClearErrors />
        <form>
          <p><b>EDIT PROFILE</b></p>
          <div className='error'>
            {this.showErrors()}
          </div>
          <label>
            Username: &nbsp;
            <input
              type="text"
              name='username'
              onChange={this.handleChange}
              value={this.state.username}
              maxLength='20'
              placeholder={this.props.user.username}
            />
          </label><br/>
          <label>
            Email: &nbsp;
            <input
              type='text'
              name='email'
              onChange={this.handleChange}
              value={this.state.email}
              placeholder={this.props.user.email}
            />&nbsp;
          </label><br/>
          <label>
            Password: &nbsp;
            <input
              type="password"
              name='password'
              onChange={this.handleChange}
              value={this.state.password}
            />
            <br/>
          </label>
          <div id='btn-area'>
            <NavLink className='btn form bottom' to='/my-profile' onClick={this.handleSubmit} >UPDATE</NavLink>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.currentUser,
  errors: state.errors,
})

export default connect(mapStateToProps, { editUser })(EditProfile)
