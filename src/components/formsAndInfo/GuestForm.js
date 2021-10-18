import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createGuest } from '../../actions/guests';

class GuestForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      middleName: '',
      lastName: '',
      seated: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  maxGuests() {
    const { event } = this.props,
          guests = event.guests.length,
          max = event.guestQty;
    return (guests + ' of ' + max);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleClick() {
    const { event, createGuest } = this.props;
    if (this.state.firstName === '') {
      if (event.guests.length === 0) {
        alert('There must be at least one guest to proceed');
      }
    } else {
      createGuest(this.state, event.id);
    }
  }

  handleSubmit() {
    const { event, createGuest } = this.props;
    createGuest(this.state, event.id);
    this.setState({
      firstName: '',
      middleName: '',
      lastName: '',
    });
    document.getElementById('first-name').focus();
  }

  render() {
    const { event, errors } = this.props;
    if (errors && errors.type === 'newEvent') {
      return (<Redirect to="/new-event" />);
    }
    if (event.id !== '' && event.guests.length.toString() === event.guestQty) {
      return (<Redirect to="/add-preferences" />);
    }
    return (
      <div id="guest-form" className="card">
        <NavLink id="exit" to="/">&times;</NavLink>
        <form>
          <p><b>ADD GUESTS</b> ({this.maxGuests()})</p>
          <label>
            First Name&nbsp;&nbsp;
            <input
              id="first-name"
              type="text"
              name="firstName"
              onChange={this.handleChange}
              value={this.state.firstName}
              maxLength="12"
              autoFocus
              required/>
          </label>&nbsp;&nbsp;<i>(required)</i><br/>
          <label>
            Middle Name&nbsp;&nbsp;
            <input
              type="text"
              name="middleName"
              onChange={this.handleChange}
              value={this.state.middleName}
              maxLength="12"/>
          </label>&nbsp;&nbsp;<i>(optional)</i><br/>
          <label>
            Last Name&nbsp;&nbsp;
            <input
              type="text"
              name="lastName"
              onChange={this.handleChange}
              value={this.state.lastName}
              maxLength="12"/>
          </label>&nbsp;&nbsp;<i>(optional)</i><br/>
          <div id="btn-area">
            <NavLink className="btn form bottom" to="/add-guests" onClick={this.handleSubmit} >ADD ANOTHER</NavLink>
            <NavLink className="btn form bottom" to="/add-preferences" onClick={this.handleClick} >NEXT STEP</NavLink>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  event: state.events.currentEvent,
});

GuestForm.propTypes = {
  errors: PropTypes.array,
  event: PropTypes.object,
  createGuest: PropTypes.func,
};

export default connect(mapStateToProps, { createGuest })(GuestForm);
