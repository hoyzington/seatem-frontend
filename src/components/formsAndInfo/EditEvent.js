import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { editEvent, updateEvent } from '../../actions/events';
import CloseXClearErrors from './CloseXClearErrors';
import ErrorsDisplay from './ErrorsDisplay';

class EditEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', table: '', guestQty: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createChairString = this.createChairString.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit() {
    const { event, editEvent } = this.props;
    const { state } = this;
    const changes = Object.keys(state).reduce((newObj, key) => {
      if (state[key] !== '') {
        newObj[key] = state[key];
      }
      return newObj;
    }, {});
    if (changes.guestQty) {
      const qty = parseInt(changes.guestQty, 10);
      const difference = qty - event.guests.length;
      if (difference > 0) {
        alert(`You must delete ${difference} guests first if you want the number of guests to be ${qty}`);
        return null;
      }
      changes.chairs = this.createChairString(qty);
    }
    updateEvent(event.id, changes);
    editEvent(event.id, changes);
  }

  createChairString(qty) {
    const chairs = [];
    if (qty % 2 !== 0) {
      qty += 1;
    }
    for (let i = qty; i > 0; i--) {
      chairs.push(null);
    }
    return chairs.join(',');
  }

  render() {
    const { name, guestQty } = this.props.event;
    return (
      <div id="event-form" className="card">
        <CloseXClearErrors />
        <form>
          <p><b>EDIT EVENT</b></p>
          <ErrorsDisplay />
          <label>
            Event Name&nbsp;&nbsp;
            <input
              type="text"
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
              maxLength="30"
              placeholder={name}
              autoFocus
              required/>
            <br/>
          </label>
          <label>Table </label>
          <label>
            <input
              type="radio"
              name="table"
              value="rect"
              onChange={this.handleChange}
              checked/>
            Rectangular&nbsp;
          </label>
          <label>
            <input
              type="radio"
              name="table"
              value="rnd"
              onChange={this.handleChange}/>
            Round
            <br/>
          </label>
          <label>
            Number of Guests&nbsp;&nbsp;
            <input
              type="number"
              name="guestQty"
              onChange={this.handleChange}
              value={this.state.guestQty}
              max={this.state.table === 'rnd' ? '12' : '26'}
              placeholder={guestQty}
              required/>&nbsp;
          </label><br/>
          <div id="btn-area">
            <NavLink className="btn form bottom" to="/" onClick={this.handleSubmit} >UPDATE</NavLink>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  event: state.events.currentEvent,
});

EditEvent.propTypes = {
  event: PropTypes.object,
  editEvent: PropTypes.func,
  updateEvent: PropTypes.func,
};

export default connect(mapStateToProps, { editEvent, updateEvent })(EditEvent);
