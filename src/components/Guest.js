import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

class Guest extends React.Component {

  handleClick = () => {
    this.props.selectGuest(this.props.data.id)
  }

  render() {
    const initialsArray = this.props.data.name.split(' ').map(word => word[0])
    const url = '/guests/' + initialsArray.join('')
    const initials = initialsArray.join(' ')
    return (
      <NavLink to={url}>
        <div className='guest' onClick={this.handleClick}>
          {initials}
        </div>
      </NavLink>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  selectGuest: id => dispatch({ type: 'SELECT_GUEST', id })
})

export default connect(null, mapDispatchToProps)(Guest)
