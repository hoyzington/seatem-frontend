import React from 'react';
import PropTypes from 'prop-types';
import Guest from '../components/things/Guest';
import { connect } from 'react-redux';

class GuestArea extends React.Component {
  renderGuests() {
    const guests = this.props.event.guests.filter(guest => guest.seated === false);
    return guests.map(guest => (<Guest key={guest.id} guest={guest} />));
  }

  render() {
    return (
      <div id={`guest-area-${this.props.event.table}`}>
        {this.renderGuests()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  event: state.events.currentEvent,
});

GuestArea.propTypes = {
  event: PropTypes.object,
};

export default connect(mapStateToProps)(GuestArea);
