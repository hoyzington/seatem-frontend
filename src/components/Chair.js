import React from 'react'
import { connect } from 'react-redux'
import Guest from './Guest'

class Chair extends React.Component {

  guestInChair = () => {
    const chairId = this.props.id
    const chairs = this.props.event.chairs
    return chairs[parseInt(chairId)]
  }

  handleClick = () => {
    let guest = this.props.guest
    const emptyChair = !this.guestInChair()
    const chairId = this.props.id
    if (guest && emptyChair) {
      this.props.seatGuest(chairId, guest)
    }
  }

  fillChair = () => {
    const guestInChair = this.guestInChair()
    if (guestInChair) {
      return (
        <Guest guest={guestInChair} />
      )
    }
  }

  render() {
    const { id, x, y } = this.props
    return (
      <div
        id={id}
        className='chair'
        onClick={this.handleClick}
        style={{
          top: `${y}px`,
          left: `${x}px`
        }}>
        {this.fillChair()}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  events: state.events,
  event: state.currentEvent,
  guest: state.selectedGuest,
})

const mapDispatchToProps = (dispatch) => ({
  seatGuest: (chairId, guest) => dispatch({ type: 'SEAT_GUEST', chairId, guest })
})

export default connect(mapStateToProps, mapDispatchToProps)(Chair)
