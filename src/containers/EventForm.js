import React from 'react'
import { NavLink, Redirect } from 'react-router-dom'

class EventForm extends React.Component {
  state = { id: '', name: '', table: 'rect', chairs: [], guests: [], guestQty: '0' }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let submittedState = this.state
    let qty = parseInt(this.state.guestQty)
    if (qty < 5) {
      submittedState.chairs = ['', '', '', '']
    } else {
      if (qty %2 !== 0) qty += 1
      for (let i = qty; i > 0; i--) {
        submittedState.chairs.push('')
      }
    }
    this.props.addEvent(submittedState)
  }

  render() {
    if (this.props.event.name !== '') {
      return (<Redirect to='/guest-form' />)
    }
    return (
      <div id='form' className='card'>
        <NavLink id='exit' to='/'>&times;</NavLink>
        <form onSubmit={this.handleSubmit}>
          <label>
            Event Name&nbsp;
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
            Number of Guests&nbsp;
            <input
              type='number'
              name='guestQty'
              onChange={this.handleChange}
              value={this.state.guestQty}
              max={this.state.table === 'rnd' ? '12' : '26'}
              required/>&nbsp;
          </label>
          <input type="submit"/>
        </form>
      </div>
    )
  }
}

export default EventForm
