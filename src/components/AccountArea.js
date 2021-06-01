import React from 'react'
import { NavLink } from 'react-router-dom'
import { logout } from '../actions/sessions'
import { connect } from 'react-redux'

class AccountArea extends React.Component {

  // handleChange = (e) => {
  //   this.setState({ [e.target.name]: e.target.value })
  // }

  handleLogout = () => {
    this.props.logout()
  }

  render() {
    return (
      <div id='account' className='card'>
        <NavLink id='exit' to='/'>&times;</NavLink>
        <form>
          <p><b>Account</b></p>

          <div id='btn-area'>
            <NavLink className='btn form bottom' to='/' onClick={this.handleLogout} >LOG OUT</NavLink>
          </div>
        </form>
      </div>
    )
  }
}

// const mapStateToProps = (state) => ({
//     email: state.AccountArea.email,
//     password: state.AccountArea.password,
//   })

export default connect(null, { logout })(AccountArea)
