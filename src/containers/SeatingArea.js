import React from 'react'
import Chair from '../components/Chair'
import Table from '../components/Table'

class SeatingArea extends React.Component {

  render() {
    const size = '6 Feet | 72 Inches | 1.8 Meters'
    const a='44', b='44'

    return (
      <>
        <div id='seating-area-rnd'>
          <Table size={size} />
        </div>
        <div id='seating-area-rnd'>
          <Chair a={a} b={b} />
          {/* <Chair a={a} b={b} />
          <Chair a={a} b={b} />
          <Chair a={a} b={b} />
          <Chair a={a} b={b} />
          <Chair a={a} b={b} />
          <Chair a={a} b={b} />
          <Chair a={a} b={b} />
          <Chair a={a} b={b} />
          <Chair a={a} b={b} />
          <Chair a={a} b={b} />
          <Chair a={a} b={b} /> */}
        </div>
        {/* <div id='seating-area-rect'></div> */}
      </>
    )
  }
}

export default SeatingArea
