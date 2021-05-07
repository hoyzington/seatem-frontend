import React from 'react'
import { connect } from 'react-redux'
import Guest from './Guest'

class Chair extends React.Component {

  handleClick = () => {
    const chairs = this.props.state.currentEvent.chairs
    if (!chairs[parseInt(this.props.id)]) {
      const guest = this.props.state.selectedGuest
      if (guest) {
        const chairId = this.props.id
        this.props.seatGuest(chairId)
      }
    }
  }

  fillChair = () => {
    const chairs = this.props.state.currentEvent.chairs
    const guest = chairs[parseInt(this.props.id)]
    if (guest) {
      return (
        <Guest guest={guest} />
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

const mapStateToProps = state => ({ state })

const mapDispatchToProps = dispatch => ({
  seatGuest: chairId => dispatch({ type: 'SEAT_GUEST', chairId })
})

export default connect(mapStateToProps, mapDispatchToProps)(Chair)
