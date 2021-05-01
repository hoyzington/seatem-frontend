import React from 'react'
import { NavLink } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
// import GuestForm from '../components/GuestForm'

class EventForm extends React.Component {
  state = { id: null, name: '', table: 'rect', guests: [] }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.state.id = uuidv4()
    // console.log(this.state)
    // const max = this.state.table === 'rnd' ? '12' : '26'
    // return (<GuestForm maxGuests={max} />)
  }

  render() {
    return (
      <div id='form-or-about' className='card'>
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
