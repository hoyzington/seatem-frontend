import React from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class GuestForm extends React.Component {
  state = { first: '', mid: '', last: '' }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = () => {
    this.props.addGuest(this.state)
    this.setState({ first: '', mid: '', last: '' })
    document.getElementById('first-name').focus()
  }

  handleClick = () => {
    if (this.state.first !== '') {
      this.props.addGuest(this.state)
    }
  }

  maxGuests = () => {
    const event = this.props.event
    const guests = event.guests.length
    const max = event.guestQty
    return (guests + ' of ' + max)
  }

  render() {
    const event = this.props.event
    if (event.guests.length === event.chairs.length) {
      return (<Redirect to='/preferences-form' />)
    }
    return (
      <div id='guest-form' className='card'>
        <NavLink id='exit' to='/'>&times;</NavLink>
        <form>
          <p><b>ADD GUESTS</b> ({this.maxGuests()})</p>
          <label>
            First Name&nbsp;&nbsp;
            <input
              id='first-name'
              type="text"
              name='first'
              onChange={this.handleChange}
              value={this.state.first}
              maxLength='12'
              autoFocus
              required/>
          </label>&nbsp;&nbsp;<i>(required)</i><br/>
          <label>
            Middle Name&nbsp;&nbsp;
            <input
              type="text"
              name='mid'
              onChange={this.handleChange}
              value={this.state.mid}
              maxLength='12'/>
          </label>&nbsp;&nbsp;<i>(optional)</i><br/>
          <label>
            Last Name&nbsp;&nbsp;
            <input
              type="text"
              name='last'
              onChange={this.handleChange}
              value={this.state.last}
              maxLength='12'/>
          </label>&nbsp;&nbsp;<i>(optional)</i><br/>
          <div id='btn-area'>
            <NavLink className='btn form bottom' to='/guest-form' onClick={this.handleSubmit} >ADD ANOTHER</NavLink>
            <NavLink className='btn form bottom' to='/preferences-form'onClick={this.handleClick} >NEXT STEP</NavLink>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  // user: state.user,
  event: state.events.currentEvent,
})

const mapDispatchToProps = dispatch => ({
  addGuest: (guest) => dispatch({ type: 'ADD_GUEST', guest })
})

export default connect(mapStateToProps, mapDispatchToProps)(GuestForm)
