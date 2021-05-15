import React from 'react'
import { NavLink } from 'react-router-dom'

class PreferencesForm extends React.Component {
  state = {
    guestId: '',
    prefTypeYes: '',
    guestIdYes: '',
    guestsYes: [],
    descriptionYes: '',
    descriptionsYes: [],
    prefTypeNo: '',
    guestIdNo: '',
    guestsNo: [],
    descriptionNo: '',
    descriptionsNo: []
  }

  buildFullName = (guest) => {
    const { firstName, midName, lastName } = guest
    const f = firstName
    const m = (midName.length > 0) ? ` ${midName}` : ''
    const l = (lastName.length > 0) ? ` ${lastName}` : ''
    return f + m + l
  }

  createGuestOptions = (type) => {
    let guests = this.props.event.guests
    if (type === 'preference') {
      guests = guests.filter(guest => guest.id !== this.state.guestId)
    }
    return guests.map((guest) => (
      <option key={guest.id} value={guest.id}>
        {this.buildFullName(guest)}
      </option>
    ))
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  setInputDisplay = (attribute, type) => {
    // console.log(this.state)
    if (this.state[attribute] === type) {
      return { display: 'inline' }
    }
    return { display: 'none' }
  }

  handleAdd = (pref) => {
    this.props.addPreference(this.state)
    this.setState({ [`prefType${pref}`]: '', [pref]: '' })
  }

  render() {
    return (
      <div id='pref-form' className='card'>
        <NavLink id='exit' to='/'>&times;</NavLink>
        <form>
          <p><b>ADD SEATING PREFERENCES</b></p>

          <p>
            <label>
              Those Sitting Beside&nbsp;
              <select
                name='guestId'
                value={this.state.guestId}
                onChange={this.handleChange}
                autoFocus
                required
              >
                <option value="" hidden>Choose A Guest</option>
                {this.createGuestOptions('guest')}
              </select>
            </label>...
          </p>

          <div id='pref-area'>
            <div className='pref-box'>
              Should Be...
              <NavLink
                id='add-should'
                className='button'
                to='/preferences-form'
                onClick={() => this.handleAdd('should')}
              >ADD</NavLink><br/>

              <label>
                <input
                  type="radio"
                  name='prefTypeYes'
                  value='guest'
                  onChange={this.handleChange}
                />&nbsp;
                <i>choose a guest</i>
              </label>&nbsp;&nbsp;

              <select
                name='guestIdYes'
                value={this.guestIdYes}
                onChange={this.handleChange} 
                style={this.setInputDisplay('prefTypeYes', 'guest')}
              >
                <option value="" hidden>Guests</option>
                {this.createGuestOptions('preference')}
              </select><br/>

              <label>
                <input
                  type="radio"
                  name='prefTypeYes'
                  value='description'
                  onChange={this.handleChange}
                />&nbsp;
                <i>enter a description</i>
              </label>&nbsp;&nbsp;

                <input
                  type="text"
                  name='descriptionYes'
                  value={this.state.descriptionYes}
                  onChange={this.handleChange}
                  placeholder='Description'
                  style={this.setInputDisplay('prefTypeYes', 'description')}
                />
            </div>

            <div className='pref-box'>
              Should Not Be...
              <NavLink
                id='add-should-not'
                className='button'
                to='/preferences-form'
                onClick={() => this.handleAdd('shouldNot')}
              >ADD</NavLink><br/>

              <label>
                <input
                  type="radio"
                  name='prefTypeNo'
                  value='guest'
                  onChange={this.handleChange}
                />&nbsp;
                <i>choose a guest</i>
              </label>&nbsp;&nbsp;

              <select
                name='guestIdNo'
                value={this.state.guestIdNo}
                onChange={this.handleChange} 
                style={this.setInputDisplay('prefTypeNo', 'guest')}
              >
                <option value="" hidden>Guests</option>
                {this.createGuestOptions('preference')}
              </select><br/>

              <label>
                <input
                  type="radio"
                  name='prefTypeNo'
                  value='description'
                  onChange={this.handleChange}
                />&nbsp;
                <i>enter a description</i>
              </label>&nbsp;&nbsp;

              <input
                type="text"
                name='descriptionNo'
                value={this.state.descriptionNo}
                onChange={this.handleChange}
                placeholder='Description'
                style={this.setInputDisplay('prefTypeNo', 'description')}
              />
            </div>
          </div>

          <br/>
          {/* <NavLink className='button form' to='/guest-form' onClick={this.handleSubmit}>ADD ANOTHER</NavLink> */}
          <NavLink className='button form' to='/'>NEXT STEP</NavLink>
        </form>
      </div>
    )
  }
}

export default PreferencesForm
