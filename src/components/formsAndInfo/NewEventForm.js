import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { clearCurrentEvent, createEvent } from '../../actions/events'

class NewEventForm extends React.Component {
  state = { name: '', table: 'rect', chairs: [], guests: '', guestQty: '0', descriptions: '', newlyAffectedGuests: '' }

  componentDidMount() {
    this.props.clearCurrentEvent()
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = () => {
    let submittedState = this.state
    let qty = parseInt(this.state.guestQty)
    if (qty < 5) {
      submittedState.chairs = [null, null, null, null]
    } else {
      if (qty %2 !== 0) qty += 1
      for (let i = qty; i > 0; i--) {
        submittedState.chairs.push(null)
      }
    }
    const chairString = submittedState.chairs.join(',')
    const event = {event: {
      ...this.state,
      chairs: chairString,
      user_id: this.props.user.id,
    }}
    this.props.createEvent(event)
  }

  render() {
    return (
      <div id='event-form' className='card'>
        <NavLink id='exit' to='/'>&times;</NavLink>
        <form>
          <p><b>ADD AN EVENT</b></p>
          <label>
            Event Name&nbsp;&nbsp;
            <input
              type="text"
              name='name'
              onChange={this.handleChange}
              value={this.state.name}
              maxLength='30'
              autoFocus
              required/>
            <br/>
          </label>
          <label>Table </label>
          <label>
            <input
              type="radio"
              name='table'
              value='rect'
              onChange={this.handleChange}
              checked/>
            Rectangular&nbsp;
          </label>
          <label>
            <input
              type="radio"
              name='table'
              value='rnd'
              onChange={this.handleChange}/>
            Round
            <br/>
          </label>
          <label>
            Number of Guests&nbsp;&nbsp;
            <input
              type='number'
              name='guestQty'
              onChange={this.handleChange}
              value={this.state.guestQty}
              max={this.state.table === 'rnd' ? '12' : '26'}
              required/>&nbsp;
          </label><br/>
          <div id='btn-area'>
            <NavLink className='btn form bottom' to='/add-guests' onClick={this.handleSubmit} >NEXT STEP</NavLink>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.currentUser,
  event: state.events.currentEvent,
})

export default connect(mapStateToProps, { clearCurrentEvent, createEvent })(NewEventForm)
