import React from 'react'
import Guest from '../components/Guest'

class GuestArea extends React.Component {

  tableType = this.props.data.type

  render() {
    return (
      <div id={'guest-area-' + this.tableType}>
        <Guest />
        <Guest />
        <Guest />
        <Guest />
        <Guest />
        <Guest />
        <Guest />
        <Guest />
        <Guest />
        <Guest />
        <Guest />
        <Guest />
        {/* <Guest />
        <Guest />
        <Guest />
        <Guest />
        <Guest />
        <Guest />
        <Guest />
        <Guest />
        <Guest />
        <Guest />
        <Guest />
        <Guest />
        <Guest />
        <Guest /> */}
      </div>
    )
  }
}

export default GuestArea
