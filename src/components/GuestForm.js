import React from 'react'
import { NavLink } from 'react-router-dom'

class GuestForm extends React.Component {
  state = { first: '', middle: null, last: null }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
  }

  render() {
    return (
      <div id='form-or-about' className='card'>
        <NavLink id='exit' to='/'>&times;</NavLink>
        <form onSubmit={this.handleSubmit}>
          <p>Add guests ({this.props.maxGuests} max)</p>
          <label>
            First Name&nbsp;
            <input
              type="text"
              name='first'
              onChange={this.handleChange}
              value={this.state.name}
              maxLength='12'
              autoFocus
              required/>
          </label>&nbsp;<i>required</i>
          <label>
            Middle Name&nbsp;
            <input
              type="text"
              name='first'
              onChange={this.handleChange}
              value={this.state.name}
              maxLength='12'
              autoFocus/>
          </label>&nbsp;<i>optional</i>
          <label>
            Last Name&nbsp;
            <input
              type="text"
              name='first'
              onChange={this.handleChange}
              value={this.state.name}
              maxLength='12'
              autoFocus/>
          </label>&nbsp;<i>optional</i>
          <input type="submit"/>
        </form>
      </div>
    )
  }
}

export default GuestForm
