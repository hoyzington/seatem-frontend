import React from 'react'
import { NavLink, Redirect } from 'react-router-dom'

class EventForm extends React.Component {
  state = { id: '', name: '', table: 'rect', guests: [] }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.addEvent(this.state)
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
            Round&nbsp;
          </label>
          <input type="submit"/>
        </form>
      </div>
    )
  }
}

export default EventForm
