import React from 'react'
import { NavLink } from 'react-router-dom'

class AccountArea extends React.Component {

  // handleChange = (e) => {
  //   this.setState({ [e.target.name]: e.target.value })
  // }

  render() {
    return (


          <div id='btn-area'>
            <NavLink className='btn form bottom' to='/' onClick={this.props.handleLogout} >LOG OUT</NavLink>
          </div>
    )
  }
}

export default AccountArea
