import React from 'react'
import { NavLink, Redirect } from 'react-router-dom'

class GuestForm extends React.Component {
  state = { id: '', first: '', mid: '', last: '' }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  buildFullName = () => {
    const { first, mid, last } = this.state
    const f = first
    const m = mid.length > 0 ? ' ' + mid : ''
    const l = last.length > 0 ? ' ' + last : ''
    return f + m + l
  }

  handleSubmit = e => {
    e.preventDefault()
    const name = this.buildFullName()
    this.props.addGuest(name)
    this.setState({ id: '', first: '', mid: '', last: '' })
    document.getElementById('first-name').focus()
  }

  maxGuests = () => {
    const event = this.props.event
    const guests = event.guests.length
    const max = event.table === 'rnd' ? '12' : '18'
    return (guests + ' of ' + max)
  }

  render() {
    const event = this.props.event
    const roundTable = event.table === 'rnd'
    if (event.guests.length === (roundTable ? 12 : 18)) {
      return (<Redirect to='/' />)
    }
    return (
      <div id='form-or-about' className='card'>
        <NavLink id='exit' to='/'>&times;</NavLink>
        <form onSubmit={this.handleSubmit}>
          <b>ADD GUESTS</b> ({this.maxGuests()} max)<br/>
          <label>
            First Name&nbsp;
            <input
              id='first-name'
              type="text"
              name='first'
              onChange={this.handleChange}
              value={this.state.first}
              maxLength='12'
              autoFocus
              required/>
          </label>&nbsp;<i>(required)</i><br/>
          <label>
            Middle Name&nbsp;
            <input
              type="text"
              name='mid'
              onChange={this.handleChange}
              value={this.state.mid}
              maxLength='12'/>
          </label>&nbsp;<i>(optional)</i><br/>
          <label>
            Last Name&nbsp;
            <input
              type="text"
              name='last'
              onChange={this.handleChange}
              value={this.state.last}
              maxLength='12'/>
          </label>&nbsp;<i>(optional)</i>&nbsp;
          <input type="submit"/>
        </form>
      </div>
    )
  }
}

export default GuestForm
