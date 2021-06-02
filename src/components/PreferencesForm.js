import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

class PreferencesForm extends React.Component {
  state = {
    guestId: '',
    prefType: '',
    guestsYes: '',
    descriptionsYes: '',
    guestsNo: '',
    descriptionsNo: '',
  }

  componentDidMount() {
    const guest = this.props.selectedGuest
    if (guest) {
      this.setState({ guestId: guest.id })
    }
  }

  componentDidUpdate() {
    const descriptionInput = document.getElementById(this.state.prefType)
    if (descriptionInput) {
      descriptionInput.focus()
    }
  }

  buildFullName = (guest) => {
    const { firstName, midName, lastName } = guest,
          f = firstName,
          m = (midName.length > 0) ? ` ${midName}` : '',
          l = (lastName.length > 0) ? ` ${lastName}` : ''
    return f + m + l
  }

  createGuestOptions = (type, bool) => {
    const guest = this.props.selectedGuest
    let guests = this.props.guests
    if (type === 'preference' && guest) {
      const prefGuests = guest.preferences[`guests${bool}`]
      guests = guests.filter((guest) => {
        return (guest.id !== this.state.guestId && !prefGuests.includes(guest.id))
      })
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

  handleGuestChange = (e) => {
    this.handleChange(e)
    this.props.selectGuest(e.target.value)
  }

  setInputDisplay = (type) => {
    if (this.state.prefType === type) {
      return { display: 'inline' }
    }
    return { display: 'none' }
  }

  handleAdd = () => {
    let guest = this.props.selectedGuest
    const prefType = this.state.prefType
    if (guest && prefType !== '') {
      const newPref = this.state[prefType]
      let prefArray = guest.preferences[prefType]
      const typeIsGuest = prefType[0] === 'g'
      if (!prefArray.includes(newPref)) {
        if (typeIsGuest && prefArray.length > 1) {
          prefArray = [prefArray[prefArray.length - 1], newPref]
        } else {
          prefArray = [...prefArray, newPref]
        }
      }
      guest = {
        ...guest,
        preferences: {
          ...guest.preferences,
          [prefType]: prefArray,
        }
      }
      if (!typeIsGuest) {
        let descriptions = this.props.descriptions
        descriptions = [
          ...descriptions,
          newPref,
        ]
        this.props.updateDescriptions(guest, descriptions)
      } else {
        this.props.updateGuest(guest)
      }
      this.setState({ [prefType]: '' })
    }
  }

  handleDelete = (type, bool, pref) => {
    let guest = this.props.selectedGuest
    let prefs = guest.preferences[`${type}${bool}`]
    const prefIdx = prefs.findIndex(item => item === pref)
    guest = {
      ...guest,
      preferences: {
        ...guest.preferences,
        [`${type}${bool}`]: [
          ...prefs.slice(0, prefIdx),
          ...prefs.slice(prefIdx + 1),
        ],
      }
    }
    if (type === 'descriptions') {
      let descriptions = this.props.descriptions
      const descIdx = descriptions.findIndex(item => item === pref)
      descriptions = [
        ...descriptions.slice(0, descIdx),
        ...descriptions.slice(descIdx + 1),
      ]
      this.props.updateDescriptions(guest, descriptions)
    } else {
      this.props.updateGuest(guest)
    }
  }

  renderPreferences = (type, bool) => {
    const guest = this.props.selectedGuest
    if (guest) {
      const prefs = guest.preferences[`${type}${bool}`]
      const downBool = bool.toLowerCase()
      if (prefs.length > 0) {
        return prefs.map(pref => {
          if (type === 'guests') {
            const prefGuest = this.props.guests.find(guest => guest.id === pref)
            return (
              <li key={uuidv4()} className={downBool}>
                <b>{this.buildFullName(prefGuest)}</b>
                <NavLink
                  className='delete-preference'
                  to='/preferences-form'
                  onClick={() => this.handleDelete(type, bool, pref)}
                >&times;</NavLink>
              </li>
            )
          }
          return (
            <li key={uuidv4()} className={downBool}>
              <b>{pref}</b>
              <NavLink
                className='delete-preference'
                to='/preferences-form'
                onClick={() => this.handleDelete(type, bool, pref)}
              >&times;</NavLink>
            </li>
          )
        })
      }
    }
  }

  buildPreferencesArea = (bool) => {
    return (
      <div className='preference-list'>
        Guests
        <ul>
          {this.renderPreferences('guests', bool)}
        </ul>
        Descriptions
        <ul>
          {this.renderPreferences('descriptions', bool)}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <div id='preference-form' className='card'>
        <NavLink id='exit' to='/'>&times;</NavLink>
        <form>
          <b>ADD SEATING PREFERENCES</b>
          <NavLink className='btn form top' to='/checklist-form'>NEXT STEP</NavLink>

          <p>
            <label>
              Those Sitting Beside&nbsp;
              <select
                name='guestId'
                value={this.state.guestId}
                onChange={this.handleGuestChange}
                autoFocus
                required
              >
                <option key={uuidv4()} value="" hidden>Choose A Guest</option>
                {this.createGuestOptions('guest')}
              </select>
            </label>...
          </p>

          <div id='preference-area'>
            <div className='preference-box'>
              <span className='yes'><b>Should Be...</b></span><br/>

              <label>
                <input
                  type="radio"
                  name='prefType'
                  value='guestsYes'
                  onChange={this.handleChange}
                />&nbsp;
                <i>choose a guest</i>
              </label>&nbsp;&nbsp;

              <select
                name='guestsYes'
                value={this.state.guestsYes}
                onChange={this.handleChange} 
                style={this.setInputDisplay('guestsYes')}
              >
                <option key={uuidv4()} value="" hidden>Guests</option>
                {this.createGuestOptions('preference', 'Yes')}
              </select><br/>

              <label>
                <input
                  type="radio"
                  name='prefType'
                  value='descriptionsYes'
                  onChange={this.handleChange}
                />&nbsp;
                <i>enter a description</i>
              </label>&nbsp;&nbsp;

              <input
                id='descriptionsYes'
                type="text"
                name='descriptionsYes'
                value={this.state.descriptionsYes}
                onChange={this.handleChange}
                placeholder='Description'
                style={this.setInputDisplay('descriptionsYes')}
              /><br/>

              <NavLink
                id='add'
                className='btn'
                to='/preferences-form'
                onClick={this.handleAdd}
              >ADD</NavLink>

              {this.buildPreferencesArea('Yes')}

            </div>

            <div className='preference-box'>
            <span className='no'><b>Should Not Be...</b></span><br/>

              <label>
                <input
                  type="radio"
                  name='prefType'
                  value='guestsNo'
                  onChange={this.handleChange}
                />&nbsp;
                <i>choose a guest</i>
              </label>&nbsp;&nbsp;

              <select
                name='guestsNo'
                value={this.state.guestsNo}
                onChange={this.handleChange} 
                style={this.setInputDisplay('guestsNo')}
              >
                <option key={uuidv4()} value="" hidden>Guests</option>
                {this.createGuestOptions('preference', 'No')}
              </select><br/>

              <label>
                <input
                  type="radio"
                  name='prefType'
                  value='descriptionsNo'
                  onChange={this.handleChange}
                />&nbsp;
                <i>enter a description</i>
              </label>&nbsp;&nbsp;

              <input
                id='descriptionsNo'
                type="text"
                name='descriptionsNo'
                value={this.state.descriptionsNo}
                onChange={this.handleChange}
                placeholder='Description'
                style={this.setInputDisplay('descriptionsNo')}
              /><br/>

              <NavLink
                id='add'
                className='btn'
                to='/preferences-form'
                onClick={this.handleAdd}
              >ADD</NavLink><br/>

              {this.buildPreferencesArea('No')}

            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  // user: state.user,
  descriptions: state.events.currentEvent.descriptions,
  guests: state.events.currentEvent.guests,
  selectedGuest: state.events.selectedGuest,
})

const mapDispatchToProps = (dispatch) => ({
  updateGuest: (guest) => dispatch({ type: 'UPDATE_GUEST', guest }),
  updateDescriptions: (guest, descriptions) => dispatch({ type: 'UPDATE_DESCRIPTIONS', guest, descriptions }),
  selectGuest: (id) => dispatch({ type: 'SELECT_GUEST', id })
})

export default connect(mapStateToProps, mapDispatchToProps)(PreferencesForm)
