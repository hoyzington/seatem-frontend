import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { selectGuest, editGuest } from '../../actions/guests'
import { v4 as uuidv4 } from 'uuid'

class ChecklistForm extends React.Component {
  state = {
    guestId: '',
    traits: this.props.descriptions.reduce(
      (traits, trait) => ({
        ...traits,
        [trait]: false
      }),
      {},
    ),
  }

  componentDidMount() {
    const guest = this.props.selectedGuest
    if (guest) {
      if (guest.traits.length > 0){
        this.setState({
          guestId: guest.id,
          traits: this.props.descriptions.reduce(
            (traits, trait) => ({
              ...traits,
              [trait]: guest.traits.includes(trait)
            }),
            {},
          ),
        })
      } else {
        this.setState({ guestId: guest.id })
      }
    }
  }

  buildFullName = (guest) => {
    const { firstName, middleName, lastName } = guest,
          f = firstName,
          m = (middleName.length > 0) ? ` ${middleName}` : '',
          l = (lastName.length > 0) ? ` ${lastName}` : ''
    return f + m + l
  }

  createGuestOptions = () => {
    let guests = this.props.guests
    return guests.map((guest) => (
      <option key={guest.id} value={guest.id}>
        {this.buildFullName(guest)}
      </option>
  ))
  }

  handleCheckboxChange = (e) => {
    const { name } = e.target
    this.setState((prevState) => ({
      traits: {
        ...prevState.traits,
        [name]: !prevState.traits[name],
      }
    }))
  }

  handleGuestChange = (e) => {
    this.props.selectGuest(parseInt(e.target.value))
    const { guests, descriptions } = this.props
    const selectedGuest = guests.find(guest => guest.id === parseInt(e.target.value))
    const traits = descriptions.reduce((total, trait) => ({
        ...total,
        [trait]: selectedGuest.traits.includes(trait),
      }),
      {},
    )

    this.setState({
      [e.target.name]: e.target.value,
      traits: traits,
    })
  }

  buildChecklist = () => {
    return (
      <div id='check-list'>
        {this.props.descriptions.map((trait) => (
          <>
            <label>
              <input
                key={uuidv4()}
                type='checkbox'
                name={trait}
                checked={this.state.traits[trait]}
                onChange={this.handleCheckboxChange}
              />&nbsp;
              {trait}
            </label><br/>
          </>
        ))}
      </div>
    )
  }

  handleSubmit = () => {
    const addedTraits = Object.keys(this.state.traits).filter(trait => this.state.traits[trait])
    const updatedGuest = {
      ...this.props.selectedGuest,
      traits: addedTraits,
    }
    const guestJson = {
      traits: addedTraits.join(','),
    }
    this.props.editGuest(updatedGuest, guestJson)
  }

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
            onClick={this.handleSubmit}
          >SUBMIT</NavLink>
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  descriptions: state.events.currentEvent.descriptions,
  guests: state.events.currentEvent.guests,
  selectedGuest: state.events.selectedGuest,
})

export default connect(mapStateToProps, { selectGuest, editGuest })(ChecklistForm)
