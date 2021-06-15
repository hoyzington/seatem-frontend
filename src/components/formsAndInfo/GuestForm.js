import React from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { editEvent } from '../../actions/events'
import { v4 as uuidv4 } from 'uuid'

class GuestForm extends React.Component {
  state = {
    id: uuidv4(),
    firstName: '',
    middleName: '',
    lastName: '',
    neighbors: '',
    guestsYes: '',
    guestsNo: '',
    descriptionsYes: '',
    descriptionsNo: '',
    traits: '',
    seated: false,
    issues: '',
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = () => {
    this.props.editEvent(this.state)
    this.setState({
      firstName: '',
      middleName: '',
      lastName: ''
    })
    document.getElementById('first-name').focus()
  }

  handleClick = () => {
    // if (this.state.first !== '') {
      const event = {
        ...this.props.event,
        guests: [
          ...this.props.event.guests,
          this.state,
        ]
      }
      this.props.editEvent(event)
    // }
  }

  maxGuests = () => {
    const event = this.props.event
    const guests = event.guests.length
    const max = event.guestQty
    return (guests + ' of ' + max)
  }

  render() {
    const { event, errors } = this.props
    if (errors && errors.type === 'newEvent') {
      return (<Redirect to='/new-event' />)
    } else if (event.id !== '' && event.guests.length.toString() === event.guestQty) {
      return (<Redirect to='/add-preferences' />)
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
              value={this.state.firstName}
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
              value={this.state.middleName}
              maxLength='12'/>
          </label>&nbsp;&nbsp;<i>(optional)</i><br/>
          <label>
            Last Name&nbsp;&nbsp;
            <input
              type="text"
              name='last'
              onChange={this.handleChange}
              value={this.state.lastName}
              maxLength='12'/>
          </label>&nbsp;&nbsp;<i>(optional)</i><br/>
          <div id='btn-area'>
            <NavLink className='btn form bottom' to='/add-guests' onClick={this.handleSubmit} >ADD ANOTHER</NavLink>
            <NavLink className='btn form bottom' to='/add-preferences' onClick={this.handleClick} >NEXT STEP</NavLink>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors,
  event: state.events.currentEvent,
})

export default connect(mapStateToProps, { editEvent })(GuestForm)
