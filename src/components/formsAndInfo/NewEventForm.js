import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { resetCurrentEvent, createEvent } from '../../actions/events'
import CloseXClearErrors from './CloseXClearErrors'
import ErrorsDisplay from './ErrorsDisplay'

class NewEventForm extends React.Component {

  state = { name: '', table: 'rect', guestQty: '0' }

  componentDidMount() {
    this.props.resetCurrentEvent()
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = () => {
    const { user, createEvent } = this.props
    const event = { event: this.state }
    createEvent(event, user.id)
  }

  render() {
    return (
      <div id='event-form' className='card'>
        <CloseXClearErrors />
        <form>
          <p><b>ADD AN EVENT</b></p>
          <ErrorsDisplay />
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
})

export default connect(mapStateToProps, { resetCurrentEvent, createEvent })(NewEventForm)
