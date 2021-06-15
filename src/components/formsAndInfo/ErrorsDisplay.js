import React from 'react'
import { connect } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

class ErrorsDisplay extends React.Component {
  render() {
    const { errors } = this.props
    if (errors) {
      return (
        <div className='error'>
          <p>
            {errors.content.map(error => {
              const presentableError = error.replace('Guestqty', 'Number of guests')
              return (
                <li key={uuidv4()}>{presentableError}</li>
              )
            })}
          </p>
        </div>
      )
    }
    return null
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors,
})

export default connect(mapStateToProps)(ErrorsDisplay)
