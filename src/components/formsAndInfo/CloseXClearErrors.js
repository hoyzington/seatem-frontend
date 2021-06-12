import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { clearErrors } from '../../actions/errors'

class CloseXClearErrors extends React.Component {

  clearErrors = () => {
    if (this.props.errors) {
      this.props.clearErrors()
    }
  }

  render() {
    return (
        <NavLink id='exit' to='/' onClick={this.clearErrors} >&times;</NavLink>
    )
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors,
})

export default connect(mapStateToProps, { clearErrors })(CloseXClearErrors)
