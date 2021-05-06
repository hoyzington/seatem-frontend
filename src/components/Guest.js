import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class Guest extends React.Component {

  handleClick = () => {
    this.props.selectGuest(this.props.guest.id)
  }

  setId = () => {
    if (this.props.guest.id === this.props.state.selectedGuest.id) {
      return 'selected'
    }
    return ''
  }

  render() {
    const initialsArray = this.props.guest.name.split(' ').map(word => word[0])
    const url = '/guests/' + initialsArray.join('')
    const initials = initialsArray.join(' ')
    return (
      <NavLink to={url}>
        <div id={this.setId()} className='guest' onClick={this.handleClick}>
          {initials}
        </div>
      </NavLink>
    )
  }
}

const mapStateToProps = state => ({ state })

const mapDispatchToProps = dispatch => ({
  selectGuest: id => dispatch({ type: 'SELECT_GUEST', id })
})

export default connect(mapStateToProps, mapDispatchToProps)(Guest)
