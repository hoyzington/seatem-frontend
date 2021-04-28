import React from 'react'
import Chair from '../components/Chair'
import Table from '../components/Table'

class SeatingArea extends React.Component {

  rnd4 = [
    {id: '1', x: '60', y: '60'},
    {id: '2', x: '356', y: '60'},
    {id: '3', x: '60', y: '356'},
    {id: '4', x: '356', y: '356'},
  ]

  rnd5 = [
    {id: '1', x: '208', y: '0'},
    {id: '2', x: '10', y: '145'},
    {id: '3', x: '407', y: '145'},
    {id: '4', x: '84', y: '375'},
    {id: '5', x: '334', y: '375'},
  ]

  rnd6 = [
    {id: '1', x: '208', y: '0'},
    {id: '2', x: '26', y: '104'},
    {id: '3', x: '390', y: '104'},
    {id: '4', x: '26', y: '312'},
    {id: '5', x: '390', y: '312'},
    {id: '6', x: '208', y: '416'},
  ]

  rnd7 = [
    {id: '1', x: '208', y: '0'},
    {id: '2', x: '48', y: '74'},
    {id: '3', x: '368', y: '74'},
    {id: '4', x: '3', y: '242'},
    {id: '5', x: '415', y: '242'},
    {id: '6', x: '96', y: '384'},
    {id: '7', x: '321', y: '384'},
  ]

  rnd8 = [
    {id: '1', x: '208', y: '0'},
    {id: '2', x: '60', y: '60'},
    {id: '3', x: '356', y: '60'},
    {id: '4', x: '0', y: '208'},
    {id: '5', x: '416', y: '208'},
    {id: '6', x: '60', y: '356'},
    {id: '7', x: '356', y: '356'},
    {id: '8', x: '208', y: '416'},
  ]

  rnd9 = [
    {id: '1', x: '208', y: '0'},
    {id: '2', x: '74', y: '50'},
    {id: '3', x: '344', y: '50'},
    {id: '4', x: '4', y: '172'},
    {id: '5', x: '413', y: '172'},
    {id: '6', x: '27', y: '312'},
    {id: '7', x: '390', y: '312'},
    {id: '8', x: '134', y: '402'},
    {id: '9', x: '283', y: '402'},
  ]

  rnd10 = [
    {id: '1', x: '208', y: '0'},
    {id: '2', x: '84', y: '42'},
    {id: '3', x: '334', y: '42'},
    {id: '4', x: '10', y: '145'},
    {id: '5', x: '407', y: '145'},
    {id: '6', x: '10', y: '270'},
    {id: '7', x: '407', y: '270'},
    {id: '8', x: '84', y: '375'},
    {id: '9', x: '334', y: '375'},
    {id: '10', x: '208', y: '416'},
  ]

  rnd11 = []

  rnd12 = [
    {id: '1', x: '208', y: '0'},
    {id: '2', x: '104', y: '26'},
    {id: '3', x: '312', y: '26'},
    {id: '4', x: '26', y: '104'},
    {id: '5', x: '390', y: '104'},
    {id: '6', x: '0', y: '208'},
    {id: '7', x: '416', y: '208'},
    {id: '8', x: '26', y: '312'},
    {id: '9', x: '390', y: '312'},
    {id: '10', x: '104', y: '390'},
    {id: '11', x: '312', y: '390'},
    {id: '12', x: '208', y: '416'},
  ]

  buildChairs = (setup) => (
    setup.map(chair => (
      <Chair key={chair.id} x={chair.x} y={chair.y} />
    ))
  )

  render() {
    const size = '6 Feet | 72 Inches | 1.8 Meters'
    return (
      <div id='seating-area-rnd'>
        <Table size={size} />
        {this.buildChairs(this.rnd7)}
      </div>
    )
  }
}

export default SeatingArea
