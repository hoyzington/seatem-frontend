import React from 'react'
import { NavLink } from 'react-router-dom'

class GuestForm extends React.Component {
  state = { first: '', mid: null, last: null }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  buildFullName = () => {
    const { first, mid, last } = this.state
    const f = first
    const m = mid ? ' ' + mid : ''
    const l = last ? ' ' + last : ''
    return f + m + l
  }

  handleSubmit = e => {
    e.preventDefault()
    const name = this.buildFullName()
    console.log(name)
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
              value={this.state.first}
              maxLength='12'
              autoFocus
              required/>
          </label>&nbsp;<i>required</i>
          <label>
            Middle Name&nbsp;
            <input
              type="text"
              name='mid'
              onChange={this.handleChange}
              value={this.state.mid}
              maxLength='12'/>
          </label>&nbsp;<i>optional</i>
          <label>
            Last Name&nbsp;
            <input
              type="text"
              name='last'
              onChange={this.handleChange}
              value={this.state.last}
              maxLength='12'/>
          </label>&nbsp;<i>optional</i>
          <input type="submit"/>
        </form>
      </div>
    )
  }
}

export default GuestForm
