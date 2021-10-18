import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const EventMenu = props => {
  const handleClick = () => {
    props.deleteEvent(props.event.id);
  };
  const possibleLinks = () => {
    if (props.event.guests.length > 0) {
      return (
        <>
          <div><NavLink className="event" to="/add-preferences">Add Preferences</NavLink></div>
          <div><NavLink className="event" to="/checklist">Edit Guest Traits</NavLink></div>
        </>
      );
    }
  };
  return (
    <div id="event-menu" className="card">
      <NavLink id="exit" to="/">&times;</NavLink>
      <div><NavLink className="event" to="/edit-event">Edit Event</NavLink></div>
      <div><NavLink className="event" to="/add-guests">Add Guests</NavLink></div>
      {possibleLinks()}
      <div className="no"><NavLink className="no" to="/events-list" onClick={handleClick} >Delete Event</NavLink></div>
    </div>
  );
};

EventMenu.propTypes = {
  event: PropTypes.object,
  deleteEvent: PropTypes.func,
};

export default EventMenu;
