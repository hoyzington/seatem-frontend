import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class PreferencesForm extends React.Component {
  state = {
    guestId: '',

  }

  componentDidMount() {
    const guest = this.props.selectedGuest
    if (guest) {
      this.setState({ guestId: guest.id })
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  buildFullName = (guest) => {
    const { firstName, midName, lastName } = guest,
          f = firstName,
          m = (midName.length > 0) ? ` ${midName}` : '',
          l = (lastName.length > 0) ? ` ${lastName}` : ''
    return f + m + l
  }

  createGuestOptions = () => {
    let guests = this.props.guests
    return guests.map((guest) => {
      if (guest.id !== this.state.guestId) {
        return (
          <option key={guest.id} value={guest.id}>
            {this.buildFullName(guest)}
          </option>
        )
      }
      return (
        <option key={guest.id} value={guest.id} selected>
          {this.buildFullName(guest)}
        </option>
      )
    })
  }

  handleGuestChange = (e) => {
    this.handleChange(e)
    this.props.selectGuest(e.target.value)
  }

  buildChecklist = () => {
    return (
      <div id='check-list'>
        {this.props.descriptions.map((desc) => (
          desc
        ))}
      </div>
    )
  }

  // handleSubmit = () => {
  //   let guest = this.props.selectedGuest
  //   const prefIdx = prefs.findIndex(item => item === '')
  //   guest = {
  //     ...guest,
  //     checklist: {},
  //   }
  //   this.props.updatePreferences(guest)
  // }

  render() {
    return (
      <div id='checklist-form' className='card'>
        <NavLink id='exit' to='/'>&times;</NavLink>
        <NavLink className='btn form top' to='/'>FINISH</NavLink>
        <p>
          <b>GUEST CHARACTERISTICS CHECKLIST</b>
        </p>

        <p>
          <label>
            Guest&nbsp;
            <select
              name='guestId'
              value={this.state.guestId}
              onChange={this.handleGuestChange}
              autoFocus
              required
            >
              <option value="" hidden>Choose A Guest</option>
              {this.createGuestOptions()}
            </select>&nbsp;
            Has These Characteristics:<br/>
            <i>(check all that apply)</i>
          </label>
        </p>

        {this.buildChecklist()}

        <div id='btn-area'>
          <NavLink
            className='btn form bottom'
            to='/checklist-form'
            // onClick={this.handleSubmit()}
          >SUBMIT</NavLink>
        </div>

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
  updatePreferences: (guest, descriptions) => dispatch({ type: 'UPDATE_PREFERENCES', guest, descriptions }),
  selectGuest: (id) => dispatch({ type: 'SELECT_GUEST', id })
})

export default connect(mapStateToProps, mapDispatchToProps)(PreferencesForm)
