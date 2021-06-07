import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../actions/sessions'

class Account extends React.Component {
  render() {
    return (
      <div id='account' className='card'>
        <NavLink id='exit' to='/' >&times;</NavLink>
        <p><b>ACCOUNT</b></p>
        <div>
          <NavLink to='/update-event' >My Profile</NavLink>
        </div>
        <div>
          <NavLink to='/' onClick={this.props.logout} >Log Out</NavLink>
        </div>
      </div>
    )
  }
}

export default connect(null, { logout })(Account)
