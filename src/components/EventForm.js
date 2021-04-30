import React from 'react'
import { NavLink } from 'react-router-dom'
// import AboutOrFormArea from './AboutOrFormArea'

// const content = <form >Event Form</form>

class EventForm extends React.Component {
  state = { name: '', table: '' }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    console.log(this.state)
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
              autoFocus/>
            <br/>
          </label>
          <label>Table </label>
          <label>
            <input
              type="radio"
              name='table'
              value='rect'
              onChange={this.handleChange}/>
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

// (
//   <AboutOrFormArea id='about-form' class='card' content={content} />
// )

export default EventForm
