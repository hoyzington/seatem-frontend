import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

class PreferencesForm extends React.Component {
  state = {
    guestId: '',
    prefTypeYes: '',
    guestYes: '',
    descriptionYes: '',
    prefTypeNo: '',
    guestNo: '',
    descriptionNo: '',
  }

  componentDidMount() {
    const guest = this.props.selectedGuest
    if (guest) {
      this.setState({ guestId: guest.id })
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
    return guests.map((guest) => {
      if (guest.id !== this.state.guestId) {
        return (
          <option key={guest.id} value={guest.id}>
            {this.buildFullName(guest)}
          </option>
        )
      }
      return (
        <option key={guest.id} value={guest.id} selected='true'>
          {this.buildFullName(guest)}
        </option>
      )
    })
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleGuestChange = (e) => {
    this.handleChange(e)
    this.props.selectGuest(e.target.value)
  }

  setInputDisplay = (attribute, type) => {
    if (this.state[attribute] === type) {
      return { display: 'inline' }
    }
    return { display: 'none' }
  }

  handleAdd = (bool) => {
    let guest = this.props.selectedGuest
    const type = this.state[`prefType${bool}`]
    if (guest && type !== '') {
      const newPref = this.state[`${type}${bool}`]
      let prefArray = guest.preferences[`${type}s${bool}`]
      if (!prefArray.includes(newPref)) {
        if (type === 'guest' && prefArray.length > 1) {
          prefArray = [prefArray[prefArray.length - 1], newPref]
        } else {
          prefArray = [...prefArray, newPref]
        }
      }
      guest = {
        ...guest,
        preferences: {
          ...guest.preferences,
          [`${type}s${bool}`]: prefArray,
        }
      }
      if (type === 'description') {
        let descriptions = this.props.descriptions
        descriptions = [
          ...descriptions,
          newPref,
        ]
        this.props.updateDescriptions(guest, descriptions)
      } else {
        this.props.updateGuest(guest)
      }
      this.setState({
        [`${type}${bool}`]: '',
      })
    }
  }

  handleDelete = (type, bool, pref) => {
    let guest = this.props.selectedGuest
    let prefs = guest.preferences[`${type}s${bool}`]
    const prefIdx = prefs.findIndex(item => item === pref)
    guest = {
      ...guest,
      preferences: {
        ...guest.preferences,
        [`${type}s${bool}`]: [
          ...prefs.slice(0, prefIdx),
          ...prefs.slice(prefIdx + 1),
        ],
      }
    }
    if (type === 'description') {
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
      const prefs = guest.preferences[`${type}s${bool}`]
      if (prefs.length > 0) {
        return prefs.map(pref => {
          if (type === 'guest') {
            const prefGuest = this.props.guests.find(guest => guest.id === pref)
            return (
              <li key={uuidv4()} className={bool}>
                <b>{this.buildFullName(prefGuest)}</b>
                <NavLink
                  className='delete-preference'
                  to='/preferences-form'
                  onClick={() => this.handleDelete(type,bool, pref)}
                >&times;</NavLink>
              </li>
            )
          }
          return (
            <li key={uuidv4()} className={bool}>
              <b>{pref}</b>
              <NavLink
                className='delete-preference'
                to='/preferences-form'
                onClick={() => this.handleDelete(type,bool, pref)}
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
          {this.renderPreferences('guest', bool)}
        </ul>
        Descriptions
        <ul>
          {this.renderPreferences('description', bool)}
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
              <span className='Yes'><b>Should Be...</b></span><br/>

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
                name='guestYes'
                value={this.guestYes}
                onChange={this.handleChange} 
                style={this.setInputDisplay('prefTypeYes', 'guest')}
              >
                <option key={uuidv4()} value="" hidden>Guests</option>
                {this.createGuestOptions('preference', 'Yes')}
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
              /><br/>

              <NavLink
                id='add'
                className='btn'
                to='/preferences-form'
                onClick={() => this.handleAdd('Yes')}
              >ADD</NavLink>

              {this.buildPreferencesArea('Yes')}

            </div>

            <div className='preference-box'>
            <span className='No'><b>Should Not Be...</b></span><br/>

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
                name='guestNo'
                value={this.state.guestNo}
                onChange={this.handleChange} 
                style={this.setInputDisplay('prefTypeNo', 'guest')}
              >
                <option key={uuidv4()} value="" hidden>Guests</option>
                {this.createGuestOptions('preference', 'No')}
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
              /><br/>

              <NavLink
                id='add'
                className='btn'
                to='/preferences-form'
                onClick={() => this.handleAdd('No')}
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
  user: state.user,
  descriptions: state.currentEvent.descriptions,
  guests: state.currentEvent.guests,
  selectedGuest: state.selectedGuest,
})

const mapDispatchToProps = (dispatch) => ({
  updateGuest: (guest) => dispatch({ type: 'UPDATE_GUEST', guest }),
  updateDescriptions: (guest, descriptions) => dispatch({ type: 'UPDATE_DESCRIPTIONS', guest, descriptions }),
  selectGuest: (id) => dispatch({ type: 'SELECT_GUEST', id })
})

export default connect(mapStateToProps, mapDispatchToProps)(PreferencesForm)
